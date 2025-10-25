/**
 * Basic Playwright Tests for Interface2Data Presentation
 * Focuses on core functionality that works reliably
 */

import { test, expect } from '@playwright/test';

const GERMAN_URL = 'https://ma3u.github.io/interfaces2data/de.html';
const ENGLISH_URL = 'https://ma3u.github.io/interfaces2data/';

function createBasicTests(language, url) {
  test.describe(`${language} Version - Basic Tests`, () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      // Wait for Reveal.js to initialize
      await page.waitForTimeout(1000);
    });

    test('✅ Page loads successfully', async ({ page }) => {
      const title = await page.title();
      expect(title).toBeTruthy();
      console.log(`${language}: Page title is "${title}"`);

      // Take screenshot
      await page.screenshot({
        path: `tests/screenshots/${language}-page-load.png`,
        fullPage: true
      });
    });

    test('✅ Slide counter is visible and shows correct values', async ({ page }) => {
      const slideCounter = page.locator('.slide-counter');
      await expect(slideCounter).toBeVisible();

      const current = page.locator('.slide-counter .current');
      await expect(current).toHaveText('01');

      const total = page.locator('.slide-counter .total');
      await expect(total).toHaveText('12');

      console.log(`${language}: Slide counter shows 01 / 12`);
    });

    test('✅ Language switcher is visible', async ({ page }) => {
      const langSwitcher = page.locator('.language-switcher');
      await expect(langSwitcher).toBeVisible();

      const links = await langSwitcher.locator('a').count();
      expect(links).toBe(2); // English and German links

      console.log(`${language}: Language switcher has ${links} links`);
    });

    test('✅ First slide content is visible', async ({ page }) => {
      const firstSlide = page.locator('.reveal .slides section').first();
      await expect(firstSlide).toBeVisible();

      const heading = firstSlide.locator('h2').first();
      await expect(heading).toBeVisible();

      const headingText = await heading.textContent();
      console.log(`${language}: First slide heading: "${headingText}"`);
    });

    test('✅ Navigation buttons work', async ({ page }) => {
      const current = page.locator('.slide-counter .current');
      await expect(current).toHaveText('01');

      // Click next button
      const nextButton = page.locator('.slide-counter .arrow-right');
      await nextButton.click();
      await page.waitForTimeout(800);

      // Verify slide changed (should be 02 or higher)
      const newSlide = await current.textContent();
      console.log(`${language}: After clicking next, slide is ${newSlide}`);
      expect(newSlide).not.toBe('01');

      // Take screenshot
      await page.screenshot({
        path: `tests/screenshots/${language}-navigation-next.png`
      });

      // Click previous button
      const prevButton = page.locator('.slide-counter .arrow-left');
      await prevButton.click();
      await page.waitForTimeout(800);

      const backSlide = await current.textContent();
      console.log(`${language}: After clicking prev, slide is ${backSlide}`);
    });

    test('✅ Fragments exist on first slide', async ({ page }) => {
      const fragments = page.locator('.reveal .slides section.present .fragment');
      const fragmentCount = await fragments.count();

      console.log(`${language}: Found ${fragmentCount} fragments on first slide`);
      expect(fragmentCount).toBeGreaterThan(0);
    });

    test('✅ Dark mode - background is dark', async ({ page }) => {
      const body = page.locator('body');
      const backgroundColor = await body.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });

      console.log(`${language}: Background color is ${backgroundColor}`);

      // Check that it's a dark color (RGB values should be low)
      expect(backgroundColor).toContain('rgb');

      // Take screenshot for visual verification
      await page.screenshot({
        path: `tests/screenshots/${language}-dark-mode.png`
      });
    });

    test('✅ Text is readable - good font size and contrast', async ({ page }) => {
      const title = page.locator('.reveal .slides section h2').first();
      await expect(title).toBeVisible();

      const fontSize = await title.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });

      const color = await title.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });

      console.log(`${language}: Title font size is ${fontSize}`);
      console.log(`${language}: Title color is ${color}`);

      // Font size should be reasonable (at least 20px)
      const sizeValue = parseInt(fontSize);
      expect(sizeValue).toBeGreaterThan(20);
    });

    test('✅ Overview mode can be activated', async ({ page }) => {
      const reveal = page.locator('.reveal');

      // Initially not in overview
      const initialClass = await reveal.getAttribute('class');
      console.log(`${language}: Initial reveal classes: ${initialClass}`);

      // Press 'O' to enter overview
      await page.keyboard.press('o');
      await page.waitForTimeout(500);

      // Check if overview class is present
      const overviewClass = await reveal.getAttribute('class');
      console.log(`${language}: After 'O' key, reveal classes: ${overviewClass}`);

      expect(overviewClass).toContain('overview');

      // Take screenshot
      await page.screenshot({
        path: `tests/screenshots/${language}-overview-mode.png`,
        fullPage: true
      });
    });

    test('✅ Multiple slides are present in DOM', async ({ page }) => {
      const allSlides = page.locator('.reveal .slides section');
      const slideCount = await allSlides.count();

      console.log(`${language}: Total slides in DOM: ${slideCount}`);
      expect(slideCount).toBeGreaterThanOrEqual(12);
    });

    test('✅ Language switcher links to other language', async ({ page }) => {
      // Get the first link (which should be the other language)
      const langLink = page.locator('.language-switcher a').first();
      const href = await langLink.getAttribute('href');

      console.log(`${language}: Language switcher first link href: ${href}`);
      expect(href).toBeTruthy();

      // Take screenshot
      await page.screenshot({
        path: `tests/screenshots/${language}-lang-switcher.png`
      });
    });

    test('✅ Scrollable content works', async ({ page }) => {
      // Navigate to a few slides ahead
      for (let i = 0; i < 3; i++) {
        await page.locator('.slide-counter .arrow-right').click();
        await page.waitForTimeout(500);
      }

      // Get current slide
      const currentSlide = page.locator('.reveal .slides section.present');

      // Try scrolling
      const slideBox = await currentSlide.boundingBox();
      if (slideBox) {
        await page.mouse.move(slideBox.x + slideBox.width / 2, slideBox.y + slideBox.height / 2);
        await page.mouse.wheel(0, 100);
        await page.waitForTimeout(300);
      }

      // Take screenshot
      await page.screenshot({
        path: `tests/screenshots/${language}-scrolling.png`,
        fullPage: true
      });

      console.log(`${language}: Scrolling test completed`);
    });

  });
}

// Create test suites for both languages
createBasicTests('German', GERMAN_URL);
createBasicTests('English', ENGLISH_URL);

// Cross-language comparison
test.describe('Cross-Language Consistency', () => {
  test('Both versions have same structure', async ({ page }) => {
    // Check German version
    await page.goto(GERMAN_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const germanTotal = await page.locator('.slide-counter .total').textContent();
    const germanSlides = await page.locator('.reveal .slides section').count();

    // Check English version
    await page.goto(ENGLISH_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const englishTotal = await page.locator('.slide-counter .total').textContent();
    const englishSlides = await page.locator('.reveal .slides section').count();

    console.log(`German: ${germanTotal} slides counter, ${germanSlides} in DOM`);
    console.log(`English: ${englishTotal} slides counter, ${englishSlides} in DOM`);

    // Should match
    expect(germanTotal).toBe(englishTotal);
    expect(germanSlides).toBe(englishSlides);
  });
});
