# Benutzerhandbuch - Data Paradox Präsentation

## 🌐 Live-Präsentation

**Englische Version:** https://ma3u.github.io/interfaces2data/
**Deutsche Version:** https://ma3u.github.io/interfaces2data/de.html

---

## 🎮 Navigation & Steuerung

### **Folien-Navigation**
- **← → Pfeiltasten**: Zwischen Folien navigieren
- **Klick auf < > Buttons** (rechts unten): Vorherige/Nächste Folie
- **Leertaste**: Zum nächsten Fragment oder Folie
- **Shift + Leertaste**: Zurück

### **Scrollen innerhalb von Folien**
- **↑ ↓ Pfeiltasten**: Innerhalb der aktuellen Folie hoch/runter scrollen
- **Mausrad**: Innerhalb der Folie scrollen
- **Graue hüpfende Pfeile** (⬆️ ⬇️): Zeigen mehr Inhalt oben/unten an

### **Übersichts-Modus**
- **ESC oder O Taste**: Alle 12 Folien im Raster anzeigen
- **Klick auf Folie**: Direkt zu dieser Folie springen

### **Weitere Steuerung**
- **F Taste**: Vollbildmodus
- **S Taste**: Notizen (falls verfügbar)
- **B oder . Taste**: Pause (schwarzer Bildschirm)

---

## 🎬 Präsentieren

### **Automatisches Einblenden von Inhalten**
1. Navigieren Sie manuell zu einer Folie (Pfeiltasten oder Buttons)
2. **Überschrift + erster Inhalt** erscheinen sofort
3. Alle **5 Sekunden**: Nächster Inhaltsblock blendet automatisch ein
4. Wenn alle Blöcke gezeigt: Auto-Einblenden **stoppt** (bleibt auf Folie)
5. Sie kontrollieren, wann zur nächsten Folie gewechselt wird

### **Interaktive Elemente**
- **Folie 3 - Geschäftsmodelle**: Hovern Sie über Modellnamen für Details
- **Folien 1, 2, 8, 9, 10**: Animierte SVG-Diagramme starten beim Folienwechsel
- **Folie 12**: Persönliche Empfehlungen und Praxis-Insights

### **Tipps für reibungslose Präsentation**
- Nutzen Sie **Vollbildmodus** (F Taste) für beste Darstellung
- Lassen Sie Content-Blöcke auto-einblenden während Sie sprechen
- Nutzen Sie **← →** um Folien zu kontrollieren
- Bei langem Inhalt: **↑ ↓** zum Scrollen (achten Sie auf graue Pfeile)
- **Übersichts-Modus** (ESC) eignet sich gut für Q&A-Sitzungen

---

## 🔧 Lokale Entwicklung & Tests

### **Voraussetzungen**
```bash
# Installieren Sie Node.js 20+ von https://nodejs.org/
node --version  # Sollte v20 oder höher sein
npm --version
```

### **Einrichtung**
```bash
# Repository klonen
git clone https://github.com/ma3u/interfaces2data.git
cd interfaces2data

# Abhängigkeiten installieren
npm install
```

### **Entwicklung**
```bash
# Entwicklungsserver starten
npm run dev

# Im Browser öffnen:
# http://localhost:5173/           (Englisch)
# http://localhost:5173/de.html    (Deutsch)
```

### **Lokal testen**
```bash
# Alle automatisierten Tests ausführen
npm test

# Tests mit sichtbarem Browser (headed mode)
npm run test:headed

# Interaktive Test-UI (empfohlen)
npm run test:ui

# Test-Report anzeigen
npm run test:report
```

### **Für Produktion bauen**
```bash
# Produktions-Build erstellen
npm run build

# Produktions-Build lokal testen
npm run preview
# Öffnet unter http://localhost:4173/interfaces2data/
```

---

## 🚀 Deployment

### **Automatisches Deployment**
Jeder Push zum `main` Branch löst automatisch Deployment aus:

```bash
git add .
git commit -m "Ihre Änderungen"
git push origin main
```

GitHub Actions wird:
1. Das TypeScript/Vite-Projekt bauen
2. Optimiertes Bundle in `dist/` generieren
3. Auf GitHub Pages deployen
4. In ~1-2 Minuten live sein

### **Manuelles Deployment**
Bereits automatisch - pushen Sie einfach zum `main` Branch!

### **Deployment überprüfen**
```bash
# GitHub Actions Status prüfen
gh run list --limit 5

# GitHub Pages Status prüfen
gh api repos/ma3u/interfaces2data/pages
```

---

## 📝 Inhalte bearbeiten

