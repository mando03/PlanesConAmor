import { supabase } from "./supabase";

interface RateLimitConfig {
  identifier: string; // IP address o user identifier
  action: string; // tipo de acción (ej: 'waitlist_join')
  maxAttempts: number; // máximo de intentos permitidos
  windowMs: number; // ventana de tiempo en milisegundos
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

/**
 * Verifica si un usuario ha excedido el límite de intentos
 * Usa Supabase para almacenar los intentos
 */
export async function checkRateLimit(
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const { identifier, action, maxAttempts, windowMs } = config;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + windowMs);

  try {
    // Limpiar registros expirados primero
    await supabase
      .from("rate_limits")
      .delete()
      .lt("expires_at", now.toISOString());

    // Buscar registro existente que no haya expirado
    const { data: existingRecord, error: fetchError } = await supabase
      .from("rate_limits")
      .select("*")
      .eq("identifier", identifier)
      .eq("action", action)
      .gt("expires_at", now.toISOString())
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // Error diferente a "no rows returned"
      console.error("[Rate Limit] Error al consultar:", fetchError);
      // En caso de error, permitir la acción (fail-open)
      return {
        allowed: true,
        remaining: maxAttempts,
        resetAt: expiresAt,
      };
    }

    // Si no existe registro, crear uno nuevo
    if (!existingRecord) {
      const { error: insertError } = await supabase.from("rate_limits").insert([
        {
          identifier,
          action,
          attempts: 1,
          expires_at: expiresAt.toISOString(),
        },
      ]);

      if (insertError) {
        console.error("[Rate Limit] Error al insertar:", insertError);
        return {
          allowed: true,
          remaining: maxAttempts - 1,
          resetAt: expiresAt,
        };
      }

      return {
        allowed: true,
        remaining: maxAttempts - 1,
        resetAt: expiresAt,
      };
    }

    // Si ya existe, verificar si ha excedido el límite
    const currentAttempts = existingRecord.attempts;

    if (currentAttempts >= maxAttempts) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: new Date(existingRecord.expires_at),
      };
    }

    // Incrementar contador de intentos
    const { error: updateError } = await supabase
      .from("rate_limits")
      .update({ attempts: currentAttempts + 1 })
      .eq("id", existingRecord.id);

    if (updateError) {
      console.error("[Rate Limit] Error al actualizar:", updateError);
    }

    return {
      allowed: true,
      remaining: maxAttempts - (currentAttempts + 1),
      resetAt: new Date(existingRecord.expires_at),
    };
  } catch (error) {
    console.error("[Rate Limit] Error inesperado:", error);
    // En caso de error, permitir la acción (fail-open)
    return {
      allowed: true,
      remaining: maxAttempts,
      resetAt: expiresAt,
    };
  }
}

/**
 * Obtiene la IP del cliente desde el request de Astro
 */
export function getClientIP(request: Request): string {
  // Preferir headers de proxies confiables (Vercel/Cloudflare).
  const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for");
  const cfConnectingIP = request.headers.get("cf-connecting-ip"); // Cloudflare
  const realIP = request.headers.get("x-real-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (vercelForwardedFor) {
    return vercelForwardedFor.split(",")[0].trim();
  }
  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;

  // Solo confiar en x-forwarded-for si estamos detrás de un proxy conocido
  const hasTrustedProxy =
    request.headers.has("x-vercel-id") || request.headers.has("cf-ray");
  if (hasTrustedProxy && forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  // En desarrollo/local, permitir fallback para pruebas
  const isDev = import.meta.env.MODE === "development";
  if (isDev && forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  // Fallback: usar un identificador genérico
  return isDev ? "127.0.0.1" : "unknown";
}
