# Project Architecture

## Tech Stack

- **Framework**: Astro 5.16.6
- **Styling**: Tailwind CSS 4.1.18
- **Icons**: Lucide Astro (@lucide/astro)
- **Language**: TypeScript
- **Package Manager**: pnpm

## Project Structure

```
CitasWeb/
├── .agents/              # Modular documentation
│   ├── BestPractices.md
│   ├── Architecture.md   # This file
│   ├── Styling.md
│   ├── Components.md
│   ├── Icons.md
│   └── Responsive.md
├── .docs/                # Session documentation (git-ignored)
│   └── summary_*.md
├── public/
│   ├── fonts/           # Custom font files
│   │   ├── CutiveMono.woff
│   │   ├── FrederickatheGreat.woff
│   │   └── Cutive.woff
│   └── favicon.webp
├── src/
│   ├── assets/
│   │   └── images/      # Component images
│   ├── components/      # Astro components
│   │   ├── book-hero.astro
│   │   ├── features-section.astro
│   │   ├── book-categories-section.astro
│   │   ├── card-demo-section.astro
│   │   ├── waitlist-section.astro
│   │   └── footer.astro
│   ├── layouts/
│   │   └── Layout.astro  # Base HTML layout
│   ├── pages/
│   │   └── index.astro   # Homepage
│   └── styles/
│       └── global.css    # Global styles & fonts
├── CLAUDE.md            # Main documentation entry
└── package.json
```

## Astro Framework

### Component Structure

Astro components follow this pattern:

```astro
---
// 1. Imports
import { IconName } from "@lucide/astro";

// 2. Component logic/data
const data = [];
---

<!-- 3. Template/HTML -->
<section>
  <!-- Component markup -->
</section>

<!-- 4. Styles (scoped) -->
<style>
  /* Component-specific styles */
</style>

<!-- 5. Scripts (client-side) -->
<script>
  // Client-side JavaScript
</script>
```

### When to Use `<script>` Tags

Use `<script>` tags for client-side interactivity:

- Form handling
- Button clicks
- Smooth scrolling
- DOM manipulation
- Event listeners

**Example:**

```astro
<script>
  const button = document.getElementById("my-button");
  if (button) {
    button.addEventListener("click", () => {
      // Handle click
    });
  }
</script>
```

### Static vs Dynamic

- **Astro is static-first**: Components render at build time
- **Use `<script>` for interactivity**: Client-side JavaScript for dynamic behavior
- **No React state**: Replace `useState` with vanilla JavaScript

## File Naming Conventions

### Components

- Use kebab-case: `book-hero.astro`, `waitlist-section.astro`
- Descriptive names that indicate purpose
- Always `.astro` extension

### Styles

- `global.css` for global styles and font definitions
- Component-specific styles go in `<style>` tag within component

### Images

- Place in `src/assets/images/` or `public/`
- Use descriptive names: `starry-dinner.png`, `nature-adventure.png`
- Import from `src/assets/` when using Astro's image optimization

## Import Patterns

### Lucide Icons

```astro
---
// ✅ Correct
import { Heart, Mail, Sparkles } from "@lucide/astro";

// ❌ Incorrect
import { Heart } from "lucide-react";
import { Heart } from "lucide-astro";
---
```

### Images

```astro
---
// For Astro optimization
import myImage from "../assets/images/my-image.png";
---

<img src={myImage.src} alt="Description" />
```

### Components

```astro
---
// Same directory
import MyComponent from "./MyComponent.astro";

// Parent directory
import Layout from "../layouts/Layout.astro";
---
```

## Component Organization

### Current Components

1. **book-hero.astro** - Hero section with CTAs
2. **features-section.astro** - Bento grid features
3. **book-categories-section.astro** - Category selection grid
4. **card-demo-section.astro** - Interactive card examples
5. **waitlist-section.astro** - Email capture form
6. **footer.astro** - Footer with branding

### Component Hierarchy

```
index.astro (Page)
└── Layout.astro (Layout)
    ├── book-hero.astro
    ├── features-section.astro
    ├── book-categories-section.astro
    ├── card-demo-section.astro
    ├── waitlist-section.astro
    └── footer.astro
```

## Adding New Components

### Steps

1. Create file in `src/components/` with kebab-case name
2. Follow Astro component structure (imports, logic, template, styles, scripts)
3. Import and use in page or layout
4. Apply responsive design from the start
5. Use custom fonts appropriately
6. Run quality checks (lint, format, build)

### Example New Component

```astro
---
import { IconName } from "@lucide/astro";

const componentData = [
  // Data here
];
---

<section class="bg-white px-4 py-24">
  <div class="mx-auto max-w-6xl">
    <!-- Component content -->
  </div>
</section>

<style>
  /* Component styles if needed */
</style>

<script>
  // Client-side logic if needed
</script>
```

## Build & Development

### Development Server

```bash
pnpm dev
```

- Hot reload enabled
- Runs on http://localhost:4321
- Instant feedback on changes

### Production Build

```bash
pnpm build
```

- Static site generation
- Optimized output in `dist/`
- TypeScript type checking
- Asset optimization

### Preview Build

```bash
pnpm preview
```

- Preview production build locally
- Test before deployment

## Key Principles

1. **Static-First**: Components render at build time
2. **Progressive Enhancement**: Add interactivity with `<script>` tags
3. **Component Isolation**: Each component is self-contained
4. **Modular Structure**: Related files grouped logically
5. **Type Safety**: TypeScript for reliability
6. **Performance**: Minimal JavaScript, optimized assets
