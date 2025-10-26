# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Interfaces2Data** is a bilingual (English/German) interactive presentation about data protocols, IP protection, and privacy compliance. Built with TypeScript, Vite, and Reveal.js, deployed to GitHub Pages.

**Live URLs:**
- English: https://ma3u.github.io/interfaces2data/
- German: https://ma3u.github.io/interfaces2data/de.html

## Architecture

### Tech Stack
- **Reveal.js 5.2**: Presentation framework (configured for 16:9 aspect ratio: 1920x1080)
- **TypeScript 5.9**: Type-safe development
- **Vite 7.1**: Build tool and dev server
- **Playwright**: Automated testing
- **GitHub Actions**: Automatic deployment via `.github/workflows/deploy.yml`

### Key Files Structure
```
index.html              # English presentation (12 slides)
de.html                 # German presentation (12 slides)
src/
  main.ts              # Reveal.js initialization, auto-advance logic, scroll handling
  style.css            # Dark mode theme, responsive design, custom components
  utils/
    svg-generator.ts   # Dynamic SVG diagrams for slides 1, 2, 8, 9, 10
vite.config.ts         # Multi-page build config (both languages)
.github/workflows/
  deploy.yml           # Auto-deploy to GitHub Pages on push to main
```

### Presentation Features

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

**Interactive Elements:**
- **Progressive Reveal**: 35 fragments across slides with `class="fragment"`
- **Auto-Advance Fragments**: Enabled (5 seconds per fragment), stops when all fragments shown, does NOT auto-advance slides
- **Custom Slide Counter**: Bottom-right `< 01 / 12 >` with clickable navigation
- **Vertical Scrolling**: Up/Down arrow keys scroll within slides (80px increments)
- **Scroll Indicators**: Bouncing grey arrows (⬆️ ⬇️) when content overflows
- **Tooltips**: Slide 3 business models have centered modal tooltips on hover
- **SVG Animations**: Auto-animated diagrams on slides 1, 2, 8, 9, 10

**Theme & Design:**
- **Dark Mode Default**: Black background (#1a1a1a), light text (#f5f5f5)
- **Color Palette**: Primary cyan (#50d4e4), secondary orange (#e6856f), success green (#4ade80)
- **Typography**: Inter font (headings), JetBrains Mono (code/counters)
- **Responsive**: 16:9 optimized, mobile-friendly fallbacks

## Development Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:5173

# Building
npm run build            # TypeScript compile + Vite build → dist/

# Preview
npm run preview          # Preview production build locally

# Testing
npm test                 # Run Playwright tests
npm run test:ui          # Interactive test UI
npm run test:headed      # Run tests with visible browser
npm run test:report      # View test results HTML report
```

## Deployment

**Automatic**: Every push to `main` branch triggers GitHub Actions workflow that builds and deploys to GitHub Pages.

**Manual**: `git push origin main` → GitHub Actions builds → deploys to `gh-pages` environment

**Configuration**: GitHub Pages must be set to use GitHub Actions as build source (not branch deployment).

## Important Implementation Details

### Reveal.js Configuration (src/main.ts)
- **Size**: 1920x1080 (16:9) for optimal display
- **Fragments**: `fragments: true, fragmentInURL: true` - enables progressive reveal
- **Auto-Advance**: Configured to advance fragments only, not slides
- **Keyboard**: Left/Right for slides, Up/Down for scrolling (custom handler)
- **Overview**: Press ESC or O to see all slides in grid

### Auto-Advance Logic (src/main.ts:107-138)
- On slide change: Checks if slide has fragments, enables autoSlide: 5000 if yes
- On fragment shown: Checks if all fragments visible, disables autoSlide if complete
- Result: Fragments auto-advance, but presenter manually controls slide transitions

### Scroll Handling (src/main.ts:167-201)
- Custom keyboard event handler for Up/Down arrows
- Only activates when `scrollHeight > clientHeight`
- Uses `preventDefault()` to override Reveal.js default behavior
- Smooth scrolling with 80px increments
- Updates scroll indicators in real-time

### SVG Generation (src/utils/svg-generator.ts)
- `generateSVGs()` called after Reveal.js initialization
- Creates 6 SVG diagrams dynamically:
  1. Paradox visualization (slide 1)
  2. Protocol comparison (slide 2)
  3. Layered architecture (slide 10)
  4. Integration flow (slide 10)
  5. MCP architecture (slide 9)
  6. DataSpace architecture (slide 8)
- Uses inline SVG with animations (fadeIn, drawLine)
- Color-coded with theme colors

### Bilingual Support
- Two separate HTML files: `index.html` (EN) and `de.html` (DE)
- Language detection in src/main.ts:203-215 (redirects German browsers)
- Identical structure, translated content
- Language switcher in top-right corner

### Fragment Best Practices
- First content block on each slide: NO `fragment` class (visible immediately)
- Subsequent blocks: `class="fragment"` for progressive reveal
- Typically 2-4 fragments per slide for optimal storytelling
- Cards, grids, and highlight boxes are common fragment targets

### Tooltips (Slide 3 only)
- Business model names wrapped in `<strong class="business-model-tooltip">`
- Tooltip content in `<span class="tooltip-content">` inside the strong tag
- Centered modal-style (position: fixed, centered with transform)
- 600px width, 1.3rem font, appears on hover

## Modifying Content

### Adding/Editing Slides
1. Edit `index.html` (English) and `de.html` (German)
2. Wrap slide in `<section>` tag
3. First content block: no `fragment` class
4. Subsequent blocks: add `class="fragment"`
5. Use existing card/grid classes for consistency

### Adding SVG Visualizations
1. Add function to `src/utils/svg-generator.ts`
2. Call function in `generateSVGs()`
3. Add `<div id="your-svg-id" class="svg-container"></div>` to HTML
4. Ensure container ID matches in generator function

### Styling Changes
- Global styles: `src/style.css`
- Color variables defined in `:root` (lines 5-17)
- Dark mode is default (light mode in media query for prefers-color-scheme)
- All measurements use rem for scalability

## GitHub Pages Deployment

**Base Path**: `/interfaces2data/` (configured in vite.config.ts)

**Build Output**: `dist/` directory contains:
- `index.html` → English version
- `de.html` → German version
- `assets/` → Bundled JS/CSS and fonts

**Required GitHub Settings:**
- Pages source: GitHub Actions (NOT branch deployment)
- Custom domain: None (uses github.io subdomain)

## Testing

Playwright tests in `tests/` directory verify:
- Page load for both languages
- Slide counter functionality
- Language switcher
- Fragment animations
- Dark mode
- Text readability
- Overview mode
- Scrolling functionality

Run tests before major releases to ensure both language versions work correctly.
