import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import './style.css';
import { generateSVGs } from './utils/svg-generator';

// Initialize Reveal.js
const deck = new Reveal({
  hash: true,
  respondToHashChanges: true,
  width: 1200,
  height: 700,
  margin: 0.04,
  minScale: 0.2,
  maxScale: 2.0,
  center: true,
  transition: 'slide',
  transitionSpeed: 'default',
  backgroundTransition: 'fade',
  controls: true,
  progress: true,
  keyboard: true,
  touch: true,
  loop: false,
  rtl: false,
  shuffle: false,
  fragments: true,
  embedded: false,
  help: true,
  showNotes: false,
  autoPlayMedia: null,
  preloadIframes: null,
  autoAnimate: true,
  autoAnimateMatcher: null,
  autoAnimateDuration: 1.0,
  autoAnimateUnmatched: true,
  display: 'block',
  hideInactiveCursor: true,
  hideCursorTime: 5000,
});

// Initialize presentation
deck.initialize().then(() => {
  console.log('Presentation initialized');

  // Generate SVG visualizations after initialization
  generateSVGs();

  // Language detection and redirection
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const hasLanguagePreference = sessionStorage.getItem('languageSelected');

  if (currentPage === 'index.html' && !hasLanguagePreference) {
    const userLang = navigator.language || (navigator as any).userLanguage;
    if (userLang && userLang.toLowerCase().startsWith('de')) {
      window.location.href = 'de.html';
    }
  }

  sessionStorage.setItem('languageSelected', 'true');
});

// Export for debugging
(window as any).Reveal = deck;
