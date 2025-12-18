# Component Guide

## Component Patterns

### Standard Component Structure

All Astro components follow this structure:

```astro
---
// 1. IMPORTS
import { IconName } from "@lucide/astro";

// 2. DATA/LOGIC
const componentData = [
  {
    title: "Example",
    description: "Description here",
  },
];
---

<!-- 3. TEMPLATE -->
<section class="bg-white px-4 py-24">
  <div class="mx-auto max-w-6xl">
    <!-- Component content -->
  </div>
</section>

<!-- 4. STYLES (optional) -->
<style>
  /* Scoped component styles */
</style>

<!-- 5. SCRIPTS (optional) -->
<script>
  // Client-side JavaScript
</script>
```

## Existing Components

### 1. book-hero.astro

**Purpose:** Hero section with CTA buttons

**Key Features:**
- Gradient background with decorative blur elements
- Centered content with max-width
- Two CTA buttons (waitlist + features)
- Smooth scroll navigation
- Responsive text sizing

**Usage Pattern:**
```astro
<section class="relative flex min-h-screen items-center justify-center">
  <!-- Background -->
  <div class="absolute inset-0 bg-linear-to-br from-amber-50 via-rose-50 to-purple-50" />

  <!-- Decorative blurs -->
  <div class="absolute top-20 left-10 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />

  <!-- Content -->
  <div class="relative z-10">
    <!-- Text and buttons -->
  </div>
</section>
```

**Interactive Elements:**
- Smooth scroll buttons using `scrollIntoView({ behavior: "smooth" })`

---

### 2. features-section.astro

**Purpose:** Bento grid showcasing features

**Key Features:**
- Asymmetric grid layout (bento style)
- 4 features with icons
- Features 1 & 4 span 2 columns on desktop
- Hover effects with transform and shadow

**Grid Structure:**
```astro
<div class="grid auto-rows-[minmax(280px,auto)] gap-6 md:grid-cols-3">
  <!-- Feature 1: spans 2 cols -->
  <div class="md:col-span-2">...</div>

  <!-- Feature 2: single col -->
  <div>...</div>

  <!-- Feature 3: single col -->
  <div>...</div>

  <!-- Feature 4: spans 2 cols -->
  <div class="md:col-span-2">...</div>
</div>
```

**Hover Pattern:**
```html
<div class="group hover:-translate-y-1 hover:shadow-lg">
  <div class="group-hover:scale-110">
    <Icon />
  </div>
</div>
```

---

### 3. book-categories-section.astro

**Purpose:** Category selection grid

**Key Features:**
- Progressive grid: 2 cols → 3 cols → 4 cols
- 7 categories with unique gradients
- Cursor pointer on cards
- Background gradient on hover

**Grid Pattern:**
```html
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {categories.map((category) => (
    <div class="group cursor-pointer">
      <!-- Hover background -->
      <div class="absolute inset-0 bg-linear-to-br {category.gradient} opacity-0 group-hover:opacity-10" />

      <!-- Content -->
      <div class="relative">
        <div class="bg-linear-to-br {category.gradient}">
          <Icon />
        </div>
        <span>{category.label}</span>
      </div>
    </div>
  ))}
</div>
```

---

### 4. card-demo-section.astro

**Purpose:** Interactive card examples with states

**Key Features:**
- 3 cards showing different states
- Status badges with icons
- Image placeholders with TODO comments
- Compact vertical padding

**Card Structure:**
```astro
<div class="rounded-lg border-2 bg-white px-6 py-4">
  <div class="space-y-4">
    <!-- Header: title + badge -->
    <div class="flex items-start justify-between gap-2">
      <h3 class="font-fredericka text-xl md:text-2xl">{title}</h3>
      <span class="inline-flex items-center gap-1">
        <Icon class="h-3 w-3" />
        {statusLabel}
      </span>
    </div>

    <!-- Image -->
    <img src={image} alt={imageAlt} />

    <!-- Description -->
    <p class="font-cutive text-sm">{description}</p>

    <!-- Optional date -->
    {date && <p>Fecha: {date}</p>}

    <!-- Action areas -->
    <div class="space-y-2">
      <!-- Photo placeholder -->
      <!-- Note placeholder -->
    </div>
  </div>
</div>
```

