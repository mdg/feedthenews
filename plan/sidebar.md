# Redesign Plan: Sidebar Layout + /@[user] Page

## Status

Partially implemented:

- Sidebar exists (`src/lib/components/Sidebar.svelte`) and is used on
  `/@[user]`, `/member`, and `/member/profile`.
- Page content is centered next to the sidebar
  (`flex-1` main + `mx-auto max-w-5xl` inner wrapper); this ad-hoc wrapper
  will be replaced by the `MainLayout` component (step 0 below).
- "Open Bluesky" link moved next to "Subscribe on Patreon" in a shared
  button row below the stats.
- Description is displayed under the name.

## Remaining Work

### 0. MainLayout component

Create `src/lib/components/MainLayout.svelte` as the shared page shell:

- Three-column flex row, left to right: `[ Sidebar ][ Main Content ][ Reserved Space ]`.
- `Main Content` is a slot (`flex-1`); `Sidebar` rendered by the layout on
  the left; `Reserved Space` is a fixed-width empty column on the right
  (same width as the sidebar, e.g. `w-64`) so the content column is
  optically centered rather than pushed against the right edge.
- The whole `[ sidebar | content | reserved ]` group is centered on the
  page: an outer wrapper (`mx-auto` with a max width, e.g. `max-w-7xl`)
  so equal gutters appear on wide screens.
- Reserved space could later host contextual widgets (e.g. "who to
  sponsor" suggestions); for now it stays empty or is hidden below `xl`.
- Replace the ad-hoc `flex` + `mx-auto max-w-5xl` wrappers currently in
  `/@[user]`, `/member`, and `/member/profile` with `MainLayout`, moving
  each page's content into the slot.
- Props/slots: default slot for content; optional prop to suppress the
  reserved column if a page ever needs full width.

### 1. Remove the top Header on sidebar pages

The top `Header` repeats the "Feed The News" brand that the sidebar already
shows, wasting vertical space. Plan:

- Drop `Header` from `/@[user]`, `/member`, `/member/profile`.
- Move the sign-in entry point (or session user name link) into the sidebar
  footer. `Sidebar` needs an `onSignIn` prop (or read `page.data.sessionUser`
  directly and emit a sign-in event).

### 2. Identity card for /@[user]

Replace the loose stack with a single profile card:

- Sponsor button above the user name: the Sponsor/Sponsored `ToggleButton`
  sits at the top of the card (right-aligned or full-width row above the
  identity row), so the primary action is visible without scrolling and
  ahead of the name.
- Horizontal identity row below it: avatar (rounded-full, ring-1
  ring-stone-200) beside name + description + chips, stacked vertically.
- Description clamped to 2-3 lines (`line-clamp-3`) with a title tooltip
  for overflow.

### 3. Sponsor action placement

- Sponsor toggle sits above the user name (top of the identity card, see
  step 2).
- Card footer row (border-t border-stone-200) keeps the external links
  (Patreon + Bluesky) grouped together.
- Keep inline status/error message under the buttons.
- Remove the standalone right-aligned toggle container.

### 4. Restyle stats

- One `dl` with a 3-column grid (`grid-cols-3 divide-x divide-stone-200`),
  each cell: number (`text-2xl font-bold`) over label
  (`text-xs uppercase tracking-wide text-stone-500`).
- Render all three slots unconditionally; use `—` for missing values so the
  grid stays stable.
- Move the amber "Subscriber" badge next to the name as a small chip instead
  of occupying a stats cell.

### 5. Responsive

- `lg+`: sidebar + centered content + reserved space side-by-side via
  `MainLayout`.
- Below `lg`: reserved space hidden; below `md` the sidebar collapses to a
  top bar (out of scope for now).
- Card identity row wraps: avatar above name on small screens
  (`flex flex-col sm:flex-row`).

### 6. Keep behavior identical

Toggle logic, CSRF handling, patreonName derivation, SignInModal, profile
editing and sign-out on `/member/profile` all unchanged.

## Out of Scope

- Sidebar collapse on mobile.
- New routes for Search/Sponsorships/Sponsors/History menu items
  (links currently point to not-yet-existing pages).
