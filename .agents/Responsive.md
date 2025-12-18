# Responsive Design Guide

## Mobile-First Approach

This project follows a **mobile-first** strategy:

1. **Base styles** target mobile devices (320px+)
2. **Add enhancements** for larger screens using breakpoints
3. **Test on mobile first**, then verify desktop

## Tailwind Breakpoints

### Default Breakpoints

| Prefix | Min Width | Device Target               |
| ------ | --------- | --------------------------- |
| (none) | 0px       | Mobile (base)               |
| `sm:`  | 640px     | Large phones, small tablets |
| `md:`  | 768px     | Tablets, small laptops      |
| `lg:`  | 1024px    | Laptops, desktops           |
| `xl:`  | 1280px    | Large desktops              |
| `2xl:` | 1536px    | Extra large screens         |

### Most Used in This Project

- **`sm:`** - Horizontal button layouts, form rows
- **`md:`** - Text scaling, grid columns, responsive spacing
- **`lg:`** - Additional grid columns

## Responsive Patterns

### Text Sizing

**Always scale text from mobile to desktop:**

```html
<!-- ❌ Fixed size - not responsive -->
<h1 class="text-5xl">Title</h1>

<!-- ✅ Scales from mobile to desktop -->
<h1 class="text-5xl md:text-7xl">Title</h1>
```

**Common Text Patterns:**

```html
<!-- Headings -->
<h1 class="text-5xl md:text-7xl">Main title</h1>
<h2 class="text-4xl md:text-5xl">Section title</h2>
<h3 class="text-xl md:text-2xl">Card title</h3>

<!-- Body text -->
<p class="text-xl md:text-2xl">Large description</p>
<p class="text-base md:text-lg">Regular text</p>

<!-- Small text -->
<span class="text-sm md:text-base">Badge text</span>
```

### Layout Direction

**Stack vertically on mobile, horizontal on larger screens:**

```html
<!-- ❌ Always horizontal - breaks on mobile -->
<div class="flex flex-row">
  <button>Button 1</button>
  <button>Button 2</button>
</div>

<!-- ✅ Vertical on mobile, horizontal on tablet+ -->
<div class="flex flex-col sm:flex-row">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

**Common Layout Patterns:**

```html
<!-- Buttons -->
<div class="flex flex-col gap-4 sm:flex-row">
  <button>Primary</button>
  <button>Secondary</button>
</div>

<!-- Form fields -->
<form class="flex flex-col gap-3 sm:flex-row">
  <input type="email" class="flex-1" />
  <button type="submit">Submit</button>
</form>
```

### Grid Columns

**Progressive grid: Start with fewer columns, add more on larger screens:**

```html
<!-- ❌ Fixed columns - too many on mobile -->
<div class="grid grid-cols-4">
  <!-- 4 columns always -->
</div>

<!-- ✅ Progressive grid -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  <!-- 2 cols mobile → 3 cols tablet → 4 cols desktop -->
</div>
```

**Common Grid Patterns:**

```html
<!-- Simple grid (1 → 3 columns) -->
<div class="grid gap-6 md:grid-cols-3">
  <!-- Items -->
</div>

<!-- Progressive grid (2 → 3 → 4 columns) -->
<div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
  <!-- Items -->
</div>

<!-- Bento grid with responsive spans -->
<div class="grid auto-rows-[minmax(280px,auto)] gap-6 md:grid-cols-3">
  <div class="md:col-span-2">Large on desktop</div>
  <div>Regular</div>
  <div>Regular</div>
  <div class="md:col-span-2">Large on desktop</div>
</div>
```

### Spacing

**Adjust spacing for different screen sizes:**

```html
<!-- Padding: smaller on mobile, larger on desktop -->
<div class="px-4 py-2 md:px-6 md:py-3">Content</div>

<!-- Gap: tighter on mobile, wider on desktop -->
<div class="grid gap-4 md:gap-6">Items</div>
```

**Common Spacing Patterns:**

```html
<!-- Section padding -->
<section class="px-4 py-24">...</section>

<!-- Badge padding (responsive) -->
<div class="px-4 py-2 md:px-6 md:py-3">Badge</div>

<!-- Grid gap (responsive) -->
<div class="grid gap-4 md:gap-6">...</div>
```

### Icon Sizing

**Make icons larger on desktop when appropriate:**

```html
<!-- ❌ Fixed size -->
<Icon class="h-4 w-4" />

<!-- ✅ Responsive sizing -->
<Icon class="h-4 w-4 md:h-5 md:w-5" />
```

**Icon Size Patterns:**

```html
<!-- Badge icons (responsive) -->
<Sparkles class="h-4 w-4 md:h-5 md:w-5" />

<!-- Button icons (usually fixed) -->
<ArrowRight class="h-5 w-5" />

<!-- Feature icons (usually fixed) -->
<BookOpen class="h-7 w-7" />
```

## Component-Specific Responsive Patterns

### book-hero.astro

```html
<!-- Title: 5xl mobile → 7xl desktop -->
<h1 class="text-5xl md:text-7xl">...</h1>

<!-- Description: xl mobile → 2xl desktop -->
<p class="text-xl md:text-2xl">...</p>

<!-- Buttons: vertical mobile → horizontal tablet+ -->
<div class="flex flex-col gap-4 sm:flex-row">
  <button>...</button>
  <button>...</button>
</div>
```

### features-section.astro

```html
<!-- Grid: 1 column mobile → 3 columns tablet+ -->
<div class="grid gap-6 md:grid-cols-3">
  <!-- Feature 1: spans 2 cols on desktop only -->
  <div class="md:col-span-2">...</div>

  <!-- Features 2 & 3: regular width -->
  <div>...</div>
  <div>...</div>

  <!-- Feature 4: spans 2 cols on desktop only -->
  <div class="md:col-span-2">...</div>
