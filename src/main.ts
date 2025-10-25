import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import './style.css';
import { generateSVGs } from './utils/svg-generator';

// Initialize Reveal.js with 16:9 optimization and auto-advance fragments
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
  autoSlide: 5000,
  autoSlideStoppable: true,
  autoSlideMethod: null,
  defaultTiming: null,
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

  // Update indicators on scroll within slides
  document.addEventListener('scroll', updateScrollIndicators, true);

  // Update on slide change
  deck.on('slidechanged', () => {
    setTimeout(updateScrollIndicators, 100);
  });

  // Update on window resize
  window.addEventListener('resize', () => {
    setTimeout(updateScrollIndicators, 100);
  });

  // Initial update
  setTimeout(updateScrollIndicators, 500);

  // Custom keyboard handling for scrolling with up/down arrows
  document.addEventListener('keydown', (event) => {
    // Only handle if not in overview mode
    if (deck.isOverview()) return;

    const activeSlide = document.querySelector('.reveal .slides section.present') as HTMLElement;
    if (!activeSlide) return;

    // Allow up/down arrows to scroll within the slide
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const hasScrollableContent = activeSlide.scrollHeight > activeSlide.clientHeight;

      if (hasScrollableContent) {
        // Prevent Reveal.js from using these keys for navigation
        event.preventDefault();
        event.stopPropagation();

        const scrollAmount = 80;
        if (event.key === 'ArrowUp') {
          activeSlide.scrollTo({
            top: activeSlide.scrollTop - scrollAmount,
            behavior: 'smooth'
          });
        } else {
          activeSlide.scrollTo({
            top: activeSlide.scrollTop + scrollAmount,
            behavior: 'smooth'
          });
        }

        // Update scroll indicators after scrolling
        setTimeout(updateScrollIndicators, 100);
      }
    }
  }, true);

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
