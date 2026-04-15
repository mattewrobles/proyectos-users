# Figma MCP + Design System Rules (figma-ds-cli)

These rules define how to implement Figma-driven work in this repository.

## Project Context

- This repository is a **Node.js CLI** for controlling Figma Desktop, not a web UI app.
- Primary implementation surface: `src/index.js` (Commander commands + orchestration).
- Figma transport layers:
  - `src/figma-client.js` (CDP-based direct execution)
  - `plugin/code.js` (Safe Mode plugin bridge)
- Component templates:
  - `src/shadcn.js` (shadcn/ui component JSX templates)
  - `src/blocks/` (higher-level prebuilt layouts like dashboards)

## General Component Rules

- IMPORTANT: Reuse existing generators first:
  - `src/shadcn.js` for shadcn components and variants
  - `src/blocks/` for page/layout blocks
- Add new reusable template-based components in `src/shadcn.js` or `src/blocks/*` (not ad-hoc inline blobs) when they are likely to be reused.
- Keep command handlers in `src/index.js` thin; put reusable logic in helper functions where possible.
- Follow existing naming patterns:
  - CLI command groups: noun-based (`tokens`, `create`, `bind`, `node`, `blocks`)
  - Figma variable references: `var:<token-name>`
  - Collections: slash-delimited namespaces (`shadcn/primitives`, `shadcn/semantic`)

## Styling and Token Rules

- IMPORTANT: Never hardcode colors in reusable component definitions when a token exists.
- Prefer Figma variable binding using `var:` syntax and existing bind flows.
- For shadcn work, use:
  - `shadcn/primitives` for base palette
  - `shadcn/semantic` for semantic aliases + Light/Dark modes
- Preserve existing Light/Dark alias behavior from `tokens preset shadcn` in `src/index.js`.
- Keep fallbacks only where required for robustness; primary path should be variable-bound output.

## Figma MCP Integration Rules

These rules apply when implementing from Figma MCP inputs.

### Required Flow (do not skip)

1. Run `get_design_context` for target node(s).
2. If output is too large, run `get_metadata`, then refetch only required nodes via `get_design_context`.
3. Run `get_screenshot` for visual parity checks.
4. Gather required assets.
5. Implement by mapping design intent to this CLI’s conventions (commands/templates/variable binding), not to React app code.
6. Validate output visually and functionally before completion.

### Implementation Rules

- Treat MCP code output as a structural reference, not final repository style.
- IMPORTANT: Convert design output into:
  - CLI commands in `src/index.js`, or
  - reusable JSX template definitions in `src/shadcn.js` / `src/blocks/*`.
- Prefer `render` for text-heavy components; avoid brittle one-off eval patterns.
- Reuse existing command patterns for:
  - tokens (`tokens preset`, `tokens tailwind`)
  - variable binding (`bind fill/stroke/...`)
  - component conversion (`node to-component`)
- When adding visual creation flows, preserve post-creation verification practice (`verify`).

## Asset Handling

- IMPORTANT: If MCP returns localhost asset URLs, use them directly.
- Do not add new icon packages.
- For icons, prefer existing Iconify/Lucide flow (`<Icon name="lucide:...">`) and current SVG import behavior.
- For images/SVG, follow existing creation paths (`figma.createImageAsync`, `createNodeFromSvg`) already used in `src/index.js` / `src/figma-client.js`.

## Architecture and Code Organization

- Keep platform/connection logic aligned with existing architecture:
  - connection/state in client classes
  - command UX + user feedback in `src/index.js`
- Preserve Safe Mode compatibility (`plugin/code.js`) when introducing behavior that executes code in Figma context.
- Avoid introducing frontend framework assumptions (React runtime, CSS modules, Tailwind configs) into this repository.

## Testing and Validation

- Use existing tests under `tests/*.test.js` for non-visual logic.
- For visual/generation changes, verify via CLI flow:
  - create/render operation
  - variable binding checks
  - `verify` screenshot validation path
- Keep outputs deterministic where possible (names, ordering, variable lookup).

## Critical “IMPORTANT” Rules

- IMPORTANT: Reuse existing shadcn/block generators before creating new custom flows.
- IMPORTANT: Prefer token binding (`var:` + variable collections) over hardcoded color values.
- IMPORTANT: Keep implementations compatible with both direct CDP mode and Safe Mode plugin bridge.
- IMPORTANT: For dashboards/page layouts, use `blocks create` patterns rather than manual low-level reconstruction when applicable.
