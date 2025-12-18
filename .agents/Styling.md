# Styling Guide

## Tailwind CSS v4

This project uses **Tailwind CSS 4.1.18**. Some syntax has changed from v3.

### Important v4 Changes

#### Gradients

**❌ v3 Syntax (Don't use):**
```html
<div class="bg-gradient-to-br from-amber-50 to-rose-50"></div>
```

**✅ v4 Syntax (Use this):**
```html
<div class="bg-linear-to-br from-amber-50 to-rose-50"></div>
```

**All gradient replacements:**
- `bg-gradient-to-t` → `bg-linear-to-t`
- `bg-gradient-to-tr` → `bg-linear-to-tr`
- `bg-gradient-to-r` → `bg-linear-to-r`
- `bg-gradient-to-br` → `bg-linear-to-br`
- `bg-gradient-to-b` → `bg-linear-to-b`
- `bg-gradient-to-bl` → `bg-linear-to-bl`
- `bg-gradient-to-l` → `bg-linear-to-l`
- `bg-gradient-to-tl` → `bg-linear-to-tl`

**When in doubt:** Use context7 to verify current Tailwind syntax:
```bash
mcp__context7__resolve-library-id: "tailwindcss"
mcp__context7__get-library-docs: "/websites/tailwindcss"
```

## Custom Fonts

### Font Files Location

```
public/fonts/
├── CutiveMono.woff
├── FrederickatheGreat.woff
└── Cutive.woff
```

### Font Definitions

Defined in `src/styles/global.css`:

```css
@font-face {
  font-family: "Cutive Mono";
  src: url("/fonts/CutiveMono.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Fredericka the Great";
  src: url("/fonts/FrederickatheGreat.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Cutive";
  src: url("/fonts/Cutive.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

### Font Utility Classes

```css
.font-cutive-mono {
  font-family: "Cutive Mono", monospace;
}

.font-fredericka {
  font-family: "Fredericka the Great", cursive;
}

.font-cutive {
  font-family: "Cutive", serif;
}
```

### Font Usage Guidelines

| Font Class | Use For | Examples |
|------------|---------|----------|
| `font-cutive-mono` | Badges, labels, small accents | "Próximamente", "Acceso anticipado" |
| `font-fredericka` | Titles, headings, emphasis | H1, H2, H3, card titles |
| `font-cutive` | Body text, descriptions, buttons | Paragraphs, button text, form labels |

**Example:**
```html
<!-- Badge -->
<span class="font-cutive-mono text-sm">Próximamente</span>

<!-- Title -->
<h1 class="font-fredericka text-5xl">Crea recuerdos</h1>

<!-- Body text -->
<p class="font-cutive text-xl">Un libro interactivo...</p>
```

## Color Palette

### Primary Colors

```css
/* Amber */
from-amber-50    /* Lightest background */
from-amber-100
to-amber-400
to-amber-600     /* Primary CTA */
to-amber-700     /* Hover state */

/* Rose */
via-rose-50      /* Light background */
to-rose-50
to-rose-400
to-rose-600      /* Primary CTA */
to-rose-700      /* Hover state */

/* Purple */
to-purple-50     /* Background accent */
to-purple-600    /* Gradient accent */
```

### Secondary Colors

```css
/* Blue */
from-blue-400 to-cyan-400       /* Para mi hijo */

/* Pink */
from-pink-400 to-rose-400       /* Para mi hija */
from-red-400 to-pink-500        /* Para mi pareja */

/* Orange */
from-amber-400 to-orange-400    /* Para la familia */

/* Slate */
from-slate-400 to-slate-600     /* Para mi padre */

/* Purple-Pink */
from-purple-400 to-pink-400     /* Para mi madre */

/* Green */
from-emerald-400 to-teal-400    /* Para mí mismo */
from-emerald-100                /* Success state */
```

### Status Colors

```css
/* Pending */
bg-slate-100 text-slate-700 border-slate-300

/* Scheduled */
bg-amber-100 text-amber-700 border-amber-300

/* Completed */
bg-emerald-100 text-emerald-700 border-emerald-300
```

## Common Patterns

### Gradient Backgrounds

```html
<!-- Section background -->
<section class="bg-linear-to-br from-amber-50 via-rose-50 to-purple-50">
  <!-- Content -->
</section>

<!-- Button gradient -->
<button class="bg-linear-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700">
  Text
</button>
```

### Gradient Text

```html
<span class="bg-linear-to-r from-amber-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
  Gradient text
</span>
```

### Decorative Blur Elements

```html
<div class="absolute top-20 left-10 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl"></div>
<div class="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl"></div>
```

### Glass Morphism

```html
<div class="bg-white/80 backdrop-blur-sm border border-amber-200">
  <!-- Content -->
</div>
```

## Spacing System

### Container Widths

```css
max-w-3xl   /* Text content (prose) */
max-w-4xl   /* Hero sections */
max-w-6xl   /* Main content sections */
max-w-xl    /* Forms, narrow content */
```

### Section Padding

```css
/* Vertical */
py-24       /* Standard section spacing */
py-20       /* Hero sections */
py-12       /* Footer */

/* Horizontal */
px-4        /* Mobile-safe padding */
px-6        /* Slightly more space */
px-8        /* Desktop buttons/inputs */
```

### Component Spacing

```css
space-y-4   /* Between card elements */
space-y-8   /* Between section elements */
gap-2       /* Small icon/text gap */
gap-3       /* Badge/button gaps */
gap-4       /* Form field gaps */
gap-6       /* Grid gaps */
```

## Hover & Transition Effects

### Standard Transitions

```html
<!-- Card hover -->
<div class="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
  <!-- Content -->
</div>

<!-- Border hover -->
<div class="border-2 border-gray-200 hover:border-amber-300">
  <!-- Content -->
</div>

<!-- Button hover -->
<button class="transition-all hover:from-amber-700 hover:to-rose-700">
  Text
</button>
```

### Scale Effects

```html
<!-- Icon scale on parent hover -->
<div class="group">
  <div class="transition-transform group-hover:scale-110">
    <Icon />
  </div>
</div>
```

## Border & Shadow

### Borders

```css
border          /* 1px default */
border-2        /* 2px emphasis */
border-dashed   /* Dashed placeholder */

/* Colors */
border-gray-200      /* Default neutral */
border-gray-300      /* Input borders */
border-amber-200     /* Subtle accent */
border-amber-300     /* Hover states */
border-emerald-200   /* Success */
```

### Shadows

```css
shadow-lg       /* Card elevation */
shadow-xl       /* Hover state */
shadow-2xl      /* Book 3D effect */
```

### Rounded Corners

```css
rounded-md      /* Buttons, inputs */
rounded-lg      /* Cards, images */
rounded-2xl     /* Large cards */
rounded-full    /* Badges, circles */
rounded-xl      /* Icon containers */
```

## Text Utilities

### Font Sizes (Responsive)

```html
<!-- Mobile → Desktop -->
text-sm                           /* 14px fixed */
text-sm md:text-base              /* 14px → 16px */
text-xl md:text-2xl               /* 20px → 24px */
text-4xl md:text-5xl              /* 36px → 48px */
text-5xl md:text-7xl              /* 48px → 72px */
```

### Text Utilities

```css
text-balance    /* Better line breaks for titles */
text-pretty     /* Better line breaks for paragraphs */
leading-tight   /* Tight line height (titles) */
leading-relaxed /* Relaxed line height (body) */
```

### Font Weights

```css
font-medium     /* 500 - Labels, buttons */
font-semibold   /* 600 - Category labels */
font-bold       /* 700 - Headings */
```

## Prettier Configuration

**File:** `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss"
  ]
}
```

**Rules to follow:**
- ✅ Use double quotes `"text"`
- ✅ Include semicolons
- ✅ Keep lines under 80 characters
- ✅ ES5 trailing commas
- ✅ 2 space indentation

## Best Practices

1. **Always use Tailwind v4 syntax** for gradients (`bg-linear-*`)
2. **Apply custom fonts consistently** per usage guidelines
3. **Use responsive utilities** from the start (`md:`, `lg:`)
4. **Follow spacing system** for visual consistency
5. **Test with Prettier** before committing (`pnpm format:check`)
6. **Verify with context7** when unsure about syntax
