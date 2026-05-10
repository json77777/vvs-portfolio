# Achieving prototypestudio.fr Aesthetics for Lupin Portfolio

Fix the hydration error and bring the site's design to full parity with the reference site's premium aesthetic, adapted for Lupin as a creator, designer, and editor.

## User Review Required

> [!IMPORTANT]
> **Content Direction:** Lupin is a **creator, designer, and editor** — the copy and structure will reflect this personal portfolio angle rather than a studio/agency. The reference site's visual language will be matched but the narrative will be Lupin-focused.

> [!IMPORTANT]
> **Hero Background:** The reference site uses a full-screen video background. Since we don't have a video file, I'll use a **dark cinematic gradient background** with decorative arcs, keeping it ready for a video drop-in later. Alternatively, I can generate a hero image. Let me know your preference.

> [!WARNING]
> **Font Usage:** I will keep the existing custom fonts (DeanGothic for headlines, Silvana for elegant italic accents, Manrope for body) with correct weights. No font changes — just proper application matching the reference's typographic contrast system.

## Key Design Observations from prototypestudio.fr

| Aspect | Reference Site Pattern | Current Lupin State | Action |
|--------|----------------------|-------------------|--------|
| **Hero** | Full-screen video bg, centered headline with mixed case + italic serif accent, "Scroll" label at bottom | Light bg, left-aligned text, no dark overlay | Dark hero with centered text |
| **Nav** | Clean single-line: Logo left, `WORKS ABOUT CONTACT IG/YT` right, uppercase, underline hover | Sub-labels under links, italic accents | Simplify to single-line, uppercase only |
| **About/Statement** | Large italic serif paragraph (right-aligned), image bottom-left, very light bg with subtle arc | Big headline with line-by-line reveal | Large serif italic statement paragraph |
| **Works** | Scroll-pinned, massive counter left, stacked images center, title list right | Similar but needs refinement | Polish spacing, sizing, interactions |
| **Services** | Clean numbered sections in a row: serif italic for items, headline for titles | Parallax sliding text, gradient colors | Simplify to match reference's clean grid |
| **CTA** | Bold headline "LET'S CRAFT YOUR PROJECT TOGETHER" + small "▸ Contact us" link | Similar but with more styling | Clean up to match minimal style |
| **Footer** | Reel video left, giant nav links right, legal bottom | Similar structure | Refine proportions |

## Proposed Changes

### Fix: Hydration Error

#### [MODIFY] [Footer.tsx](file:///c:/Users/banur/OneDrive/Documents/webdev/PortFolio/lupin-portfolio/src/components/Footer.tsx)
- The `© {new Date().getFullYear()}` in the Footer creates a hydration mismatch because it can differ between server and client. Will replace with a static year or use `suppressHydrationWarning`.

---

### Component: Navigation

#### [MODIFY] [Navigation.tsx](file:///c:/Users/banur/OneDrive/Documents/webdev/PortFolio/lupin-portfolio/src/components/Navigation.tsx)
- **Simplify** to match reference: single horizontal row
- Logo "Lupin" left (DeanGothic, bold)
- Right side: `WORKS  ABOUT  CONTACT  IG/YT` — all uppercase, Manrope, small tracking, underline on hover
- Remove sub-labels ("we've done", "our story" italic text under links)
- Nav stays fixed on top, transparent initially, gains white/blur bg on scroll
- White text on dark hero, transitions to dark text as you scroll past

---

### Component: Hero Section

#### [MODIFY] [Hero.tsx](file:///c:/Users/banur/OneDrive/Documents/webdev/PortFolio/lupin-portfolio/src/components/Hero.tsx)
- Full-screen dark cinematic background (dark gradient or generated image)
- Centered headline: **"CREATIVE HOUSE"** (DeanGothic, uppercase)  
  **"*for*"** (Silvana italic, lowercase)  
  **"DARING BRANDS"** (DeanGothic, uppercase)
- White text on dark bg
- "Scroll" label bottom-center in Silvana italic
- Remove the right-aligned paragraph and CTA — move those to About section
- Adapt copy for Lupin: "DESIGNED *for* CREATIVE MINDS" or similar personal statement

---

### Component: About/Statement Section  

