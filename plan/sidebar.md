# Redesign Plan: Sidebar Layout + /@[user] Page

## Status

Partially implemented:

- Sidebar exists (`src/lib/components/Sidebar.svelte`) and is used on
  `/@[user]`, `/member`, and `/member/profile`.
- Page content is centered next to the sidebar
  (`flex-1` main + `mx-auto max-w-5xl` inner wrapper).
- "Open Bluesky" link moved next to "Subscribe on Patreon" in a shared
  button row below the stats.
- Description is displayed under the name.

## Remaining Work

### 1. Remove the top Header on sidebar pages

The top `Header` repeats the "Feed The News" brand that the sidebar already
shows, wasting vertical space. Plan:

- Drop `Header` from `/@[user]`, `/member`, `/member/profile`.
- Move the sign-in entry point (or session user name link) into the sidebar
  footer. `Sidebar` needs an `onSignIn` prop (or read `page.data.sessionUser`
  directly and emit a sign-in event).

### 2. Identity card for /@[user]

Replace the loose stack with a single profile card:

- Horizontal identity row: avatar (rounded-full, ring-1 ring-stone-200)
  beside name + description + chips, stacked vertically.
- Description clamped to 2-3 lines (`line-clamp-3`) with a title tooltip
  for overflow.

### 3. Move the Sponsor action into the card

- Card footer row (border-t border-stone-200): Sponsor toggle + Patreon +
  Bluesky links grouped as external actions.
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

- `lg+`: sidebar + centered content side-by-side (current flex layout).
- Below `lg`: sidebar hidden or collapses to a top bar (out of scope for
  now).
- Card identity row wraps: avatar above name on small screens
  (`flex flex-col sm:flex-row`).

### 6. Keep behavior identical

Toggle logic, CSRF handling, patreonName derivation, SignInModal, profile
editing and sign-out on `/member/profile` all unchanged.

## Out of Scope

- Sidebar collapse on mobile.
- New routes for Search/Sponsorships/Sponsors/History menu items
  (links currently point to not-yet-existing pages).