</div>
```

### book-categories-section.astro

```html
<!-- Grid: 2 cols mobile → 3 cols tablet → 4 cols desktop -->
<div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
  <!-- Categories -->
</div>

<!-- Text: sm mobile → base desktop -->
<span class="text-sm md:text-base">Label</span>
```

### card-demo-section.astro

```html
<!-- Grid: 1 column mobile → 3 columns tablet+ -->
<div class="grid gap-6 md:grid-cols-3">
  <!-- Cards -->
</div>

<!-- Title: xl mobile → 2xl desktop -->
<h3 class="text-xl md:text-2xl">Card title</h3>
```

### waitlist-section.astro

```html
<!-- Title: 4xl mobile → 6xl desktop -->
<h2 class="text-4xl md:text-6xl">...</h2>

<!-- Badge (responsive sizing) -->
<div class="px-4 py-2 md:px-6 md:py-3">
  <Sparkles class="h-4 w-4 md:h-5 md:w-5" />
  <span class="text-sm md:text-base">Badge</span>
</div>

<!-- Form: vertical mobile → horizontal tablet+ -->
<form class="flex flex-col gap-3 sm:flex-row">
  <input class="flex-1" />
  <button>Submit</button>
</form>
```

## Touch Targets

### Minimum Sizes

**WCAG 2.1 Level AAA:** Touch targets should be at least 44×44 pixels.

**Our Standard:** `h-14` (56px) for buttons and inputs

```html
<!-- ✅ Good touch target (56px) -->
<button class="h-14 px-8">Button</button>
<input class="h-14" type="email" />

<!-- ❌ Too small for touch (32px) -->
<button class="h-8 px-4">Button</button>
```

### Touch-Friendly Patterns

```html
<!-- Buttons -->
<button class="h-14 px-8 text-lg">
  <!-- 56px height, good spacing -->
</button>

<!-- Inputs -->
<input class="h-14 pr-4 pl-12 text-base" />
<!-- 56px height, room for icon -->

<!-- Cards (entire card clickable) -->
<div class="cursor-pointer p-6">
  <!-- Padding makes entire area tappable -->
</div>

<!-- Badges (adequate size) -->
<span class="inline-flex items-center gap-1 px-2.5 py-0.5">
  <!-- Small but not interactive, OK -->
</span>
```

## Common Responsive Issues

### Issue 1: Text Too Small on Mobile

**Problem:**

```html
<h1 class="text-lg">Title</h1>
<!-- ❌ 18px is too small -->
```

**Solution:**

```html
<h1 class="text-xl md:text-2xl">Title</h1>
<!-- ✅ 20px → 24px -->
```

### Issue 2: Too Many Columns on Mobile

**Problem:**

```html
<div class="grid grid-cols-4"><!-- ❌ 4 cols too many on mobile --></div>
```

**Solution:**

```html
<div class="grid grid-cols-2 md:grid-cols-4"><!-- ✅ 2 → 4 cols --></div>
```

### Issue 3: Horizontal Scroll

**Problem:**

```html
<div class="flex flex-row"><!-- ❌ May overflow on mobile --></div>
```

**Solution:**

```html
<div class="flex flex-col sm:flex-row"><!-- ✅ Stacks on mobile --></div>
```

### Issue 4: Fixed Sizing

**Problem:**

```html
<div class="px-6 py-3"><!-- ❌ Same on all sizes --></div>
```

**Solution:**

```html
<div class="px-4 py-2 md:px-6 md:py-3"><!-- ✅ Smaller on mobile --></div>
```

## Testing Responsive Design

### Browser DevTools

1. Open DevTools (F12)
2. Click device toolbar icon
3. Test common viewports:
   - iPhone SE: 375px
   - iPhone 12/13: 390px
   - iPad: 768px
   - Desktop: 1440px

### Quick Check List

For each component:

- ✅ Text readable on 375px width?
- ✅ No horizontal scroll on mobile?
- ✅ Buttons/inputs at least 44px tall?
- ✅ Grid columns appropriate for screen size?
- ✅ Images scale correctly?
- ✅ Spacing comfortable on all sizes?

## Best Practices

1. **Design mobile-first** - Start with base styles, add `md:` enhancements
2. **Scale text** - Always use responsive text sizes for titles/headings
3. **Stack on mobile** - Use `flex-col sm:flex-row` for horizontal layouts
4. **Progressive grids** - Start with fewer columns, add more on larger screens
5. **Touch targets** - Minimum 44px (we use 56px with `h-14`)
6. **Test thoroughly** - Check on actual devices or DevTools
7. **Adjust spacing** - Smaller padding/gaps on mobile, larger on desktop
8. **Consistent breakpoints** - Stick to `sm:` and `md:` for most cases
9. **Verify scroll** - Ensure no horizontal scroll on any viewport
10. **Performance** - Responsive images, lazy loading when appropriate

## Quick Reference

### Breakpoint Usage

```html
<!-- Text Scaling -->
text-4xl md:text-5xl md:text-6xl /* Titles */ text-xl md:text-2xl /* Headings */
text-sm md:text-base /* Small text */

<!-- Layout -->
flex-col sm:flex-row /* Buttons, forms */ grid-cols-2 md:grid-cols-3
lg:grid-cols-4 /* Progressive grid */

<!-- Spacing -->
px-4 md:px-6 /* Horizontal padding */ py-2 md:py-3 /* Vertical padding */ gap-4
md:gap-6 /* Grid/flex gap */

<!-- Icons -->
h-4 w-4 md:h-5 md:w-5 /* Responsive icons */

<!-- Visibility -->
hidden md:block /* Hide on mobile, show on desktop */
```
