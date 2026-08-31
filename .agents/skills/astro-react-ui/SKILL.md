---
name: astro-react-ui
description: Design system guidelines for the Pop-Art Neo Brutalism and Earthy Paper themes.
---
# Astro & React UI Designer

Use this skill when creating new UI components or pages in the frontend.

## Themes:
The portfolio relies on two primary themes controlled by `$navMode`:
1. **Personal Mode (Pop-Art Neo Brutalism)**:
   - Backgrounds: Solid `#FF007F` (Magenta), `#FFE600` (Yellow), `#00F0FF` (Cyan)
   - Fonts: `font-comic` with `font-black`
   - Borders: Hard `border-2 border-black` or `border-4 border-black`
   - Shadows: Hard offset shadows like `shadow-[4px_4px_0px_0px_#000]`
   - Shapes: Speech bubbles (e.g. `rounded-2xl rounded-bl-none`)
2. **Professional Mode (Earthy Paper)**:
   - Backgrounds: `#F4F1EA`, `#ECE7DF`
   - Fonts: `font-sans`, `font-serif`, clean modern typography
   - Borders: Subtle inset shadows, thin borders `border-[#E6E0D5]`
   - Elements: Minimalist buttons, clean spacing.

## Architecture:
- Use Astro for routing, SEO, and static layouts.
- Use React for interactive islands (e.g. `client:load`).
- Use NanoStores for cross-island state management.
