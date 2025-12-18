-- Tabla waitlist para almacenar emails de la lista de espera
-- Ejecutar este SQL en Supabase SQL Editor

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsquedas rápidas por email
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Comentarios para documentación
COMMENT ON TABLE waitlist IS 'Almacena los emails de usuarios en la lista de espera';
COMMENT ON COLUMN waitlist.id IS 'Identificador único del registro';
COMMENT ON COLUMN waitlist.email IS 'Email del usuario (único)';
COMMENT ON COLUMN waitlist.created_at IS 'Fecha y hora de registro';

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en la tabla waitlist
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Política 1: Permitir INSERT público (solo para registros nuevos)
-- Los usuarios anónimos pueden insertar emails
CREATE POLICY "Allow public insert" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política 2: Permitir SELECT público solo para verificar duplicados
-- Esto permite que el cliente verifique si un email ya existe
CREATE POLICY "Allow public select for duplicate check" ON waitlist
  FOR SELECT
  TO anon
  USING (true);

-- Política 3: Los usuarios autenticados (service role) tienen acceso completo
-- Esto permite que el backend de Astro Actions funcione correctamente
CREATE POLICY "Service role full access" ON waitlist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Política 4: Bloquear UPDATE y DELETE para usuarios anónimos
-- Nadie puede actualizar o eliminar registros desde el cliente
CREATE POLICY "Block public update" ON waitlist
  FOR UPDATE
  TO anon
  USING (false);

CREATE POLICY "Block public delete" ON waitlist
  FOR DELETE
  TO anon
  USING (false);

-- ============================================
-- TABLA PARA RATE LIMITING (opcional si no usas Redis)
-- ============================================

-- Si prefieres usar Supabase en lugar de Redis para rate limiting
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier VARCHAR(255) NOT NULL, -- IP address o user identifier
  action VARCHAR(100) NOT NULL, -- tipo de acción (ej: 'waitlist_join')
  attempts INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Índice compuesto para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_action
  ON rate_limits(identifier, action, expires_at);

-- Habilitar RLS en rate_limits
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Permitir INSERT/SELECT/UPDATE público para rate limiting
CREATE POLICY "Allow rate limit operations" ON rate_limits
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Función para limpiar registros expirados automáticamente
CREATE OR REPLACE FUNCTION cleanup_expired_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comentarios
COMMENT ON TABLE rate_limits IS 'Almacena intentos de rate limiting';
COMMENT ON COLUMN rate_limits.identifier IS 'IP o identificador único del usuario';
COMMENT ON COLUMN rate_limits.action IS 'Tipo de acción limitada';
COMMENT ON COLUMN rate_limits.attempts IS 'Número de intentos realizados';
COMMENT ON COLUMN rate_limits.expires_at IS 'Fecha de expiración del límite';
