# Icons Guide

## Lucide Icons for Astro

This project uses **Lucide Astro** for all icons.

### Correct Import

```astro
---
// ✅ CORRECT - Always use this
import { Heart, Mail, Sparkles } from "@lucide/astro";
---

<Heart class="h-5 w-5 text-red-500" />
```

### Incorrect Imports

```astro
---
// ❌ WRONG - Do not use these
import { Heart } from "lucide-react";       // React version
import { Heart } from "lucide-astro";       // Wrong package name
import { Heart } from "lucide";             // Wrong package
---
```

## Currently Used Icons

### By Component

| Component | Icons Used |
|-----------|------------|
| book-hero.astro | ArrowRight, Sparkles |
| features-section.astro | BookOpen, Heart, Camera, CalendarCheck |
| book-categories-section.astro | Baby, Heart, Users, CircleUser, User |
| card-demo-section.astro | Clock, Calendar, CircleCheck |
| waitlist-section.astro | Mail, Sparkles |
| footer.astro | Heart |

### Icon Details

**ArrowRight** - Used in CTA buttons
```astro
<button>
  Text
  <ArrowRight class="h-5 w-5" />
</button>
```

**Sparkles** - Used in badges and success messages
```astro
<Sparkles class="h-4 w-4 text-amber-600" />
```

**BookOpen, Heart, Camera, CalendarCheck** - Feature icons
```astro
<BookOpen class="h-7 w-7 text-amber-700" />
```

**Baby, Users, CircleUser, User** - Category icons
```astro
<Baby class="h-8 w-8 text-white" />
```

**Clock, Calendar, CircleCheck** - Status icons
```astro
<Clock class="h-3 w-3" />           {/* Pending */}
<Calendar class="h-3 w-3" />        {/* Scheduled */}
<CircleCheck class="h-3 w-3" />     {/* Completed */}
```

**Mail** - Form input icon
```astro
<Mail class="h-5 w-5 text-gray-500" />
```

## Deprecated Icons

Lucide has deprecated some icons following new naming conventions.

### Naming Convention

**Rule:** List elements from biggest to smallest

- If circle is bigger: `CircleUser` (not `UserCircle`)
- If user is bigger: `UserCircle` (deprecated, use `CircleUser`)

### Migration Guide

| ❌ Deprecated | ✅ Use Instead | Reason |
|--------------|----------------|---------|
| `UserCircle` | `CircleUser` | Circle is bigger than user icon |
| `CheckCircle2` | `CircleCheck` | Circle is bigger than check mark |

### How to Fix Deprecated Icons

1. **Update import:**
```astro
---
// Before
import { UserCircle } from "@lucide/astro";

// After
import { CircleUser } from "@lucide/astro";
---
```

2. **Update usage:**
```astro
<!-- Before -->
<UserCircle class="h-8 w-8" />

<!-- After -->
<CircleUser class="h-8 w-8" />
```

3. **Update in data arrays:**
```astro
---
// Before
const data = [
  { icon: UserCircle, label: "User" }
];

// After
const data = [
  { icon: CircleUser, label: "User" }
];
---
```

### Checking for Deprecated Icons

Use context7 to verify icon names:

```bash
mcp__context7__resolve-library-id: "lucide"
mcp__context7__get-library-docs: "/lucide-icons/lucide"
```

## Icon Sizing

### Size Guidelines

| Context | Size Class | Pixels | Usage |
|---------|-----------|--------|-------|
| Badge icons | `h-3 w-3` | 12px | Status badges |
| Badge icons (responsive) | `h-4 w-4 md:h-5 md:w-5` | 16px → 20px | Larger badges |
| Button icons | `h-5 w-5` | 20px | CTA buttons |
| Feature icons | `h-7 w-7` | 28px | Feature cards |
| Category icons | `h-8 w-8` | 32px | Category cards |

### Responsive Icon Sizing

Make icons larger on desktop when needed:

```astro
<!-- Mobile: 16px, Desktop: 20px -->
<Sparkles class="h-4 w-4 md:h-5 md:w-5" />
```

