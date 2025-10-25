import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
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
  controls: false,
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

  // Create scroll indicators
  const scrollIndicatorDown = document.createElement('div');
  scrollIndicatorDown.className = 'scroll-indicator scroll-indicator-down';
  scrollIndicatorDown.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10l5 5 5-5z"/>
    </svg>
  `;
  document.body.appendChild(scrollIndicatorDown);

  const scrollIndicatorUp = document.createElement('div');
  scrollIndicatorUp.className = 'scroll-indicator scroll-indicator-up';
  scrollIndicatorUp.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 14l5-5 5 5z"/>
    </svg>
  `;
  document.body.appendChild(scrollIndicatorUp);

  // Function to update scroll indicators
  function updateScrollIndicators() {
    const activeSlide = document.querySelector('.reveal .slides section.present') as HTMLElement;
    if (!activeSlide) return;

    const scrollTop = activeSlide.scrollTop;
    const scrollHeight = activeSlide.scrollHeight;
    const clientHeight = activeSlide.clientHeight;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    // Show down arrow if there's content below (with 20px threshold)
    if (scrollBottom > 20) {
      scrollIndicatorDown.classList.add('visible');
    } else {
      scrollIndicatorDown.classList.remove('visible');
    }

    // Show up arrow if there's content above (with 20px threshold)
    if (scrollTop > 20) {
      scrollIndicatorUp.classList.add('visible');
    } else {
      scrollIndicatorUp.classList.remove('visible');
    }
  }

  // Update indicators on scroll
  document.addEventListener('scroll', updateScrollIndicators, true);

  // Update on slide change
  deck.on('slidechanged', () => {
    setTimeout(updateScrollIndicators, 100);
  });

  // Initial update
  setTimeout(updateScrollIndicators, 500);

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

  // Update scroll indicators on window resize
  window.addEventListener('resize', () => {
    setTimeout(updateScrollIndicators, 100);
  });

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

        // Update scroll indicators after scrolling
        setTimeout(updateScrollIndicators, 50);
      }
    }
  }, true);
});

// Export for debugging
(window as any).Reveal = deck;
