/**
 * Commitlint Configuration
 *
 * Format: <type>(<scope>)?: <gitmoji> <subject>
 *
 * Examples:
 *   feat: ✨ add login page
 *   fix(auth): 🐛 handle token refresh errors
 *   docs(readme): 📝 add quickstart
 *   refactor(core): ♻️ extract user service
 */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Type rules
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation
        "style", // Formatting, no code change
        "refactor", // Code restructuring
        "perf", // Performance improvement
        "test", // Adding tests
        "build", // Build system changes
        "ci", // CI configuration
        "chore", // Maintenance
        "revert", // Revert commit
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],

    // Scope rules (optional)
    "scope-case": [2, "always", "lower-case"],

    // Subject rules
    "subject-empty": [2, "never"],
    "subject-max-length": [2, "always", 72],
    "subject-full-stop": [2, "never", "."],
    "subject-case": [0], // Disabled - gitmoji breaks case rules

    // Header rules
    "header-max-length": [2, "always", 100],
  },
};
