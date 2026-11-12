---
name: frontend-design
description: Redesign a Vue 3 application's UI into a modern SaaS-style interface with a vertical navigation sidebar on the left instead of a top nav bar, consistent spacing, clean card layouts and a polished professional look. Use when asked to redesign the UI, modernize the layout, add a sidebar, or make the app look like a SaaS dashboard.
---

# Frontend Design: SaaS-style Vue 3 redesign

Turns a basic Vue 3 layout into a polished SaaS interface: dark left sidebar, light content area, white cards, one accent color, consistent spacing. Frontend only. Never touch `server/`, API contracts or mock data.

## Project rules that always apply
- **Delegate .vue work.** Any time you create or significantly modify a `.vue` file, delegate to the `vue-expert` subagent (see `CLAUDE.md`). If that agent type is not available in the session, spawn a general-purpose agent and tell it to follow `.claude/agents/vue-expert.md`.
- **No emojis in the UI.** Use inline SVG icons.
- **Public repo.** Never commit credentials, hostnames or registry URLs.
- **Keep behavior.** Do not change routes, API calls, `t()` i18n keys or script logic. This is a visual redesign.
- **Composition API**, scoped styles in components, unique `v-for` keys (never the index).

## Workflow

### 1. Inspect before designing
Find and read:
- The layout shell (usually `client/src/App.vue`): current nav, header, global `<style>` block.
- The router (`client/src/main.js`): the list of routes that become sidebar items.
- Shared classes that views rely on (for example `.card`, `.stat-card`, `.page-header`, `table`, `.badge`). These live in the global styles, so changing them restyles every page.
- Anything tied to the old nav height, such as `position: sticky; top: 70px` in a filter bar, and dropdowns anchored to the top-right (`position: absolute; right: 0`).
- The i18n locale files. Every nav label should come from a `t()` key. Add missing keys to all locales.

### 2. Ask, then plan
Use AskUserQuestion for any choice the user has not already made: look (dark sidebar with light content, light everywhere, fully dark), sidebar behavior (fixed or collapsible), and scope (shell and shared styles, or every page).

Then write a short design plan and check it against the request before writing code:
- **Color:** 4 to 6 named hex values (sidebar, page background, card surface, border, text, accent) plus status colors.
- **Type:** one family, a clear size scale, weights.
- **Spacing:** a 4/8px scale (4, 8, 12, 16, 24, 32). Use it everywhere.
- **Shape:** one radius for cards, a smaller one for controls and badges, one subtle shadow.

### 3. Build the layout
- `.app` becomes a flex row: `<aside class="sidebar">` plus `<div class="content">`.
- **Sidebar:** fixed, about 240px, dark slate (for example `#0f172a`). Top: logo and product name. Middle: one `<router-link>` per route with an inline SVG icon and its `t()` label. Bottom: language switcher and profile menu.
- **Active link:** clear highlight (accent tint or accent bar) and `aria-current="page"`.
- **Content column:** light gray page background, max-width container, the filter bar as a clean toolbar card at the top, then `<router-view />`.
- **Narrow screens (under 768px):** the sidebar becomes an off-canvas drawer opened by a menu button, with a backdrop.
- **Dropdowns in the sidebar footer** (profile, language) must open upward or to the right, not below and right-aligned.
- Fix leftovers tied to the old top bar, such as the filter bar's sticky offset.

### 4. Tokens and shared styles
- Define tokens as CSS variables on `:root` in the global style block (`--sidebar-bg`, `--surface`, `--border`, `--text`, `--muted`, `--accent`, `--space-*`, `--radius-*`, `--shadow-card`).
- Rebuild the shared classes on those tokens so all pages get the same card padding, radius, border, table row height and badge style.
- Leave view-level scoped styles alone unless they clash after the shell change. Then fix only what is broken.

### 5. Quality floor
- Visible `:focus-visible` styles on all interactive elements.
- `aria-label` on the nav and icon-only buttons.
- Respect `prefers-reduced-motion`. Keep motion to hover and open/close transitions.
- Text contrast of at least 4.5:1, including the light text on the dark sidebar.
- Japanese labels are longer than English ones. Make sure nothing overflows.

## Verification checklist
- [ ] Every route loads and looks consistent.
- [ ] Active nav item matches the current route.
- [ ] English and Japanese both fit in the sidebar.
- [ ] Filter bar works and sits correctly (no gap or overlap with the old nav height).
- [ ] Profile and language dropdowns open fully on screen.
- [ ] Narrow width: drawer opens and closes, content is not cut off.
- [ ] No console errors in the browser.
- [ ] `npm run build` passes in `client/`.
- [ ] Take screenshots of the main pages and review them critically.

## Extension: collapsible icons-only sidebar
Add only when the user asks:
1. New composable `client/src/composables/useSidebar.js`: a module-level `collapsed` ref saved in `localStorage` (wrap access in try/catch), plus `toggle()`.
2. A toggle button in the sidebar header.
3. Collapsed width about 72px: hide labels, center the icons, add a `title` tooltip to each link, keep the active highlight.
4. Collapse automatically below about 1024px; below 768px use the drawer instead.
5. Animate the width with a short transition and disable it under `prefers-reduced-motion`.
