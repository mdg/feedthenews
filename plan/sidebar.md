# Redesign Plan: /@[user] Profile Page

## Goals

- Give the profile a clear visual hierarchy: identity first, actions second,
  stats third.
- Better integrate the sidebar layout (already present) with the page content.
- Improve spacing, grouping, and responsive behavior.
- Keep the existing stone/amber design language used across the app.

## Current Problems

- The top `Header` repeats the "Feed The News" brand that the sidebar already
  shows, wasting vertical space.
- Identity elements (avatar, name, description, Bluesky link) are stacked
  without a coherent card or banner treatment.
- The Sponsor `ToggleButton` sits alone in a right-aligned container with an
  odd `max-w-md` wrapper, disconnected from the identity block.
- The stats `dl` uses a two-column grid that crams "Subscriber" badge,
  "Sponsoring", and "Sponsors" together; conditional blocks create ragged
  spacing.
- Patreon button floats below with no grouping rationale.

## Proposed Layout

```
+--------------------------------------------------------------+
| Sidebar |  Profile card (max-w-2xl, rounded, shadow, p-8)    |
|         |  +------------------------------------------------+|
|         |  | [avatar 80px]  Name (Username w/ platform icon) ||
|         |  |                description text                 ||
|         |  |                [Open Bluesky] link               ||
|         |  +------------------------------------------------+|
|         |  [Sponsor / Sponsored toggle]  (card footer area)   |
|         |  +------------------------------------------------+|
|         |  | Stats row: Subscriber | Sponsoring | Sponsors   ||
|         |  | (3-col grid, centered numbers, always 3 slots,  ||
|         |  |  em-dash when zero/absent)                      ||
|         |  +------------------------------------------------+|
|         |  [Subscribe on Patreon] (secondary button style)   |
+--------------------------------------------------------------+
```

## Steps

1. **Remove the top Header on this page.** The sidebar already carries the
   brand and the sign-in entry point should move into the sidebar footer
   (or stay in Header only on non-sidebar pages). Update `Header` usages
   accordingly.

2. **Restructure main content.** Replace the loose stack with a single
   profile card:
   - Horizontal identity row: avatar (rounded-full, ring-1 ring-stone-200)
     beside name + description + Bluesky link, stacked vertically.
   - Description clamped to 2-3 lines (`line-clamp-3`) with a title tooltip
     for overflow.

3. **Move the Sponsor action into the card** as a footer row (left-aligned,
   next to the Patreon button when present, separated by a
   border-t border-stone-200). Remove the standalone right-aligned toggle
   container. Keep status/error message inline under the buttons.

4. **Restyle stats.** One `dl` with a 3-column grid
   (`grid-cols-3 divide-x divide-stone-200`), each cell:
   number (`text-2xl font-bold text-stone-900`) over label
   (`text-xs uppercase tracking-wide text-stone-500`). Render all three
   slots unconditionally; use `—` for missing values so the grid stays
   stable. Keep the amber "Subscriber" badge but move it next to the name
   as a small chip instead of occupying a stats cell.

5. **Standardize buttons.**
   - Primary (Sponsor toggle, Patreon): existing stone-900 pill style.
   - External links (Bluesky, Patreon): consistent underline-on-hover
     text style with external-link icon.

6. **Responsive.**
   - `lg+`: sidebar + content side-by-side (current flex).
   - Below `lg`: sidebar hidden or collapses to a top bar (future work;
     out of scope here, note it).
   - Card identity row wraps: avatar above name on small screens
     (`flex flex-col sm:flex-row`).

7. **Keep behavior identical:** toggle logic, CSRF handling, patreonName
   derivation, SignInModal all unchanged.

## Out of Scope

- Sidebar collapse on mobile.
- New routes for Search/Sponsorships/Sponsors/History menu items.
- Session user's own profile view differences.
