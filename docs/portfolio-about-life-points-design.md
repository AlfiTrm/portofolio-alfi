# Portfolio About: Life Points

**Status:** Story direction follows Alfi’s details; copy is ready for review and photo assets are placeholders
**Updated:** 2026-10-07

Related documents: [PRD](PRD.md), [SRS](SRS.md), [Design](DESIGN.md), [Brand Guidelines](BRAND_GUIDELINES.md), and [Design System](DESIGN_SYSTEM.md). The web sculpture is a separate exploration in [Spider Web Visual Research](spider-web-visual-research.md).

## Intent

Life Points should read like Alfi telling how he found frontend and what he wants to learn next. The section should feel personal without repeating the project gallery or turning each moment into a résumé card.

## Confirmed direction

- Keep About short, white, and connected to the journey below it.
- Remove eyebrow labels, numbered steps, category names, proof labels, and card backgrounds from each story point.
- Let each story sit directly on the page. Vary alignment and the image collage composition so the section does not read as a stack of identical cards.
- Add three luminance-based ASCII tiles to each chapter as temporary image placeholders. They are visual placeholders, not historical photos or claims about specific events.
- Use the approved first-person copy below. Keep the casual detail about vibe-coding; do not turn the story into technical résumé language.
- Selected Work remains the place for project names, screenshots, contribution details, and case-study evidence.
- Draw one large graphite route through the chapter stage. Keep its rounded beginning inset from the frame; extend its ending through the white section to the Works boundary so the next section masks the tube end cleanly.
- Keep the route and always-visible ring markers above the image tiles and their shadows. Story copy stays above the route and uses difference blending so it reads dark on white and light over the tube.
- Keep the Spider-Man/web reference separate. The Life Points path is one continuous line, not a web or a bundle of strands.
- Keep all story copy as semantic HTML. The route has an SVG fallback and is decorative to assistive technology.

## Story chapters

| Order | Chapter | Story copy |
| --- | --- | --- |
| 1 | When it all started. | I started Information Systems at Universitas Brawijaya in 2023 and tried a few things along the way: a data bootcamp, project management, and UI/UX. I hadn't found my place yet. |
| 2 | Semester four pulled me into frontend. | A college project got me building for the web in my fourth semester. I was vibe coding at first, then started wondering how the parts behind the UI worked. |
| 3 | At KBMDSI, I got to help with the web. | I helped with bits of the competition registration site and the organization’s site. It got me thinking about folder structure and keeping things modular, so the code stayed manageable instead of turning into spaghetti. |
| 4 | AI makes it faster. The idea still matters. | I've worked on a few competition projects since. AI makes building easier, but deciding what to build still takes the most thought. |
| 5 | Now I want to look beyond the frontend. | Frontend feels right for me. Next, I want to learn how the backend connects to it and get closer to full-stack work. |

## Visual and motion rules

- Give the route a safe inset at the top that accounts for the full tube width and rounded cap. Continue its tail past the white section edge; the Works section masks the cut so it reaches the handoff without a visible cap.
- Layer the route above the image tiles and their wall-like shadows, while keeping story copy in the foreground. Keep ring markers visible at every chapter from the start of the scroll reveal; do not add visible numbering to the copy.
- Use dark graphite with a restrained highlight. Shape and light provide depth without a glossy chrome finish.
- Reveal each chapter as it enters the viewport. Use one scroll-progress value to draw the route; normal document scrolling remains in control.
- The route follows scroll upward as well as downward. It must not snap between chapters or trap scrolling.
- For narrow screens, keep the route in a slim left rail and give the story a separate reading column. Stack the image collage after its text.
- Reduced motion, failed WebGL, and missing photos must leave the full story visible.
- Use `mix-blend-mode: difference` on story text so it changes from dark to light as the graphite route passes behind it.

## Image direction

The current tiles are abstract placeholders made from grayscale shapes. A luminance pass maps their light and dark areas to different ASCII characters; chosen personal photos use the same treatment. They show the intended square collage without pretending to depict a real memory. Keep project screenshots in Selected Work and do not assign a photo to a life event unless Alfi confirms it belongs there.

## Review criteria

1. A visitor remembers how Alfi found frontend and what he wants to explore next.
2. The text sounds like Alfi and avoids résumé phrasing, repeated eyebrow labels, and generic claims.
3. The route begins cleanly and reaches the Works boundary at desktop and mobile sizes, with no visible cut or detached end.
4. The chapter layouts and image collages vary while keeping the reading order obvious.
5. Story text remains readable where the route crosses it, without relying on WebGL.
6. Placeholder tiles are clearly abstract and do not imply unconfirmed personal history.
