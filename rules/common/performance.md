# Performance Optimization

## Model Selection Strategy

**Lightweight models** (fast, cheaper):
- Lightweight agents with frequent invocation
- Pair programming and code generation
- Worker agents in multi-agent systems

**Best coding models:**
- Main development work
- Orchestrating multi-agent workflows
- Complex coding tasks

**Deepest-reasoning models:**
- Complex architectural decisions
- Maximum reasoning requirements
- Research and analysis tasks

## Context Window Management

Avoid last 20% of context window for:
- Large-scale refactoring
- Feature implementation spanning multiple files
- Debugging complex interactions

Lower context sensitivity tasks:
- Single-file edits
- Independent utility creation
- Documentation updates
- Simple bug fixes

## Build Troubleshooting

If build fails:
1. Analyze error messages
2. Fix incrementally
3. Verify after each fix
