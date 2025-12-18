# CitasWeb - Landing Page

Landing page para "Planes con Amor", un producto de libros personalizados que ayuda a crear recuerdos inolvidables a través de experiencias planificadas.

## Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración Inicial](#configuración-inicial)
- [Variables de Entorno](#variables-de-entorno)
- [Comandos Disponibles](#comandos-disponibles)
- [Seguridad](#seguridad)
- [Deployment](#deployment)

## Características

### Landing Page

- Hero section con CTAs
- Sección de características (bento grid)
- Categorías de libros personalizados
- Demostración de tarjetas interactivas
- Formulario de waitlist con validación

### Integración con Supabase

- Registro de emails en lista de espera
- Validación de duplicados
- Row Level Security (RLS)
- Rate limiting por IP

### Seguridad

- **Honeypot**: Detección automática de bots
- **Rate Limiting**: Máximo 3 intentos por IP cada 15 minutos
- **RLS en Supabase**: Políticas de seguridad a nivel de base de datos
- **Validación con Zod**: Validación de schemas en servidor

### UX/UI

- Diseño responsive (mobile-first)
- Modal profesional para resultados
- Fuentes personalizadas (Fredericka, Cutive, Cutive Mono)
- Gradientes con Tailwind CSS v4
- Animaciones suaves
- Accesibilidad (ARIA labels, keyboard navigation)

## Stack Tecnológico

- **Framework**: [Astro 5.16.6](https://astro.build) - SSR
- **Styling**: [Tailwind CSS 4.1.18](https://tailwindcss.com)
- **Icons**: [Lucide Astro](https://lucide.dev)
- **Database**: [Supabase](https://supabase.com)
- **Validation**: Zod (integrado con Astro)
- **Deployment**: [Vercel](https://vercel.com) (adapter serverless)
- **Package Manager**: pnpm

## Estructura del Proyecto

```text
CitasWeb/
├── .agents/                    # Documentación modular para Claude Code
│   ├── Architecture.md
│   ├── BestPractices.md
│   ├── Components.md
│   ├── Icons.md
│   ├── Responsive.md
│   └── Styling.md
├── public/
│   └── fonts/                  # Fuentes personalizadas
│       ├── Cutive.woff
│       ├── CutiveMono.woff
│       └── FrederickatheGreat.woff
├── src/
│   ├── actions/
│   │   └── index.ts           # Astro Actions (waitlist)
│   ├── components/
│   │   ├── book-hero.astro
│   │   ├── features-section.astro
│   │   ├── book-categories-section.astro
│   │   ├── card-demo-section.astro
│   │   ├── waitlist-section.astro
│   │   └── footer.astro
│   ├── layouts/
│   │   └── Layout.astro        # Layout base
│   ├── lib/
│   │   ├── supabase.ts        # Cliente de Supabase
│   │   └── rate-limit.ts      # Rate limiting utility
│   ├── pages/
│   │   └── index.astro        # Homepage
│   └── styles/
│       └── global.css         # Estilos globales y fuentes
├── supabase-schema.sql        # Schema de base de datos
├── CLAUDE.md                  # Documentación para Claude Code
└── package.json
```

## Configuración Inicial

### 1. Instalar Dependencias

```bash
pnpm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-anon-key-publica
```

### 3. Configurar Base de Datos

Ejecuta el contenido de `supabase-schema.sql` en el SQL Editor de Supabase:

1. Abre [Supabase Dashboard](https://app.supabase.com)
2. Ve a SQL Editor
3. Copia y ejecuta el contenido de `supabase-schema.sql`

Esto creará:

- Tabla `waitlist` con RLS
- Tabla `rate_limits` para control de tráfico
- Políticas de seguridad
- Índices optimizados

## Variables de Entorno

| Variable       | Descripción                  | Requerida |
| -------------- | ---------------------------- | --------- |
| `SUPABASE_URL` | URL del proyecto de Supabase | Sí        |
| `SUPABASE_KEY` | Anon key pública             | Sí        |

> Las variables se obtienen desde el dashboard de Supabase en Settings > API

## Comandos Disponibles

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando             | Acción                                    |
| ------------------- | ----------------------------------------- |
| `pnpm install`      | Instala dependencias                      |
| `pnpm dev`          | Inicia servidor de desarrollo (port 4321) |
| `pnpm build`        | Construye el sitio para producción        |
| `pnpm preview`      | Preview del build localmente              |
| `pnpm lint`         | Ejecuta ESLint                            |
| `pnpm lint:fix`     | Ejecuta ESLint y arregla errores          |
| `pnpm format`       | Formatea código con Prettier              |
| `pnpm format:check` | Verifica formato sin modificar archivos   |

### Workflow de Desarrollo

```bash
# 1. Desarrollo
pnpm dev

# 2. Antes de commit
pnpm lint:fix
pnpm format
pnpm build
```

## Seguridad

### Row Level Security (RLS)

Políticas implementadas en Supabase:

- ✅ **Allow public insert**: Usuarios anónimos pueden insertar emails
- ✅ **Allow public select**: Solo para verificar duplicados
- ✅ **Service role full access**: Backend tiene acceso completo
- ✅ **Block public update/delete**: Sin modificaciones desde cliente

### Honeypot

Campo oculto `website` en el formulario que detecta bots automáticos.

```typescript
// Si el campo está lleno, es un bot
if (website && website.trim() !== "") {
  throw new ActionError({ code: "BAD_REQUEST" });
}
```

### Rate Limiting

- **Límite**: 3 intentos por IP
- **Ventana**: 15 minutos
- **Almacenamiento**: Tabla `rate_limits` en Supabase
- **Estrategia**: Fail-open (permite en caso de error del sistema)

## Deployment

### Vercel (Recomendado)

1. **Conectar Repositorio**
   - Importa el proyecto en [Vercel](https://vercel.com)
   - Conecta tu repositorio de GitHub

2. **Configurar Variables de Entorno**

   ```
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_KEY=tu-anon-key
   ```

3. **Deploy**
   - Vercel detectará automáticamente Astro
   - El adaptador de Vercel ya está configurado
   - Deploy automático en cada push a main

### Build Local

```bash
pnpm build
```

Los archivos se generan en `.vercel/output/` y están listos para deploy.

## Desarrollo

### Guías de Estilo

- **Tailwind CSS v4**: Ver `.agents/Styling.md`
- **Componentes**: Ver `.agents/Components.md`
- **Responsive**: Ver `.agents/Responsive.md`
- **Best Practices**: Ver `.agents/BestPractices.md`

### Commits Convencionales

Este proyecto usa [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva característica
fix: corrección de bug
docs: cambios en documentación
style: formateo, punto y coma faltante, etc
refactor: refactorización de código
test: añadir tests
chore: actualizar dependencias
```

## Licencia

Desarrollado por [OrbitStudio](https://www.orbitstudio.tech)

---

**Versión**: 0.0.1
**Última actualización**: Diciembre 2025
