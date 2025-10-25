import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import './style.css';
import { generateSVGs } from './utils/svg-generator';

// Initialize Reveal.js with 16:9 optimization
const deck = new Reveal({
  hash: true,
  respondToHashChanges: true,
  width: 1920,
  height: 1080,
  margin: 0.05,
  minScale: 0.2,
  maxScale: 1.5,
  center: true,
  transition: 'slide',
  transitionSpeed: 'default',
  backgroundTransition: 'fade',
  controls: false,
  progress: true,
  keyboard: true,
  touch: true,
  loop: false,
  rtl: false,
  shuffle: false,
  fragments: true,
  fragmentInURL: true,
  embedded: false,
  help: true,
  showNotes: false,
  autoPlayMedia: null,
  preloadIframes: null,
  autoAnimate: true,
  autoAnimateMatcher: null,
  autoAnimateDuration: 0.8,
  autoAnimateUnmatched: true,
  display: 'block',
  hideInactiveCursor: true,
  hideCursorTime: 5000,
  navigationMode: 'linear',
  overview: true,
  showSlideNumber: 'all',
});

// Initialize presentation
deck.initialize().then(() => {
  console.log('Presentation initialized');

  // Generate SVG visualizations after initialization
  generateSVGs();

  // Create slide counter element with clickable navigation
  const slideCounter = document.createElement('div');
  slideCounter.className = 'slide-counter';
  slideCounter.innerHTML = `
    <button class="arrow arrow-left" aria-label="Previous slide">&lt;</button>
    <span class="current">01</span>
    <span class="separator">/</span>
    <span class="total">12</span>
    <button class="arrow arrow-right" aria-label="Next slide">&gt;</button>
  `;
  document.body.appendChild(slideCounter);

  // Add click handlers for navigation
  const leftArrow = slideCounter.querySelector('.arrow-left') as HTMLButtonElement;
  const rightArrow = slideCounter.querySelector('.arrow-right') as HTMLButtonElement;

  leftArrow.addEventListener('click', () => {
    deck.prev();
  });

  rightArrow.addEventListener('click', () => {
    deck.next();
  });

  // Function to update slide counter
  function updateSlideCounter() {
    const indices = deck.getIndices();
    const totalSlides = deck.getTotalSlides();
    const currentSlide = indices.h + 1; // +1 because indices are 0-based

    const currentSpan = slideCounter.querySelector('.current');
    const totalSpan = slideCounter.querySelector('.total');

    if (currentSpan && totalSpan) {
      currentSpan.textContent = String(currentSlide).padStart(2, '0');
      totalSpan.textContent = String(totalSlides).padStart(2, '0');
    }

    // Enable/disable navigation buttons
    if (leftArrow && rightArrow) {
      leftArrow.disabled = currentSlide === 1;
      rightArrow.disabled = currentSlide === totalSlides;
    }
  }

  // Update counter on slide change
  deck.on('slidechanged', updateSlideCounter);

  // Initial update
  updateSlideCounter();

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
