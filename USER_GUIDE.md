# User Guide - Data Paradox Presentation

## 🌐 Live Presentation

**English Version:** https://ma3u.github.io/interfaces2data/
**German Version (Deutsch):** https://ma3u.github.io/interfaces2data/de.html

---

## 🎮 Navigation & Controls

### **Slide Navigation**
- **← → Arrow Keys**: Navigate between slides
- **Click < > Buttons** (bottom-right): Previous/Next slide
- **Space**: Advance to next fragment or slide
- **Shift + Space**: Go back

### **Scrolling Within Slides**
- **↑ ↓ Arrow Keys**: Scroll up/down within the current slide
- **Mouse Wheel**: Scroll within slide
- **Grey Bouncing Arrows** (⬆️ ⬇️): Indicate more content above/below

### **Overview Mode**
- **ESC or O Key**: View all 12 slides in grid layout
- **Click any slide**: Jump directly to that slide

### **Other Controls**
- **F Key**: Fullscreen mode
- **S Key**: Speaker notes (if available)
- **B or . Key**: Pause (black screen)

---

## 🎬 Presenting

### **Automatic Content Reveal**
1. Navigate to a slide manually (arrows or buttons)
2. **Headline + first content block** appear immediately
3. Every **5 seconds**: Next content block fades in automatically
4. When all blocks shown: Auto-advance **stops** (stays on slide)
5. You control when to advance to next slide

### **Interactive Elements**
- **Slide 3 - Business Models**: Hover over model names to see detailed explanations
- **Slides 1, 2, 8, 9, 10**: Animated SVG diagrams auto-play when slide loads
- **Slide 12**: Personal recommendations and real-world insights

### **Tips for Smooth Presentation**
- Use **fullscreen mode** (F key) for best experience
- Let content blocks auto-reveal while you speak
- Use **← →** to control slide progression
- If you need to scroll, use **↑ ↓** arrows (watch for grey indicators)
- **Overview mode** (ESC) is great for Q&A sessions

---

## 🔧 Local Development & Testing

### **Prerequisites**
```bash
# Install Node.js 20+ from https://nodejs.org/
node --version  # Should be v20 or higher
npm --version
```

### **Setup**
```bash
# Clone repository
git clone https://github.com/ma3u/interfaces2data.git
cd interfaces2data

# Install dependencies
npm install
```

### **Development**
```bash
# Start development server
npm run dev

# Open in browser:
# http://localhost:5173/           (English)
# http://localhost:5173/de.html    (German)
```

### **Testing Locally**
```bash
# Run all automated tests
npm test

# Run tests with visible browser (headed mode)
npm run test:headed

# Interactive test UI (recommended)
npm run test:ui

# View test report
npm run test:report
```

### **Build for Production**
```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
# Opens at http://localhost:4173/interfaces2data/
```

---

## 🚀 Deployment

### **Automatic Deployment**
Every push to `main` branch automatically triggers deployment:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

GitHub Actions will:
1. Build the TypeScript/Vite project
2. Generate optimized bundle in `dist/`
3. Deploy to GitHub Pages
4. Live in ~1-2 minutes

### **Manual Deployment**
Already automatic - just push to `main` branch!

### **Verify Deployment**
```bash
# Check GitHub Actions status
gh run list --limit 5

# Check GitHub Pages status
gh api repos/ma3u/interfaces2data/pages
```

---

## 📝 Modifying Content

### **Editing Slides**
1. Edit `index.html` (English) or `de.html` (German)
2. Find the slide you want to modify (search for slide title)
3. Modify content within `<div class="slide-content">`
4. Keep first content block WITHOUT `class="fragment"`
5. Add `class="fragment"` to blocks that should fade in

### **Adding New Slides**
```html
<!-- Add before closing </div> of .slides -->
<section>
    <div class="slide-content">
        <h2>Your Slide Title</h2>
        <div class="card">First block - visible immediately</div>
        <div class="card fragment">Second block - fades in</div>
        <div class="card fragment">Third block - fades in</div>
    </div>
</section>
```

### **Styling Changes**
- Global styles: `src/style.css`
- Colors: CSS variables in `:root` section
- Fonts: Currently using Inter (sans) and JetBrains Mono (mono)

---

## 🎨 Design System

### **Color Palette**
- **Primary**: Cyan (#50d4e4)
- **Secondary**: Orange (#e6856f)
- **Success**: Green (#4ade80)
- **Accent**: Red (#ff6b75)

### **Typography Scale**
- H1: 2.8rem
- H2: 2.0rem
- H3: 1.5rem
- Body: 1.1rem
- Table cells: 1.25rem

### **Components**
- `.card` - Content card with border
- `.card-primary` - Primary colored border
- `.card-success` - Success colored border
- `.card-warning` - Warning colored border
- `.highlight-box` - Emphasized content box
- `.grid-2` / `.grid-3` - Two/three column layouts

---

## 📊 Test Success Criteria

The presentation meets these quality standards:

✅ **Navigation**: Always visible, fully functional
✅ **Responsive**: Works on mobile, tablet, and desktop
✅ **Progressive Reveal**: Headline + first block visible, rest fades in
✅ **Readability**: Large fonts optimized for presentations
✅ **Accessibility**: Excellent contrast (dark mode)

---

## 🆘 Troubleshooting

### **Presentation not loading?**
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Check GitHub Pages deployment status
- Verify GitHub Actions workflow succeeded

### **Content not auto-revealing?**
- Check that blocks have `class="fragment"` in HTML
- Verify autoSlide is enabled in src/main.ts
- Press Space manually to advance fragments

### **Navigation not working?**
- Ensure you're clicking the arrows in the slide counter (bottom-right)
- Try keyboard navigation (← →)
- Check browser console for errors

### **Tooltips not showing?**
- Only on Slide 3 (business models)
- Hover cursor over business model names
- Wait 300ms for fade-in animation

---

## 📞 Support

**Repository**: https://github.com/ma3u/interfaces2data
**Issues**: https://github.com/ma3u/interfaces2data/issues

For questions about the content (data protocols, privacy), refer to the presentation slides themselves.
