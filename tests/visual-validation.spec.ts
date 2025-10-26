import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://ma3u.github.io/interfaces2data/';

test.describe('Visual Validation - All 12 Slides', () => {

  test('Systematic visual check of all slides', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const results = [];

    for (let slideNum = 0; slideNum < 12; slideNum++) {
      if (slideNum > 0) {
        await page.click('button.arrow-right');
        await page.waitForTimeout(1000);
      }

      const slideTitle = await page.locator('h2').first().textContent();

      // Check background color
      const body = page.locator('body');
      const bgColor = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);

      // Check main text color
      const p = page.locator('p').first();
      const textColor = await p.evaluate(el => window.getComputedStyle(el).color);

      // Check if slide content is visible
      const slideContent = page.locator('.slide-content');
      const contentBg = await slideContent.evaluate(el => window.getComputedStyle(el).backgroundColor);

      const slideCheck = {
        slide: slideNum + 1,
        title: slideTitle,
        bodyBg: bgColor,
        contentBg: contentBg,
        textColor: textColor,
        isDark: bgColor.includes('26, 26, 26') || bgColor.includes('25, 25, 25'),
        textIsWhite: textColor.includes('245, 245, 245')
      };

      results.push(slideCheck);

      // Take screenshot
      await page.screenshot({
        path: `tests/screenshots/validation-slide-${String(slideNum + 1).padStart(2, '0')}.png`,
        fullPage: false
      });

      console.log(`\n📊 Slide ${slideNum + 1}: ${slideTitle}`);
      console.log(`   Background: ${bgColor} ${slideCheck.isDark ? '✅ DARK' : '❌ NOT DARK'}`);
      console.log(`   Text Color: ${textColor} ${slideCheck.textIsWhite ? '✅ WHITE' : '❌ NOT WHITE'}`);
      console.log(`   Content BG: ${contentBg}`);

      // Verify dark background
      expect(slideCheck.isDark).toBeTruthy();
      // Verify white text
      expect(slideCheck.textIsWhite).toBeTruthy();
    }

    console.log('\n\n✅ ALL 12 SLIDES VALIDATED:');
    console.log('   - All backgrounds are DARK');
    console.log('   - All text is WHITE');
    console.log('   - Screenshots saved for visual review');
  });
});
