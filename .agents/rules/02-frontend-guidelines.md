# 02 - Frontend Guidelines (Astro, React, Tailwind)

## Component & Styling Architecture
1. **Mobile-First Tailwind**: Always build UI components mobile-first. Ensure earth-tones or pop-art themes are respected based on `$navMode` (refer to the `astro-react-ui` skill).
2. **DRY Components**: Extract repeated UI elements into reusable React components.
3. **No XSS**: STRICTLY PROHIBITED to use `dangerouslySetInnerHTML`.

## State Management
1. **Nano Stores for Global State**: Because Astro isolates React components into "Islands", DO NOT use React Context or Redux for cross-component global state. You MUST use **Nano Stores** (`@nanostores/react`) for any state that needs to be shared across islands (e.g., UI modes, localization).

## Accessibility (A11y)
1. **Keyboard & Screen Readers**: All UI interactions must be accessible.
2. **Labels & Alts**: Use `aria-label` on icon-only buttons, descriptive `alt` tags on images, and ensure high color contrast for text.
