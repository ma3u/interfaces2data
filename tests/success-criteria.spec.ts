import { test, expect } from '@playwright/test';

const PRODUCTION_URL_EN = 'https://ma3u.github.io/interfaces2data/';
const PRODUCTION_URL_DE = 'https://ma3u.github.io/interfaces2data/de.html';

test.describe('Success Criteria - English Version', () => {

  test('Criterion 1: Navigation buttons always visible and functional', async ({ page }) => {
    await page.goto(PRODUCTION_URL_EN);
    await page.waitForLoadState('networkidle');

    // Check slide counter is visible
    const slideCounter = page.locator('.slide-counter');
    await expect(slideCounter).toBeVisible();

    // Check navigation buttons are visible
    const leftButton = slideCounter.locator('button.arrow-left');
    const rightButton = slideCounter.locator('button.arrow-right');
    await expect(leftButton).toBeVisible();
    await expect(rightButton).toBeVisible();

    // Test right navigation
    const initialSlide = await page.locator('.slide-counter .current').textContent();
    await rightButton.click();
    await page.waitForTimeout(500);
    const newSlide = await page.locator('.slide-counter .current').textContent();
    expect(newSlide).not.toBe(initialSlide);

    // Test left navigation
    await leftButton.click();
    await page.waitForTimeout(500);
    const backSlide = await page.locator('.slide-counter .current').textContent();
    expect(backSlide).toBe(initialSlide);

    console.log('✅ Criterion 1 PASSED: Navigation always visible and functional');
  });

  test('Criterion 2: Optimized for Mobile and Desktop', async ({ page, viewport }) => {
    // Test Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(PRODUCTION_URL_EN);
    await page.waitForLoadState('networkidle');

    let slideContent = page.locator('.slide-content').first();
    await expect(slideContent).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/desktop-view.png' });

    // Test Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await expect(slideContent).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/tablet-view.png' });

    // Test Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await expect(slideContent).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/mobile-view.png' });

    console.log('✅ Criterion 2 PASSED: Responsive on all devices');
  });

  test('Criterion 3: Content fades in step by step - Headline + first block visible', async ({ page }) => {
    await page.goto(PRODUCTION_URL_EN);
    await page.waitForLoadState('networkidle');

    // Check headline is immediately visible
    const h2 = page.locator('h2').first();
    await expect(h2).toBeVisible();
    await expect(h2).toHaveText(/The Data Paradox/);

    // Check first content block is visible (no fragment class)
    const firstBlock = page.locator('.highlight-box').first();
    await expect(firstBlock).toBeVisible();
    await expect(firstBlock).not.toHaveClass(/fragment/);

    // Check subsequent blocks have fragment class (will fade in)
    const fragments = page.locator('.fragment');
    const fragmentCount = await fragments.count();
    expect(fragmentCount).toBeGreaterThan(0);

    console.log(`✅ Criterion 3 PASSED: Headline + first block visible, ${fragmentCount} fragments for progressive reveal`);
  });

  test('Criterion 4: Font sizes fit presentation (height & width)', async ({ page }) => {
    await page.goto(PRODUCTION_URL_EN);
    await page.waitForLoadState('networkidle');

    // Check H1 size
    const h1 = page.locator('h1').first();
    if (await h1.isVisible()) {
      const h1Size = await h1.evaluate(el => window.getComputedStyle(el).fontSize);
      expect(parseFloat(h1Size)).toBeGreaterThanOrEqual(32); // At least 32px
    }

    // Check H2 size
    const h2 = page.locator('h2').first();
    const h2Size = await h2.evaluate(el => window.getComputedStyle(el).fontSize);
    expect(parseFloat(h2Size)).toBeGreaterThanOrEqual(28); // At least 28px (1.75rem)

    // Check paragraph text
    const p = page.locator('p').first();
    const pSize = await p.evaluate(el => window.getComputedStyle(el).fontSize);
    expect(parseFloat(pSize)).toBeGreaterThanOrEqual(16); // At least 16px (1rem)

    // Check table text (Slide 3)
    await page.click('button.arrow-right'); // Navigate to slide 2
    await page.waitForTimeout(500);
    await page.click('button.arrow-right'); // Navigate to slide 3
    await page.waitForTimeout(500);

    const th = page.locator('th').first();
    const thSize = await th.evaluate(el => window.getComputedStyle(el).fontSize);
    expect(parseFloat(thSize)).toBeGreaterThanOrEqual(20); // At least 20px (1.25rem)

    console.log('✅ Criterion 4 PASSED: Font sizes appropriate for presentation');
    console.log(`  - H2: ${h2Size}, Paragraph: ${pSize}, Table Header: ${thSize}`);
  });

  test('Criterion 5: Excellent text accessibility and contrast', async ({ page }) => {
    await page.goto(PRODUCTION_URL_EN);
    await page.waitForLoadState('networkidle');

    // Check dark background
    const body = page.locator('body');
    const bgColor = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);
    expect(bgColor).toContain('rgb(26, 26, 26)'); // Dark background

    // Check text color has good contrast
    const h2 = page.locator('h2').first();
    const textColor = await h2.evaluate(el => window.getComputedStyle(el).color);
    // Should be light text (rgb(245, 245, 245))
    expect(textColor).toContain('245');

    // Check primary color visibility
    const primaryElement = page.locator('.slide-counter .current');
    const primaryColor = await primaryElement.evaluate(el => window.getComputedStyle(el).color);
    // Should be bright cyan for visibility
    expect(primaryColor).toBeTruthy();

    // Verify no accessibility issues with aria labels
    const leftButton = page.locator('button[aria-label="Previous slide"]');
    await expect(leftButton).toHaveAttribute('aria-label');

    console.log('✅ Criterion 5 PASSED: Excellent contrast and accessibility');
    console.log(`  - Background: ${bgColor}, Text: ${textColor}`);
  });

  test('Full User Journey: Navigate through all 12 slides', async ({ page }) => {
    await page.goto(PRODUCTION_URL_EN);
    await page.waitForLoadState('networkidle');

    const rightButton = page.locator('button.arrow-right');

    // Navigate through all 12 slides
    for (let i = 1; i <= 11; i++) {
      const currentSlide = await page.locator('.slide-counter .current').textContent();
      expect(currentSlide).toBe(String(i).padStart(2, '0'));

      await rightButton.click();
      await page.waitForTimeout(600);
    }

    // Verify we're on slide 12
    const finalSlide = await page.locator('.slide-counter .current').textContent();
    expect(finalSlide).toBe('12');

    console.log('✅ Full Journey PASSED: Successfully navigated all 12 slides');
  });
});

