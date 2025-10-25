import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
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
  center: false,
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
  navigationMode: 'linear',
});

// Initialize presentation
deck.initialize().then(() => {
  console.log('Presentation initialized');

  // Generate SVG visualizations after initialization
  generateSVGs();

  // Create slide counter element
  const slideCounter = document.createElement('div');
  slideCounter.className = 'slide-counter';
  slideCounter.innerHTML = `
    <span class="arrow">&lt;</span>
    <span class="current">01</span>
    <span class="separator">/</span>
    <span class="total">06</span>
    <span class="arrow">&gt;</span>
  `;
  document.body.appendChild(slideCounter);

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

  // Add scroll indicators for overflowing content
  function checkOverflow() {
    const sections = document.querySelectorAll('.reveal .slides section');
    sections.forEach((section) => {
      const element = section as HTMLElement;
      if (element.scrollHeight > element.clientHeight) {
        element.classList.add('has-overflow');
      } else {
        element.classList.remove('has-overflow');
      }
    });
  }

  // Check overflow on slide change and resize
  deck.on('slidechanged', checkOverflow);
  window.addEventListener('resize', checkOverflow);

  // Initial check
  setTimeout(checkOverflow, 500);

  // Custom keyboard handling for scrolling
  document.addEventListener('keydown', (event) => {
    const activeSlide = document.querySelector('.reveal .slides section.present') as HTMLElement;
    if (!activeSlide) return;

    // Allow up/down arrows to scroll within the slide
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (activeSlide.scrollHeight > activeSlide.clientHeight) {
        // Content is scrollable, let the default behavior work
        event.stopPropagation();

        if (event.key === 'ArrowUp') {
          activeSlide.scrollTop -= 50;
        } else {
          activeSlide.scrollTop += 50;
        }
      }
    }
  }, true);
});

// Export for debugging
(window as any).Reveal = deck;
