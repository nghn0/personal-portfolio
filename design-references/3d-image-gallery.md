# Design Reference: 3D Image Gallery (moazamtrade)

Source: `npx shadcn@latest add "https://21st.dev/r/moazamtrade/3d-image-gallery"`
Retrieved: 2026-08-15
Original component code preserved below (verbatim, unmodified) so we can edit it in isolation.

## Dependencies used by original
- `@react-three/fiber` (Canvas, useFrame)
- `@react-three/drei` (OrbitControls, Environment, Html, Plane, Sphere)
- `three` (THREE, BufferGeometry)
- `lucide-react` (Download, Heart, X)

All of these are already present in package.json.

## Structure of the original (single file, 6 parts)
1. `CardContext` / `CardProvider` — state + hardcoded `cards` array (imageUrl, alt, title)
2. `StarfieldBackground` — plain THREE starfield (10k stars, slow rotation) as `fixed z-0` div
3. `FloatingCard` — a transparent `Plane` + `Html` (transform, distanceFactor) rendering a `40x52` card image with hover glow (cyan #31b8c6)
4. `CardModal` — fixed overlay, 3D tilt card with mousemove, image, title, Download + Heart buttons
5. `CardGalaxy` — fibonacci/golden-ratio sphere distribution of cards + 4 wireframe spheres
6. `StellarCardGallerySingle` — root: Starfield + Canvas(fov 60, camera z=15) + OrbitControls(pan/zoom/rotate, min 5 max 40) + Modal + corner HUD

## Card distribution math (fibonacci sphere)
```
y = 1 - (i / (n-1)) * 2
radiusAtY = sqrt(1 - y*y)
theta = (2*PI*i) / goldenRatio
x = cos(theta)*radiusAtY*layerRadius
z = sin(theta)*radiusAtY*layerRadius
layerRadius = 12 + (i % 3) * 4
```

## Key visual tokens of the original
- Card container: `bg-[#1F2121]`, rounded-lg, p-3, w-40 h-52
- Image: full-width h-40 object-cover rounded-md
- Accent / hover glow color: `#31b8c6` (cyan)
- Wireframe sphere colors: `#1a1a2e` (center) + `#31b8c6` at 12/16/20 radius
- Overlay modal: bg-black/80 backdrop-blur, card `bg-[#1F2121]` rounded-[16px], 3:4 image, tilt on mousemove

---

## Adaptation plan for the /projects page (this is our work-in-progress)

We will NOT modify this reference file. The edited/adapted component lives in
`src/components/ui/` and imports `Project` data from `@/data/projects` instead of
hardcoded cards. Notes while editing:

- Replace `cards: Card[]` (imageUrl/alt/title) with `Project[]` from `@/data/projects` (`allProjects`).
- Cards have no images; instead each project carries a `color` token
  (`neon-cyan` | `neon-purple` | `accent-pink`) → map to glow/border accents.
- `FloatingCard` shows project title + type on the card face.
- `CardModal` → detail view: description, features, tech chips, GitHub / Case Study / Live links.
- Header: keep the "Complete Archive" title + back link from the old /projects page.