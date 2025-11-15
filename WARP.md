# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Interfaces2Data** is a bilingual (English/German) interactive presentation about data protocols, IP protection, and privacy compliance. Built with TypeScript, Vite, and Reveal.js, automatically deployed to GitHub Pages.

- **Live English:** https://ma3u.github.io/interfaces2data/
- **Live German:** https://ma3u.github.io/interfaces2data/de.html

## Development Commands

```bash
# Development server at http://localhost:5173
npm run dev

# Production build (compiles TypeScript then builds with Vite → dist/)
npm run build

# Preview production build locally
npm run preview

# Testing
npm test                 # Run all Playwright tests
npm run test:ui          # Interactive test UI
npm run test:headed      # Run tests with visible browser
npm run test:report      # View HTML test report
```

## Architecture

### Tech Stack
- **Reveal.js 5.2**: Presentation framework (16:9 aspect ratio: 1920x1080)
- **TypeScript 5.9**: Strict mode enabled
- **Vite 7.1**: Multi-page build (English + German)
- **Playwright**: Cross-browser testing (Chromium, Firefox, WebKit, mobile)

### Core File Structure

```
index.html              # English presentation (12 slides)
de.html                 # German presentation (12 slides, identical structure)
src/
  main.ts               # Reveal.js initialization, auto-advance logic, scrolling
  style.css             # Dark mode theme, responsive design, custom components
  utils/
    svg-generator.ts    # Dynamic SVG diagrams for slides 1, 2, 8, 9, 10
vite.config.ts          # Multi-page build config
.github/workflows/
  deploy.yml            # Auto-deploy to GitHub Pages on push to main
```

### Presentation Content

**12-Slide Structure:**
1. Data Paradox introduction
2. Three Protocols (APIs, DataSpace, MCP)
3. Business Models & Protocol Fit
4. IP Protection Mechanisms
5. Personal Data Protection (GDPR)
6. Weather API Example
7. Core Tension (Monetization vs Protection)
8. DataSpace Protocol Details
9. MCP Details
10. Integration Strategy (Layered Architecture)
11. Future Trends (Verifiable Credentials)
12. Personal Recommendations

### Key Architectural Patterns

**Bilingual Implementation:**
- Two separate HTML files with identical structure but translated content
- Language detection in `main.ts` redirects German browsers to `de.html`
- Language switcher button in top-right corner
- Vite multi-page build configuration handles both entries

**Reveal.js Custom Configuration:**
- **Size:** 1920x1080 (16:9 optimized)
- **Fragments:** `fragments: true, fragmentInURL: true` - enables progressive reveal
- **Auto-Advance:** Fragments advance every 5 seconds, but slides require manual navigation
- **Custom `autoSlideMethod`:** Only advances fragments, never slides automatically
- **Keyboard Navigation:** Left/Right for slides, Up/Down for vertical scrolling within slides
- **Overview Mode:** Press ESC or O to see all slides in grid

**Fragment System (Progressive Reveal):**
- First content block on each slide: NO `fragment` class (visible immediately)
- Subsequent blocks: `class="fragment"` for progressive reveal
- Auto-advance stops when all fragments on slide are visible
- Total of 35 fragments across 12 slides

**Scrolling Mechanism:**
- All sections forced to `overflow-y: auto` after Reveal.js initialization
- Custom keyboard handler intercepts Up/Down arrows when content overflows (80px increments)
- Scroll indicators (bouncing grey arrows) appear at top/bottom when needed
- Uses `preventDefault()` and `stopImmediatePropagation()` to override Reveal.js defaults
- Only activates when `scrollHeight > clientHeight`

**SVG Generation:**
- `generateSVGs()` called after Reveal.js initialization
- Creates 6 dynamic diagrams:
  1. Paradox visualization (slide 1)
  2. Protocol comparison (slide 2)
  3. Layered architecture (slide 10)
  4. Integration flow (slide 10)
  5. MCP architecture (slide 9)
  6. DataSpace architecture (slide 8)
