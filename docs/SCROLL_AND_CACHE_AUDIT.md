# Scroll and cache audit

Date: 2026-10-06

## Findings

- `history.scrollRestoration` was set to `manual`, but the app had no matching position store and restore path. A full reload could therefore return to the top.
- `SmoothScroll` also resolved the current hash when its effect mounted. That was unsafe during a remount or Fast Refresh, especially while the page was restoring its previous position.
- A legacy, unused `HeroContent` component duplicated the `home` ID from the active hero story wrapper. It was not the active reload trigger, but removing the duplicate keeps future reuse from making anchor targets ambiguous.
- The Works title used `overflow-wrap: break-word`, so long words could split at the column edge.

## Changes

- Save the current scroll offset and reveal-cycle state in a tab-scoped session snapshot. Keep a matching `window` snapshot for same-document Fast Refresh.
- Restore only when the browser navigation is a reload or back/forward and the snapshot matches the current path. Otherwise use the requested hash or the browser's native restoration.
- Keep a server-rendered, fixed bootstrap surface over the page while it loads. Use the saved section surface on reload; on a first visit, fade from the dark stage color to the preloaded hero background before revealing the page. The surface also covers any browser paint that occurs before the scroll-restoration script runs.
- Reveal the hero immediately after a reload and keep its saved background, instead of replaying the long first-visit intro. Keep the full entrance sequence for a first visit.
- Center the light-ray layer through its own motion transform so animation cannot replace the CSS centering transform.
- Suppress the root-only hydration warning for the temporary pre-hydration restore marker; remove the marker as soon as restoration finishes.
- Throttle session writes during scrolling and flush on page hide, tab hiding, and scroll-runtime teardown. Do not overwrite a pending restore during React Strict Mode's development remount.
- Persist stable reveal keys with the scroll cycle. Reveals remain visible while scrolling upward and reset when the user returns to the top, so the next downward pass can play them again.
- Leave `home` as one unique anchor target.
- Keep project title words intact and give the wide compositions more room for the copy.
- Declare responsive `sizes` for project images so Next.js can request an image closer to the rendered width.
- Defer the chat and resume modal chunks until a visitor opens them. They stay mounted after first use so their close animations still work; the PDF iframe only loads when the resume opens.

## Cache decision

Portfolio copy and timeline entries are local TypeScript data; they are not fetched from a content API. Project, timeline, and contact images use `next/image` and load lazily by default, while the hero portrait is marked `priority`. The resume PDF is only requested when the resume modal opens. The app does not need an additional runtime content cache for these items.

The stored scroll and reveal snapshot is interaction state, not a cache of rendered content. Browser and Next.js asset caching handle repeat downloads according to the response headers; caching rendered sections would not stop their client animations from running again.

## Review checklist

- Reload from the hero and from a light section; confirm the saved background stays visible, then the hero content returns promptly.
- On a first visit, confirm the dark stage fades into the hero background before the full hero content entrance.
- Scroll to the timeline or Works, reload, and confirm the same position returns without a flash at the top.
- Trigger Fast Refresh while below the hero and confirm the offset and revealed sections remain steady.
- Return to the top, scroll down again, and confirm the section reveals replay once for the new cycle.
- Open `#about` and `#projects` directly, then use Home navigation and browser Back/Forward.
- Check project titles on desktop and mobile; wrapping should happen between words.
- Repeat reload and anchor checks with reduced motion enabled.

## Manual verification

- Previous Chromium checks covered scroll-position restoration and reveal-cycle persistence, but did not catch the brief white frame or the delayed hero copy reported afterward.
- The bootstrap-surface and reload-timing changes in this iteration have not been rechecked in a browser yet.
- Reduced-motion and browser back/forward cases remain on the review checklist.
