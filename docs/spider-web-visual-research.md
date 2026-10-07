# Spider Web Visual Research

**Status:** Art direction proposal for Alfi's review  
**Date:** 2026-10-06

Related documents: [PRD](PRD.md), [SRS](SRS.md), [design guideline](DESIGN.md), and [Life Points design](portfolio-about-life-points-design.md).

## What the references show

The image set on the [Sketchfab reference Alfi shared](https://sketchfab.com/3d-models/spider-webs-68273d91cb844db690c6f58e1a31bf37) contains several different web shapes: recognizable orb webs, stretched corner webs, folds, broken edges, and denser sheets. What makes them read as webs is their connected construction, not a large number of independent curves.

The linked style has an accessible [Clockwork Creations spider-web pack on CGTrader](https://www.cgtrader.com/3d-models/animal/insect/spider-webs-pack-8-different-spider-webs). Its product page describes multiple web variants, 16 triangles, one 4K texture set, and a $9.99 royalty-free license. **Inference:** the strand detail is carried largely by texture on simple geometry, which is efficient for still renders but may look flat when used as an interactive sculpture with changing light and viewpoint.

[TextureCan's cobweb material](https://www.texturecan.com/details/237/) is a useful look-development reference: its SBSAR lets an artist adjust damage, strand count, and deformation. TextureCan states that its materials are CC0 and can be used commercially without required attribution in its [license terms](https://www.texturecan.com/terms/). This is a texture workflow, so it can help set strand density or provide an alpha fallback; it does not create the depth and connected geometry wanted for the main scene.

[Sketchfab's license guide](https://sketchfab.com/licenses) explains that asset permissions depend on each model's license and that licensed material cannot be redistributed as a standalone asset. The shared reference is useful for art direction; its model files should not be added to the site without a confirmed download right. The [SketchUp Texture Club terms](https://www.sketchuptextureclub.com/challenge/pop.asp?n=2) allow some personal and commercial uses but restrict redistribution and packaging textures into software or templates. The catalog is aimed at architectural materials, so it is less directly useful for this web shape.

The wider reference search surfaced a second useful direction: [Tomás Saraceno's Hybrid Webs](https://studiotomassaraceno.org/hybrid-webs/) uses real webs suspended in transparent frames. The reference is useful for its spatial layering and side lighting, not its number of crossings. A research study on [in-situ 3D web construction](https://pmc.ncbi.nlm.nih.gov/articles/PMC8379916/) also distinguishes planar orb webs from more complex 3D web architecture; the latter should not be approximated by simply adding unrelated curves.

I found Sketchfab examples across a wide quality and license range: a [low-poly stylized cobweb](https://sketchfab.com/3d-models/spider-web-70a85f81f98a40ee901086b20ee53502), a [free CC BY web model](https://sketchfab.com/3d-models/spider-web-cc5d3b794341445a90bc6f6e9422792d), and other store or non-commercial models. They are useful for comparing silhouettes, but none is a ready-to-drop-in portfolio solution. The free CC BY model requires attribution; store models require checking their individual terms before use.

The SketchUp Texture Club search did not surface a spider-web asset suited to this scene. Texture libraries can help tune opacity, roughness, and surface response, but a flat material will not create spatial depth or connected thread geometry.

## Structure to retain from real orb webs

The clearest structural reference is a web with a frame, radial support threads, an off-center hub, and a connected capture spiral. A research model describes the frame as an irregular polygon, radii that connect its frame to an off-center hub, and a spiral whose radius and spacing vary. Those parts create a recognizable web while allowing asymmetry and irregular spacing. See [Prey Localization in Spider Orb Webs Using Modal Vibration Analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC9646800/).

Orb webs are not perfectly balanced targets. Research on web asymmetry connects the difference in upper and lower web areas to physical constraints during construction. See [Asymmetry in Spider Orb Webs](https://pubmed.ncbi.nlm.nih.gov/10600145/). That supports an uneven hub and unequal areas; it does not require freehand, unconnected lines.

## Visual routes considered

| Route | What reads well | Main risk | Decision |
| --- | --- | --- | --- |
| Flat orb web | Immediately recognizable: frame, hub, radii, and spiral | Can look like a regular target or dreamcatcher; limited depth | Keep as the structural base, distort its outline and spacing |
| Freeform crossing strands | Can fill a 3D volume quickly | Loses web topology and reads as random lines | Reject |
| Connected web sculpture | Keeps a recognizable web structure while folding into space | Can become dense if every strand gets equal emphasis | Recommended; control density and light hierarchy |

## Proposed web direction

Build one connected web sculpture where a recognizable orb-web scaffold bends into a shallow 3D volume. This combines the immediate silhouette of a real orb web with the spatial layering in Saraceno's installations. It is a restrained 3D form, not a pile of separate webs.

1. Begin with one asymmetrical frame, anchored at three or four points. Let the frame bow and tilt instead of drawing a perfect circle.
2. Place the hub off-center. Use eight or nine primary radii, each joining the hub to the frame or a valid support junction.
3. Add a partial capture spiral with uneven spacing. Every spiral segment must attach to a radial; leave a broad open sector so the silhouette has breathing room.
4. Bend the main web surface through depth. Pull one side forward and let the opposite side recede, so the network changes shape under perspective instead of appearing as a flat SVG.
5. Add only a few rear mooring strands between the frame and distant support points. These strands create the volume; they do not cross independently through the capture area.
6. Keep line weight hierarchical: anchors and outer frame first, radii second, spiral last. The thin spiral should be visible by highlight, not by increasing its weight to match the frame.

The intended read is a **tensioned web fragment in space**: recognizably a spider web at a glance, sculptural on closer view. Irregularity comes from the frame, uneven hub placement, broken spiral, and controlled depth fold. Every line begins or ends at a frame, hub, radial, or real junction. No strand is added as an isolated flourish.

### Light and material study

- Use a neutral graphite silk on the white Timeline/transition palette.
- Give the web one broad key light and a restrained edge light so depth appears where strands turn toward or away from camera.
- Keep a single soft contact shadow close to the form. Do not add a second displaced strand as a fake shadow.
- Avoid droplets, sparkle, glow, dust, and high-gloss plastic. Those details attract attention without clarifying the structure.
- Use a modest render scale and few tube segments; test visibility on mobile before adding texture maps.
- TextureCan may help compare strand density, but the first interactive pass should use connected geometry so material and depth stay coherent.

### Composition and motion

- Let the Timeline's final curve arrive at one outer anchor. The route can open into the web as the visitor reaches Selected Work, connecting the sections without turning Timeline itself into a web.
- Reveal the frame first, then radii, then the partial spiral. Tie the sequence to scroll position instead of looping continuously.
- Let the most recent journey point settle at the hub. A few restrained highlights can travel along structural strands toward the work area; avoid lighting every intersection at once.
- Use a near-black field with neutral silk highlights for the 3D transition, then hand off to Works. Keep the frame and strands grayscale so the existing black-and-white system carries through.

## Review questions

- Does a tensioned web fragment folded into 3D match the spider-web shape Alfi had in mind?
- Should the visible spiral keep a broad open sector, or should it be structurally complete?
- Should the first visual study use custom connected Three.js strands or a small CC0 TextureCan map as a texture reference?

These choices are deliberately open until Alfi reviews the visual direction. Do not restore the previous freeform crossing-line field.
