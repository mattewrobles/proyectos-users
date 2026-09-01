# Development Workflow

> This file extends [common/git-workflow.md](./git-workflow.md) with the full feature development process that happens before git operations.

## Feature Implementation Workflow

0. **Research & Reuse** _(mandatory before any new implementation)_
   - Search for existing implementations, templates, and patterns before writing anything new.
   - Confirm API behavior and package usage from primary vendor docs before implementing.
   - Prefer battle-tested libraries over hand-rolled solutions.
   - Prefer adopting or porting a proven approach over writing net-new code when it meets the requirement.

1. **Plan First**
   - Generate planning docs before coding when the task is non-trivial
   - Identify dependencies and risks
   - Break down into phases

2. **TDD Approach**
   - Write tests first (RED)
   - Implement to pass tests (GREEN)
   - Refactor (IMPROVE)
   - Verify 80%+ coverage

3. **Code Review**
   - Review immediately after writing code
   - Address CRITICAL and HIGH issues
   - Fix MEDIUM issues when possible

4. **Commit & Push**
   - Detailed commit messages
   - Follow conventional commits format
   - See [git-workflow.md](./git-workflow.md) for commit message format and PR process