#### [MODIFY] [About.tsx](file:///c:/Users/banur/OneDrive/Documents/webdev/PortFolio/lupin-portfolio/src/components/About.tsx)
- Light warm background (#F7F7F5)
- Subtle decorative SVG arc in background
- Right-aligned large italic serif text (Silvana) — the statement paragraph
- Bottom-left: placeholder image or generated image
- Small "▸ About me" link below the text
- Copy adapted: *"Lupin is a multidisciplinary creator — a designer, editor, and visual storyteller. From concept to final frame, every project is crafted with authenticity, boldness, and meticulous attention to detail."*

---

### Component: Works Section  

#### [MODIFY] [Works.tsx](file:///c:/Users/banur/OneDrive/Documents/webdev/PortFolio/lupin-portfolio/src/components/Works.tsx)
- Keep scroll-pinned stacking mechanism (already good)
- Refine counter: larger size, tighter tracking
- Refine right-side title list: simple vertical list, active = black, inactive = light gray
- Polish transitions and timing
- Light background

---

### Component: Services Section

#### [MODIFY] [Services.tsx](file:///c:/Users/banur/OneDrive/Documents/webdev/PortFolio/lupin-portfolio/src/components/Services.tsx)
- Remove the large parallax sliding text headers
- Clean horizontal grid: 4 columns, each with
  - Number in italic serif (Silvana)
  - Title in DeanGothic headline
  - Items list in Silvana italic (matching reference where service sub-items are in italic serif)
- Adapt service categories for a creator:
  1. **Design** — Brand Identity, Visual Systems, Art Direction, Typography
  2. **Creative** — Concept Development, Mood Boards, Creative Direction, Styling
  3. **Production** — Photography, Videography, Content Creation, Live Action
  4. **Post-production** — Editing, Color Grading, Motion Graphics, Visual Effects

---

### Component: CTA Section

#### [MODIFY] [CTA.tsx](file:///c:/Users/banur/OneDrive/Documents/webdev/PortFolio/lupin-portfolio/src/components/CTA.tsx)
- Bold headline: "LET'S CRAFT YOUR PROJECT TOGETHER" — left-aligned, DeanGothic
- Small "▸ Contact us" link with underline (matching reference exactly)
- Remove the circle icon button

---

### Component: Footer

#### [MODIFY] [Footer.tsx](file:///c:/Users/banur/OneDrive/Documents/webdev/PortFolio/lupin-portfolio/src/components/Footer.tsx)
- Left: Reel video placeholder with "Reel" label and play button
- Right: Giant nav links (WORKS, ABOUT, CONTACT) — DeanGothic, massive size
- Bottom: legal links + copyright

---

### Styling

#### [MODIFY] [globals.css](file:///c:/Users/banur/OneDrive/Documents/webdev/PortFolio/lupin-portfolio/src/app/globals.css)
- Remove gradient accent colors (primary red, secondary orange, tertiary blue)
- Simpler monochrome palette: `#0D0D0D` ink, `#F7F7F5` background, `#FFFFFF` white
- Muted grays for inactive text: `#999`, `#CCC`
- Service items in Silvana italic for that editorial feel
- Ensure `::selection` stays red for a touch of brand color

---

### Data

#### [MODIFY] [projects.ts](file:///c:/Users/banur/OneDrive/Documents/webdev/PortFolio/lupin-portfolio/src/data/projects.ts)
- Update services data for creator-focused categories
- Keep projects as-is (placeholder)

---

### Metadata

#### [MODIFY] [layout.tsx](file:///c:/Users/banur/OneDrive/Documents/webdev/PortFolio/lupin-portfolio/src/app/layout.tsx)
- Update metadata for Lupin as a creator/designer/editor

## Open Questions

> [!IMPORTANT]
> 1. **Hero Background:** Should I generate a dark cinematic hero image, or keep it as a pure dark gradient ready for you to drop in your own video/image later?
> 2. **About Section Image:** Should I generate a placeholder creative/design workspace image, or leave a clean placeholder?

## Verification Plan

### Automated Tests
- Run `npm run build` to verify no build errors
- Check browser for hydration errors (should be gone)

### Browser Tests
- Open `http://localhost:3000` and visually verify each section
- Compare against reference screenshots
- Test scroll interactions in Works section
- Test nav color transition between dark hero and light sections