**Image Placeholder Pattern:**
```astro
---
// TODO: Uncomment when images are available
// import starryDinner from "../assets/images/starry-dinner.png";

const card = {
  // image: starryDinner,  // Uncomment when ready
  imageAlt: "Description",
};
---

<!-- In template -->
{/* TODO: Uncomment when images are ready */}
{/* <img src={card.image.src} alt={card.imageAlt} /> */}

<!-- Temporary placeholder -->
<div class="flex h-48 items-center justify-center bg-linear-to-br from-amber-100 to-rose-100">
  <span class="font-cutive text-sm">{card.imageAlt}</span>
</div>
```

---

### 5. waitlist-section.astro

**Purpose:** Email capture form

**Key Features:**
- Toggle between form and success message
- Client-side form handling
- Email validation
- Responsive badge sizing

**Form Handling Pattern:**
```astro
<form id="waitlist-form">
  <input type="email" id="email-input" required />
  <button type="submit">Submit</button>
</form>

<div id="success-message" class="hidden">
  <!-- Success content -->
</div>

<script>
  const form = document.getElementById("waitlist-form");
  const successMessage = document.getElementById("success-message");
  const emailInput = document.getElementById("email-input") as HTMLInputElement;

  if (form && successMessage && emailInput) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput.value;

      // TODO: Backend integration
      console.log("[Waitlist] Email:", email);

      // Toggle visibility
      form.classList.add("hidden");
      successMessage.classList.remove("hidden");
    });
  }
</script>
```

**Responsive Badge Pattern:**
```html
<!-- Mobile: small, Desktop: larger -->
<div class="px-4 py-2 md:px-6 md:py-3">
  <Icon class="h-4 w-4 md:h-5 md:w-5" />
  <span class="text-sm md:text-base">Text</span>
</div>
```

---

### 6. footer.astro

**Purpose:** Footer with branding

**Key Features:**
- Centered layout
- Dynamic copyright year
- External link to OrbitStudio
- Heart icon with gradient

**External Link Pattern:**
```html
<a
  href="https://www.orbitstudio.tech"
  target="_blank"
  rel="noopener noreferrer"
  class="underline hover:text-amber-600"
>
  OrbitStudio
</a>
```

## Common Patterns

### Section Wrapper

Standard section structure:

```html
<section class="bg-white px-4 py-24">
  <div class="mx-auto max-w-6xl">
    <!-- Section content -->
  </div>
</section>
```

**Variants:**
- `max-w-3xl` - Narrow content (text-heavy)
- `max-w-4xl` - Medium width (hero)
- `max-w-6xl` - Full width (grids, features)

### Section Header

Standard header pattern:

```html
<div class="mx-auto mb-16 max-w-3xl text-center">
  <h2 class="font-fredericka mb-6 text-4xl font-bold md:text-5xl">
    Title with{" "}
    <span class="bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
      gradient
    </span>
  </h2>
  <p class="font-cutive text-xl text-gray-600">
    Description text here
  </p>
</div>
```

### Grid Layouts

**Equal columns:**
```html
<div class="grid gap-6 md:grid-cols-3">
  <!-- Items -->
</div>
```

**Progressive grid:**
```html
<div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
  <!-- Items -->
</div>
```

**Bento grid (asymmetric):**
```html
<div class="grid auto-rows-[minmax(280px,auto)] gap-6 md:grid-cols-3">
  <div class="md:col-span-2">Large item</div>
  <div>Regular item</div>
  <div>Regular item</div>
  <div class="md:col-span-2">Large item</div>
</div>
```

### Button Patterns

