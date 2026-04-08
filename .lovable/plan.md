

# UI/UX Aesthetic Polish for JiMAT+

## Current State
The app looks flat and washed out — the CTA button blends into the background, cards lack depth, the color palette feels muted, and the overall experience lacks the visual confidence needed for a hackathon demo. The value highlights below the fold are invisible on first load.

## Design Direction
Elevate the visual quality with better contrast, richer depth, subtle glassmorphism, stronger color usage, and more intentional spacing — while keeping the calm, supportive tone intact. No structural or logic changes.

## Changes

### 1. Color & Surface System (index.css)
- Deepen the background gradient to create more contrast between surface and cards
- Add a subtle radial gradient overlay utility for hero sections
- Introduce a glassmorphism card utility (`glass-card`) with backdrop-blur and translucent background
- Make the CTA gradient more vivid (slightly saturated teal-to-emerald)
- Add a subtle dot/grid pattern background utility for visual texture
- Improve shadow definitions for more depth (softer, larger spreads)

### 2. Landing Page (LandingPage.tsx)
- Add a large, soft radial gradient background glow behind the hero (teal/amber blend)
- Make the badge pill more prominent with a subtle backdrop-blur glass effect
- Increase heading size slightly on desktop (`sm:text-6xl`)
- Make the CTA button larger with a subtle animated gradient shimmer on hover
- Show value highlights in a horizontal 3-column card grid (not a vertical list) with glass-card styling and subtle icons
- Add a faint decorative circle/blob element in the background for visual interest
- Tighten the italic disclaimer to be less prominent

### 3. Input Flow (InputFlow.tsx)
- Add a subtle progress indicator at the top showing completion state (4 sections)
- Give the budget and days inputs a slightly larger, more prominent treatment with a soft inner glow on focus
- Make pantry chips rounder and more colorful when selected (slight color coding)
- Add a subtle card entrance stagger that feels smoother
- Make the submit button have a gentle pulse animation when the form becomes valid

### 4. Calculating Screen (CalculatingScreen.tsx)
- Make the animated circles larger and more visually rich with a gradient ring effect
- Add a subtle particle/sparkle effect or floating dots around the loader
- Show completed steps with checkmarks as they finish (not just text swap)
- Add a soft background radial glow

### 5. Results Dashboard (ResultsDashboard.tsx)
- Make the hero coverage card more visually striking — add a gradient border effect and larger number display
- Add a subtle color-coded left border accent to the Score and Confidence cards
- Make the warning card more visually distinct with a pulsing dot indicator
- Give the "Best Next Purchase" card a subtle animated border glow
- Improve the comparison table with better cell spacing and alternating row tints

### 6. Survival Plan (SurvivalPlan.tsx)
- Add a vertical timeline connector between day cards (a thin line with dots)
- Make day number badges slightly larger with a gradient ring
- Add a subtle hover lift effect on meal cards
- Improve the pantry/missing grid with better icon treatment

### 7. Shopping Summary (ShoppingSummary.tsx)
- Make the "Best Next Purchase" card feel more like a product card with a subtle gradient background
- Add a visual budget bar (progress bar showing spend vs remaining)
- Make the final message card warmer with a soft gradient background
- Add confetti-like subtle particle animation on the restart button hover

## Technical Details
- All changes are CSS/Tailwind class updates and minor Framer Motion additions
- New CSS utilities added in `index.css` and `tailwind.config.ts` for reuse
- No logic, data, or flow changes
- No new dependencies needed (framer-motion already installed)
- Existing component structure preserved — only className and animation props updated

