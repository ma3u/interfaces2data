/**
 * Comprehensive Playwright Tests for Interface2Data Presentation
 * Tests both German (de.html) and English (index.html) versions
 */

import { test, expect } from '@playwright/test';

const GERMAN_URL = 'https://ma3u.github.io/interfaces2data/de.html';
const ENGLISH_URL = 'https://ma3u.github.io/interfaces2data/';

/**
 * Test suite factory for language-specific tests
 */
function createTestSuite(language, url) {
  test.describe(`${language} Version Tests`, () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
    });

    test('1. Page Load & Initial State', async ({ page }) => {
      // Page loads successfully - check for actual title
      const title = await page.title();
      expect(title).toBeTruthy();
      console.log(`${language}: Page title is "${title}"`);

      // Slide counter shows "< 01 / 12 >"
      const slideCounter = page.locator('.slide-counter');
      await expect(slideCounter).toBeVisible();
      await expect(slideCounter).toContainText('01');
      await expect(slideCounter).toContainText('12');

      // Language switcher is visible
      const langSwitcher = page.locator('.language-switcher');
      await expect(langSwitcher).toBeVisible();

      // First slide title is visible
      const firstSlide = page.locator('.reveal .slides section').first();
      await expect(firstSlide).toBeVisible();

      // Take screenshot of initial state
      await page.screenshot({
        path: `tests/screenshots/${language}-initial-state.png`,
        fullPage: true
      });
    });

    test('2. Navigation - Button Clicks', async ({ page }) => {
      // Get initial slide number
      const slideCounter = page.locator('.slide-counter .current');
      await expect(slideCounter).toHaveText('01');

      // Click ">" button to advance to slide 2
      const nextButton = page.locator('.slide-counter .arrow-right');
      await nextButton.click();
      await page.waitForTimeout(500); // Wait for transition

      // Verify slide counter updates to 02
      await expect(slideCounter).toHaveText('02');

      // Click "<" button to go back to slide 1
      const prevButton = page.locator('.slide-counter .arrow-left');
      await prevButton.click();
      await page.waitForTimeout(500);

      // Verify we're back to slide 01
      await expect(slideCounter).toHaveText('01');

      // Take screenshot
      await page.screenshot({
        path: `tests/screenshots/${language}-navigation-buttons.png`
      });
    });

    test('3. Navigation - Keyboard', async ({ page }) => {
      const slideCounter = page.locator('.slide-counter .current');

      // Press arrow right to advance
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);
      await expect(slideCounter).toHaveText('02');

      // Press arrow left to go back
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(500);
      await expect(slideCounter).toHaveText('01');

      // Test Space key for fragments
      await page.keyboard.press('Space');
      await page.waitForTimeout(300);

      // Take screenshot
      await page.screenshot({
        path: `tests/screenshots/${language}-keyboard-navigation.png`
      });
    });

    test('4. Fragment Animations', async ({ page }) => {
      // Get all fragments on first slide
      const fragments = page.locator('.reveal .slides section.present .fragment');
      const fragmentCount = await fragments.count();

      console.log(`${language}: Found ${fragmentCount} fragments on first slide`);

      if (fragmentCount > 0) {
        // Initially, fragments should have 'fragment' class but not 'visible'
        const firstFragment = fragments.first();
        await expect(firstFragment).toHaveClass(/fragment/);

        // Press Space to reveal first fragment
        await page.keyboard.press('Space');
        await page.waitForTimeout(300);

        // First fragment should now be visible
        await expect(firstFragment).toHaveClass(/visible/);

        // Take screenshot after fragment reveal
        await page.screenshot({
          path: `tests/screenshots/${language}-fragment-revealed.png`
        });
      }
    });

    test('5. Scrolling on Content-Heavy Slides', async ({ page }) => {
      // Navigate to slide 4 or 5 (likely to have more content)
      for (let i = 0; i < 4; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }

      // Check if current slide has scrollable content
      const currentSlide = page.locator('.reveal .slides section.present');
      const slideBox = await currentSlide.boundingBox();

      // Try scrolling within the slide
      if (slideBox) {
        await page.mouse.move(slideBox.x + slideBox.width / 2, slideBox.y + slideBox.height / 2);
        await page.mouse.wheel(0, 100);
        await page.waitForTimeout(300);
      }

      // Take screenshot
      await page.screenshot({
        path: `tests/screenshots/${language}-scrolling-test.png`,
        fullPage: true
      });
    });

    test('6. Language Switching', async ({ page }) => {
      const langSwitcher = page.locator('.language-switcher a');

      // Get the href to verify it points to the other language
      const href = await langSwitcher.getAttribute('href');
      expect(href).toBeTruthy();

      // Take screenshot before switch
      await page.screenshot({
        path: `tests/screenshots/${language}-before-lang-switch.png`
      });

      // Click language switcher
      await langSwitcher.click();
      await page.waitForLoadState('networkidle');

      // Verify URL changed
      const newUrl = page.url();
      expect(newUrl).not.toBe(url);

      // Take screenshot after switch
      await page.screenshot({
        path: `tests/screenshots/${language}-after-lang-switch.png`
      });
    });

    test('7. Overview Mode', async ({ page }) => {
      // Press 'O' to enter overview mode
      await page.keyboard.press('o');
      await page.waitForTimeout(500);

      // Check if reveal has overview class
      const reveal = page.locator('.reveal');
      await expect(reveal).toHaveClass(/overview/);

      // All 12 slides should be visible in grid
      const allSlides = page.locator('.reveal .slides section');
      const slideCount = await allSlides.count();
      expect(slideCount).toBeGreaterThanOrEqual(12);

      // Take screenshot of overview
      await page.screenshot({
        path: `tests/screenshots/${language}-overview-mode.png`,
        fullPage: true
      });

      // Click on slide 3 to jump to it
      const thirdSlide = allSlides.nth(2);
      await thirdSlide.click();
      await page.waitForTimeout(500);

      // Verify we're on slide 3
      const slideCounter = page.locator('.slide-counter .current');
      await expect(slideCounter).toHaveText('03');

      // Exit overview with ESC
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      await expect(reveal).not.toHaveClass(/overview/);
    });

    test('8. Dark Mode Verification', async ({ page }) => {
      // Check if body or html has dark theme class/styles
      const body = page.locator('body');
      const backgroundColor = await body.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });

      console.log(`${language}: Background color is ${backgroundColor}`);

      // Dark mode should have dark background (rgb values close to 0)
      // This is a basic check - adjust based on actual theme
      expect(backgroundColor).toBeTruthy();

      // Take screenshot for manual verification
      await page.screenshot({
        path: `tests/screenshots/${language}-dark-mode.png`
      });
    });

    test('9. Text Readability Check', async ({ page }) => {
      // Get first slide title
      const title = page.locator('.reveal .slides section h1, .reveal .slides section h2').first();
      await expect(title).toBeVisible();

      // Check font size
      const fontSize = await title.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });

      console.log(`${language}: Title font size is ${fontSize}`);

      // Check contrast (basic check)
      const color = await title.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });

      console.log(`${language}: Title color is ${color}`);

      // Take screenshot
      await page.screenshot({
        path: `tests/screenshots/${language}-text-readability.png`
      });
    });

    test('10. All Slides Navigate Successfully', async ({ page }) => {
      const slideCounter = page.locator('.slide-counter .current');

      // Navigate through all 12 slides
      for (let i = 1; i <= 12; i++) {
        // Verify current slide number
        const currentNum = await slideCounter.textContent();
        console.log(`${language}: On slide ${currentNum}`);

        // Take screenshot of each slide
        await page.screenshot({
          path: `tests/screenshots/${language}-slide-${String(i).padStart(2, '0')}.png`
        });

        // Navigate to next slide (if not last)
        if (i < 12) {
          await page.keyboard.press('ArrowRight');
          await page.waitForTimeout(500);
        }
      }

      // Verify we're on slide 12
      await expect(slideCounter).toHaveText('12');
    });

  });
}

// Create test suites for both languages
createTestSuite('German', GERMAN_URL);
createTestSuite('English', ENGLISH_URL);

// Global test for cross-language consistency
test.describe('Cross-Language Consistency', () => {
  test('Both versions have same number of slides', async ({ page }) => {
    // Check German version
    await page.goto(GERMAN_URL);
    await page.waitForLoadState('networkidle');
    const germanTotal = page.locator('.slide-counter .total');
    const germanCount = await germanTotal.textContent();

    // Check English version
    await page.goto(ENGLISH_URL);
    await page.waitForLoadState('networkidle');
    const englishTotal = page.locator('.slide-counter .total');
    const englishCount = await englishTotal.textContent();

    // Should match
    expect(germanCount).toBe(englishCount);
  });
});
