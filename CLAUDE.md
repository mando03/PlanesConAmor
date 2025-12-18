# CLAUDE.md - CITASWEB

This file provides guidance to Claude Code when working with code in this repository.

## Documentation Structure

This project uses a modular documentation approach. Instead of having all information in this file, specific topics are organized in separate files within the `.agents/` directory. This optimizes context usage by loading only relevant information when needed.

### When to Read Each File

Read the appropriate documentation file(s) based on the task at hand:

#### **.agents/BestPractices.md**

**Read when:**

- Starting a new task or feature
- Need guidance on code quality workflow
- Setting up session documentation

#### **.agents/Architecture.md**

**Read when:**

- Understanding project structure
- Adding new components or pages
- Questions about file organization
- Working with Astro framework

#### **.agents/Styling.md**

**Read when:**

- Working with Tailwind CSS
- Applying custom fonts
- Using gradients or colors
- Questions about CSS/styling approach

#### **.agents/Components.md**

**Read when:**

- Creating new components
- Understanding component patterns
- Need examples of existing components
- Questions about component conventions

#### **.agents/Icons.md**

**Read when:**

- Adding icons to components
- Icon import issues
- Questions about deprecated icons
- Need list of available icons

#### **.agents/Responsive.md**

**Read when:**

- Implementing responsive design
- Working with breakpoints
- Mobile optimization
- Touch target sizing

### General Workflow

1. **Always read `BestPractices.md` first** when starting any new task
2. **Read relevant module(s)** based on the specific work area

## Quick Reference

**Package Manager**: pnpm (not npm or yarn)

**Key Commands**:

- `pnpm dev` - Start development server
- `pnpm preview` - Preview build locally
- `pnpm build` - Build for production
- `pnpm lint:fix`- Run ESLint and fix errors
- `pnpm lint` - Run ESLint
- `pnpm format:check` - Run Prettier to validates code formatting
- `pnpm format` - Format code with Prettier