## Icon Usage Patterns

### Icon in Button

```astro
<button class="inline-flex items-center gap-2">
  Button Text
  <ArrowRight class="h-5 w-5" />
</button>
```

### Icon in Badge

```astro
<span class="inline-flex items-center gap-1">
  <Clock class="h-3 w-3" />
  Status Label
</span>
```

### Icon in Input (Absolute Positioning)

```astro
<div class="relative">
  <Mail class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
  <input class="pl-12" type="email" />
</div>
```

### Icon in Card Header

```astro
<div class="flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-amber-400 to-rose-400">
  <Heart class="h-7 w-7 text-white" />
</div>
```

### Icon with Hover Scale

```astro
<div class="group">
  <div class="transition-transform group-hover:scale-110">
    <BookOpen class="h-7 w-7 text-amber-700" />
  </div>
</div>
```

### Filled Icon

```astro
<Heart class="h-5 w-5 fill-white text-white" />
```

## Icon Colors

### By Context

```astro
<!-- Accent color -->
<Sparkles class="text-amber-600" />

<!-- Muted/placeholder -->
<Mail class="text-gray-500" />

<!-- On colored background -->
<Heart class="text-white" />

<!-- Status colors -->
<Clock class="text-slate-700" />      {/* Pending */}
<Calendar class="text-amber-700" />   {/* Scheduled */}
<CircleCheck class="text-emerald-700" /> {/* Completed */}
```

## Finding New Icons

### Browse Lucide Icons

1. Visit: https://lucide.dev/icons
2. Search for the icon you need
3. Copy the exact name (case-sensitive)
4. Import and use

### Example: Adding a New Icon

```astro
---
// 1. Import the icon
import { Star } from "@lucide/astro";
---

<!-- 2. Use in template -->
<Star class="h-5 w-5 text-amber-500" />
```

## Best Practices

1. **Always import from `@lucide/astro`** - Not from other Lucide packages
2. **Use current icon names** - Avoid deprecated icons
3. **Size appropriately** - Follow size guidelines for context
4. **Make responsive when needed** - Use `md:` variants for larger screens
5. **Check deprecation** - Use context7 to verify icon names
6. **Consistent sizing** - Use same sizes for same contexts across components
7. **Semantic usage** - Icon should match its meaning (Clock for time, Heart for love, etc.)

## Troubleshooting

### "Icon not found" error

```astro
---
// Check import source
import { IconName } from "@lucide/astro"; // ✅ Correct

// Check icon name spelling and case
import { ArrowRight } from "@lucide/astro"; // ✅ Correct
import { arrowRight } from "@lucide/astro"; // ❌ Wrong case
import { ArrowRght } from "@lucide/astro";  // ❌ Typo
---
```

### Icon not displaying

1. Check if icon is imported
2. Verify class names are applied
3. Check if parent has `display: none` or `hidden`
4. Verify icon size isn't `h-0 w-0`

### Icon too small/large

Use appropriate size class:
```astro
<!-- Too small -->
<Icon class="h-1 w-1" /> <!-- ❌ 4px -->

<!-- Too large -->
<Icon class="h-20 w-20" /> <!-- ❌ 80px -->

<!-- Just right -->
<Icon class="h-5 w-5" /> <!-- ✅ 20px -->
```

## Quick Reference

### Common Icons

```astro
---
import {
  // Actions
  ArrowRight,
  Mail,

  // Status
  Clock,
  Calendar,
  CircleCheck,

  // Categories
  Heart,
  Baby,
  User,
  Users,
  CircleUser,

  // Features
  BookOpen,
  Camera,
  CalendarCheck,

  // Decorative
  Sparkles,
} from "@lucide/astro";
---
```

### Standard Sizes

```css
h-3 w-3   /* 12px - Tiny badges */
h-4 w-4   /* 16px - Small badges */
h-5 w-5   /* 20px - Buttons, inputs */
h-7 w-7   /* 28px - Feature icons */
h-8 w-8   /* 32px - Category icons */
```