**Primary CTA:**
```html
<button class="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-linear-to-r from-amber-600 to-rose-600 px-8 font-cutive text-lg font-medium text-white transition-all hover:from-amber-700 hover:to-rose-700">
  Button Text
  <Icon class="h-5 w-5" />
</button>
```

**Secondary button:**
```html
<button class="inline-flex h-14 items-center justify-center rounded-md border-2 border-gray-300 bg-transparent px-8 font-cutive text-lg font-medium transition-all hover:bg-gray-50">
  Button Text
</button>
```

### Badge Pattern

```html
<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold {colorClasses}">
  <Icon class="h-3 w-3" />
  Label
</span>
```

### Input Pattern

```html
<div class="relative flex-1">
  <Icon class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
  <input
    type="email"
    placeholder="tu@email.com"
    required
    class="h-14 w-full rounded-md border-2 border-gray-300 pl-12 pr-4 font-cutive text-base outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
  />
</div>
```

## Component Conventions

### Naming

- **Components**: kebab-case (e.g., `book-hero.astro`)
- **IDs**: kebab-case (e.g., `waitlist-form`)
- **Classes**: Tailwind utilities (no custom class names)

### Font Application

- **Titles/Headings**: `font-fredericka`
- **Body/Descriptions**: `font-cutive`
- **Badges/Labels**: `font-cutive-mono`

### Spacing

- **Section padding**: `py-24` (vertical), `px-4` (horizontal)
- **Component gaps**: `gap-6` (grids), `gap-4` (flex)
- **Element spacing**: `space-y-4` (cards), `space-y-8` (sections)

### Interactive Elements

- **Minimum touch target**: `h-14` (56px) for buttons/inputs
- **Hover effects**: Always include `transition-all` or `transition-colors`
- **Focus states**: Include `focus:` variants for accessibility

### IDs and Scripts

- **IDs for JavaScript**: Use descriptive IDs for elements that need JS
- **Type assertions**: Cast HTMLElement types in TypeScript
- **Null checks**: Always check if element exists before using

```typescript
const button = document.getElementById("my-button");
if (button) {
  // Safe to use button
}
```

## Creating New Components

### Checklist

1. ✅ Create file in `src/components/` with kebab-case name
2. ✅ Import necessary icons from `@lucide/astro`
3. ✅ Follow standard component structure
4. ✅ Apply custom fonts appropriately
5. ✅ Use Tailwind v4 syntax (bg-linear-*)
6. ✅ Make responsive from the start
7. ✅ Add hover effects where appropriate
8. ✅ Include IDs for interactive elements
9. ✅ Add `<script>` for client-side logic
10. ✅ Test on mobile and desktop
11. ✅ Run quality checks (lint, format, build)

### Template

```astro
---
import { IconName } from "@lucide/astro";

const data = [
  // Component data
];
---

<section class="bg-white px-4 py-24">
  <div class="mx-auto max-w-6xl">
    <!-- Section header -->
    <div class="mx-auto mb-16 max-w-3xl text-center">
      <h2 class="font-fredericka mb-6 text-4xl font-bold md:text-5xl">
        Section Title
      </h2>
      <p class="font-cutive text-xl text-gray-600">
        Description
      </p>
    </div>

    <!-- Main content -->
    <div class="grid gap-6 md:grid-cols-3">
      {
        data.map((item) => (
          <div class="rounded-lg border-2 border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
            <!-- Item content -->
          </div>
        ))
      }
    </div>
  </div>
</section>

<script>
  // Client-side logic if needed
</script>
```

## Best Practices

1. **Keep components simple** - One purpose per component
2. **Reuse patterns** - Follow established conventions
3. **Mobile first** - Start with mobile, enhance for desktop
4. **Accessibility** - Touch targets ≥44px, semantic HTML
5. **Performance** - Minimal JavaScript, optimize assets
6. **Consistency** - Use same spacing, colors, fonts across components
