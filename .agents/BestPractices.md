# Development Best Practices

## General Rules

1. First think through the problem, read the codebase for relevant files, and create a plan.
2. The plan should have a list of todo items that you can check off as you complete them.
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made.
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. DO NOT BE LAZY, NEVER BE LAZY, IF THERE IS A BUG FIND THE ROOT CAUSE AND FIX IT. NO TEMPORARY FIXES. YOU ARE A SENIOR DEVELOPER. NEVER BE LAZY.
8. MAKE ALL FIXES AND CODE CHANGES AS SIMPLE AS HUMANLY POSSIBLE. THEY SHOULD ONLY IMPACT NECESSARY CODE RELEVANT TO TASK AND NOTHING ELSE. IT SHOULD IMPACT AS LITTLE CODE AS POSSIBLE. YOUR GOAL IS TO NOT INTRODUCE ANY BUGS. IT'S ALL ABOUT SIMPLICITY.
9. Always use context7 when using a new technology, new version of dependency or framework, or when your knowledge base does not have information about the request for code generation, setup or configuration steps, or library/API documentation. This means you should automatically use the Context7 MCP tools to resolve library id and get library docs without having to be explicitly asked.

## Code Quality Workflow

When completing any implementation, follow this sequence:

1. **Run Lint First**: `pnpm lint`
   - Ensures code quality and catches potential issues
   - Must pass with no errors

2. **Run Prettier**: `pnpm format:check`
   - Ensures code quality
   - Validates code formatting without making changes
   - If it shows errors, run the command: `pnpm format`

3. **Build for Production**: `pnpm build`
   - Verifies TypeScript compilation
   - Ensures no type errors
   - Checks bundle optimization

## Session Documentation

- **Location**: `.docs/` directory (git-ignored)
- **Format**: Markdown files with timestamp naming: `summary_DDMMYYYYHHMM.md`
- **Purpose**: Track development sessions, changes, and decisions
- **Content**: Detailed session summaries including:
  - Files created/modified
  - Problems encountered and solutions
  - Code changes with explanations
  - Commands executed
  - Lessons learned
- **Git**: The `.docs/` folder is included in `.gitignore` to keep session summaries local