### **Folien bearbeiten**
1. Bearbeiten Sie `index.html` (Englisch) oder `de.html` (Deutsch)
2. Suchen Sie die Folie die Sie ändern möchten (nach Titel suchen)
3. Ändern Sie den Inhalt innerhalb von `<div class="slide-content">`
4. Erster Inhaltsblock OHNE `class="fragment"` lassen
5. `class="fragment"` zu Blöcken hinzufügen die einblenden sollen

### **Neue Folien hinzufügen**
```html
<!-- Vor dem schließenden </div> von .slides hinzufügen -->
<section>
    <div class="slide-content">
        <h2>Ihr Folien-Titel</h2>
        <div class="card">Erster Block - sofort sichtbar</div>
        <div class="card fragment">Zweiter Block - blendet ein</div>
        <div class="card fragment">Dritter Block - blendet ein</div>
    </div>
</section>
```

### **Styling-Änderungen**
- Globale Styles: `src/style.css`
- Farben: CSS-Variablen im `:root` Bereich
- Schriften: Aktuell Inter (sans) und JetBrains Mono (mono)

---

## 🎨 Design-System

### **Farbpalette**
- **Primär**: Cyan (#50d4e4)
- **Sekundär**: Orange (#e6856f)
- **Erfolg**: Grün (#4ade80)
- **Akzent**: Rot (#ff6b75)

### **Typografie-Skala**
- H1: 2.8rem
- H2: 2.0rem
- H3: 1.5rem
- Fließtext: 1.1rem
- Tabellenzellen: 1.25rem

### **Komponenten**
- `.card` - Inhaltskarte mit Rand
- `.card-primary` - Primärfarbiger Rand
- `.card-success` - Erfolgsfarbiger Rand
- `.card-warning` - Warnfarbiger Rand
- `.highlight-box` - Hervorgehobene Inhaltsbox
- `.grid-2` / `.grid-3` - Zwei/Drei-Spalten-Layouts

---

## 📊 Test-Erfolgskriterien

Die Präsentation erfüllt diese Qualitätsstandards:

✅ **Navigation**: Immer sichtbar, voll funktionsfähig
✅ **Responsive**: Funktioniert auf Mobile, Tablet und Desktop
✅ **Progressive Einblendung**: Überschrift + erster Block sichtbar, Rest blendet ein
✅ **Lesbarkeit**: Große Schriften optimiert für Präsentationen
✅ **Barrierefreiheit**: Exzellenter Kontrast (Dark Mode)

---

## 🆘 Fehlerbehebung

### **Präsentation lädt nicht?**
- Hard Refresh: Strg+F5 (Windows) oder Cmd+Shift+R (Mac)
- GitHub Pages Deployment-Status prüfen
- Verifizieren Sie dass GitHub Actions Workflow erfolgreich war

### **Inhalt blendet nicht ein?**
- Prüfen Sie dass Blöcke `class="fragment"` in HTML haben
- Verifizieren Sie dass autoSlide aktiviert ist in src/main.ts
- Drücken Sie Leertaste manuell um Fragmente vorzurücken

### **Navigation funktioniert nicht?**
- Stellen Sie sicher dass Sie die Pfeile im Slide Counter (rechts unten) klicken
- Versuchen Sie Tastatur-Navigation (← →)
- Prüfen Sie Browser-Konsole auf Fehler

### **Tooltips werden nicht angezeigt?**
- Nur auf Folie 3 (Geschäftsmodelle)
- Bewegen Sie Cursor über Geschäftsmodell-Namen
- Warten Sie 300ms für Fade-in Animation

---

## 🎯 Präsentations-Checkliste

Vor Ihrer Präsentation:

- [ ] Öffnen Sie die Live-URL
- [ ] Drücken Sie F für Vollbild
- [ ] Testen Sie Navigation (← → Pfeile)
- [ ] Überprüfen Sie dass Auto-Reveal funktioniert (warten Sie 5 Sekunden)
- [ ] Bei langem Inhalt: Testen Sie Scrolling (↑ ↓)
- [ ] Tooltips auf Folie 3 testen (Mouseover)
- [ ] Übersichts-Modus testen (ESC Taste)

Während der Präsentation:

- [ ] Lassen Sie Fragmente automatisch einblenden (5 Sek)
- [ ] Nutzen Sie → oder Leertaste für nächste Folie
- [ ] Bei Fragen: ESC für Übersicht aller Folien
- [ ] Scrollen Sie bei Bedarf mit ↑ ↓

---

## 📞 Support

**Repository**: https://github.com/ma3u/interfaces2data
**Issues**: https://github.com/ma3u/interfaces2data/issues

Für Fragen zum Inhalt (Datenprotokolle, Datenschutz), siehe die Präsentationsfolien selbst.

---

## 📜 Lizenz

ISC License - Siehe package.json für Details.
