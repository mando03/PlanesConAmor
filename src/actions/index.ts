import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { supabase } from "../lib/supabase";
import { checkRateLimit, getClientIP } from "../lib/rate-limit";

export const server = {
  joinWaitlist: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email("Por favor ingresa un email válido"),
      website: z.string().optional(), // Honeypot
    }),
    handler: async ({ email, website }, context) => {
      // 1. HONEYPOT: Detectar bots
      if (website && website.trim() !== "") {
        // Si el campo honeypot está lleno, es un bot
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Solicitud inválida. Por favor intenta nuevamente.",
        });
      }

      // 2. RATE LIMITING: Verificar límite de intentos
      const clientIP = getClientIP(context.request);
      const rateLimitResult = await checkRateLimit({
        identifier: clientIP,
        action: "waitlist_join",
        maxAttempts: 3, // 3 intentos
        windowMs: 15 * 60 * 1000, // 15 minutos
      });

      if (!rateLimitResult.allowed) {
        const resetMinutes = Math.ceil(
          (rateLimitResult.resetAt.getTime() - Date.now()) / 60000
        );
        throw new ActionError({
          code: "TOO_MANY_REQUESTS",
          message: `Demasiados intentos. Por favor intenta nuevamente en ${resetMinutes} minutos.`,
        });
      }
      try {
        // Insertar el nuevo email
        const { error: insertError } = await supabase
          .from("waitlist")
          .insert([{ email: email.toLowerCase() }]);

        if (insertError) {
          if (insertError.code === "23505") {
            return {
              success: true,
              status: "already_registered",
              message:
                "Ya estás registrado en la lista de espera. Te avisaremos del lanzamiento en tu correo.",
            };
          }
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "Error al registrar el email. Por favor intenta nuevamente.",
          });
        }

        return {
          success: true,
          status: "registered",
          message: "¡Te has unido a la lista de espera exitosamente!",
        };
      } catch (error) {
        // Re-throw ActionError para que Astro lo maneje
        if (error instanceof ActionError) {
          throw error;
        }

        // Para cualquier otro error no esperado
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ocurrió un error inesperado. Intenta nuevamente.",
        });
      }
    },
  }),
};
