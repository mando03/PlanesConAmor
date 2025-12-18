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
        // Verificar si el email ya existe
        const { data: existingEmail, error: checkError } = await supabase
          .from("waitlist")
          .select("email")
          .eq("email", email.toLowerCase())
          .single();

        if (checkError && checkError.code !== "PGRST116") {
          // PGRST116 = no rows returned (esperado si no existe)
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error al verificar el email. Intenta nuevamente.",
          });
        }

        // Si el email ya existe, retornar error específico
        if (existingEmail) {
          throw new ActionError({
            code: "CONFLICT",
            message: "Este email ya está registrado en la lista de espera.",
          });
        }

        // Insertar el nuevo email
        const { error: insertError } = await supabase
          .from("waitlist")
          .insert([{ email: email.toLowerCase() }]);

        if (insertError) {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "Error al registrar el email. Por favor intenta nuevamente.",
          });
        }

        return {
          success: true,
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