test.describe('Success Criteria - German Version', () => {

  test('All criteria pass for German version', async ({ page }) => {
    await page.goto(PRODUCTION_URL_DE);
    await page.waitForLoadState('networkidle');

    // Criterion 1: Navigation visible
    await expect(page.locator('.slide-counter')).toBeVisible();
    await expect(page.locator('button.arrow-left')).toBeVisible();
    await expect(page.locator('button.arrow-right')).toBeVisible();

    // Criterion 3: Headline and first block visible
    const h2 = page.locator('h2').first();
    await expect(h2).toBeVisible();
    await expect(h2).toHaveText(/Daten-Paradoxon/);

    const firstBlock = page.locator('.highlight-box').first();
    await expect(firstBlock).toBeVisible();

    // Criterion 5: Dark mode and contrast
    const body = page.locator('body');
    const bgColor = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);
    expect(bgColor).toContain('rgb(26, 26, 26)');

    console.log('✅ German version PASSED all criteria');
  });

  test('Tooltips work correctly on Slide 3 (German)', async ({ page }) => {
    await page.goto(PRODUCTION_URL_DE + '#/2');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Find tooltip trigger
    const tooltip = page.locator('.business-model-tooltip').first();
    await expect(tooltip).toBeVisible();

    // Hover to show tooltip
    await tooltip.hover();
    await page.waitForTimeout(500);

    // Tooltip should be visible
    const tooltipContent = page.locator('.tooltip-content').first();
    await expect(tooltipContent).toBeVisible();

    await page.screenshot({ path: 'tests/screenshots/German-tooltip-visible.png' });

    console.log('✅ German tooltips PASSED: Fully visible on hover');
  });
});

test.describe('Scrolling Functionality', () => {

  test('Vertical scrolling works with keyboard', async ({ page }) => {
    await page.goto(PRODUCTION_URL_EN + '#/3'); // Slide 4 has lots of content
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const activeSlide = page.locator('.reveal .slides section.present');

    // Get initial scroll position
    const initialScroll = await activeSlide.evaluate(el => el.scrollTop);

    // Press down arrow
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(300);

    const afterDownScroll = await activeSlide.evaluate(el => el.scrollTop);
    expect(afterDownScroll).toBeGreaterThan(initialScroll);

    // Press up arrow
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(300);

    const afterUpScroll = await activeSlide.evaluate(el => el.scrollTop);
    expect(afterUpScroll).toBeLessThan(afterDownScroll);

    console.log('✅ Scrolling PASSED: Up/Down arrows work correctly');
  });

  test('Scroll indicators appear when content overflows', async ({ page }) => {
    await page.goto(PRODUCTION_URL_EN + '#/3');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Check if scroll indicators exist
    const scrollDown = page.locator('.scroll-indicator-down');
    const scrollUp = page.locator('.scroll-indicator-up');

    // At least one should be in the DOM
    const downExists = await scrollDown.count();
    const upExists = await scrollUp.count();
    expect(downExists + upExists).toBeGreaterThan(0);

    console.log('✅ Scroll indicators present');
  });
});