- Uses inline SVG with CSS animations (fadeIn, drawLine)
- Color-coded with theme colors (cyan #50d4e4, orange #e6856f, green #4ade80)

**Theme & Design:**
- **Dark Mode Default:** Black background (#1a1a1a), light text (#f5f5f5)
- **Color Palette:** Primary cyan (#50d4e4), secondary orange (#e6856f), success green (#4ade80)
- **Typography:** Inter font (headings), JetBrains Mono (code/counters)
- **Responsive:** 16:9 optimized, mobile-friendly fallbacks

### GitHub Pages Deployment

**Automatic:** Every push to `main` triggers GitHub Actions workflow
- Builds with `npm ci && npm run build`
- Deploys `dist/` folder to `gh-pages` environment
- Base path `/interfaces2data/` configured in `vite.config.ts`

**Build Output:** `dist/` directory contains:
- `index.html` → English version
- `de.html` → German version
- `assets/` → Bundled JS/CSS and fonts

**GitHub Settings Required:**
- Pages source: GitHub Actions (not branch deployment)
- Permissions: `pages: write`, `id-token: write`
- Custom domain: None (uses github.io subdomain)

## Development Guidelines

### Modifying Slides

1. Edit both `index.html` (English) and `de.html` (German) in parallel
2. Keep structure identical between languages
3. Wrap each slide in `<section>` tag
4. First content block: no `fragment` class
5. Subsequent blocks: add `class="fragment"` for progressive reveal
6. Use existing card/grid classes for consistency
7. Typically 2-4 fragments per slide for optimal storytelling
8. Cards, grids, and highlight boxes are common fragment targets

### Adding SVG Visualizations

1. Add function to `src/utils/svg-generator.ts`
2. Call function in `generateSVGs()`
3. Add `<div id="your-svg-id" class="svg-container"></div>` to HTML
4. Container ID must match in generator function

### Styling Changes

- Global styles in `src/style.css`
- Color variables in `:root` (lines 5-17)
- Dark mode is default (light mode in media query for prefers-color-scheme)
- All measurements use rem for scalability

### Testing Strategy

Playwright tests verify:
- Page load for both languages
- Slide counter functionality and navigation
- Language switcher
- Fragment animations
- Dark mode rendering
- Text readability and contrast
- Overview mode (ESC or O key)
- Scrolling functionality and indicators

**Run tests before major releases** to ensure both language versions work correctly.

### TypeScript Configuration

- Strict mode enabled
- `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` enforced
- Bundler module resolution
- No emit (Vite handles bundling)

## Common Patterns

### Tooltips (Slide 3 Business Models)
```html
<strong class="business-model-tooltip">
  Model Name
  <span class="tooltip-content">Explanation text</span>
</strong>
```
- Business model names wrapped in `<strong class="business-model-tooltip">`
- Tooltip content in `<span class="tooltip-content">` inside the strong tag
- Centered modal-style (position: fixed, centered with transform)
- 600px width, 1.3rem font, appears on hover

### Custom Slide Counter
- Bottom-right corner: `< 01 / 12 >`
- Created dynamically in `main.ts`
- Clickable arrows for navigation
- Updates on `slidechanged` event

### Scroll Indicators
- Dynamically created SVG arrows (up/down)
- Appear when `scrollHeight > clientHeight + 20px`
- Updated on scroll, slide change, and resize events

## Important Implementation Notes

### Auto-Advance Logic (src/main.ts:132-174)
- On slide change: Checks if slide has fragments, enables autoSlide: 5000 if yes
- On fragment shown: Checks if all fragments visible, disables autoSlide if complete
- Result: Fragments auto-advance, but presenter manually controls slide transitions

### Scroll Handling (src/main.ts:238-267)
- Custom keyboard event handler for Up/Down arrows
- Only activates when `scrollHeight > clientHeight`
- Uses `preventDefault()` to override Reveal.js default behavior
- Smooth scrolling with 80px increments
- Updates scroll indicators in real-time
- **Scrolling forced on all sections** via `forceScrolling()` function after Reveal.js init

### Bilingual Support (src/main.ts:269-280)
- Two separate HTML files: `index.html` (EN) and `de.html` (DE)
- Language detection uses `navigator.language` and session storage to prevent redirect loops
- Identical structure, translated content
- Language switcher in top-right corner

### Deployment
- **Base path** `/interfaces2data/` is critical for GitHub Pages - all asset references are relative
- Manual deployment: `git push origin main` → GitHub Actions builds → deploys to `gh-pages` environment
