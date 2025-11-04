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
  autoSlideMethod: () => {
    // Custom method: only advance fragments, never slides
    const fragments = deck.availableFragments();
    if (fragments && fragments.next) {
      deck.nextFragment();
    }
    // Do nothing if no more fragments (prevents slide advancement)
  },
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

  // CRITICAL: Force scrolling on all sections after Reveal.js initialization
  const forceScrolling = () => {
    const sections = document.querySelectorAll('.reveal .slides section');
    sections.forEach(section => {
      const el = section as HTMLElement;
      el.style.overflowY = 'auto';
      el.style.overflowX = 'hidden';
      el.style.height = '100%';
      el.style.maxHeight = '100%';
    });
  };

  forceScrolling();

  // Re-apply after any Reveal.js updates
  deck.on('slidechanged', forceScrolling);
  deck.on('resize', forceScrolling);

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

  // Auto-advance fragments only, not slides
  deck.on('slidechanged', () => {
    const currentSlide = document.querySelector('.reveal .slides section.present');
    if (!currentSlide) return;

    const fragments = currentSlide.querySelectorAll('.fragment');
    const visibleFragments = currentSlide.querySelectorAll('.fragment.visible');

    if (fragments.length > 0 && visibleFragments.length < fragments.length) {
      // Has fragments to show - enable auto-slide for fragments
      deck.configure({ autoSlide: 5000 });
    } else {
      // No more fragments - disable auto-slide (don't advance to next slide)
      deck.configure({ autoSlide: 0 });
    }
  });

  // After showing a fragment, check if there are more
  deck.on('fragmentshown', () => {
    const currentSlide = document.querySelector('.reveal .slides section.present');
    if (!currentSlide) return;

    const fragments = currentSlide.querySelectorAll('.fragment');
    const visibleFragments = currentSlide.querySelectorAll('.fragment.visible');

    if (visibleFragments.length >= fragments.length) {
      // All fragments shown - disable auto-slide
      deck.configure({ autoSlide: 0 });
    }
  });

  // When manually navigating back through fragments, re-enable auto-slide if needed
  deck.on('fragmenthidden', () => {
    const currentSlide = document.querySelector('.reveal .slides section.present');
    if (!currentSlide) return;

    const fragments = currentSlide.querySelectorAll('.fragment');
    const visibleFragments = currentSlide.querySelectorAll('.fragment.visible');

    if (visibleFragments.length < fragments.length) {
      // Still fragments to show
      deck.configure({ autoSlide: 5000 });
    }
  });

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

  // CRITICAL: Override Reveal.js keyboard handling for up/down scrolling ONLY
  // Left/Right arrows and Space/Enter are allowed for navigation
  document.addEventListener('keydown', (event) => {
    // Only handle if not in overview mode
    if (deck.isOverview()) return;

    const activeSlide = document.querySelector('.reveal .slides section.present') as HTMLElement;
    if (!activeSlide) return;

    // Check if slide has scrollable content
    const hasScrollableContent = activeSlide.scrollHeight > activeSlide.clientHeight;

    // Handle up/down arrows for scrolling ONLY if there's scrollable content
    if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && hasScrollableContent) {
      // Prevent Reveal.js from handling these keys
      event.preventDefault();
      event.stopImmediatePropagation();

      const scrollAmount = 100;
      if (event.key === 'ArrowUp') {
        activeSlide.scrollTop -= scrollAmount;
      } else {
        activeSlide.scrollTop += scrollAmount;
      }

      // Update scroll indicators after scrolling
      setTimeout(updateScrollIndicators, 50);

      return false;
    }
    // ArrowLeft, ArrowRight, Space, Enter are NOT intercepted - Reveal.js handles them
  }, { capture: true, passive: false });

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
