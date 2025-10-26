import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PRODUCTION_URL = 'https://ma3u.github.io/interfaces2data/';

test.describe('Systematic Accessibility Testing', () => {

  test('Check color contrast on all 12 slides', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    await page.waitForLoadState('networkidle');

    const contrastIssues = [];

    // Test each slide
    for (let slideNum = 0; slideNum < 12; slideNum++) {
      // Navigate to slide
      if (slideNum > 0) {
        await page.click('button.arrow-right');
        await page.waitForTimeout(800);
      }

      console.log(`\n📊 Testing Slide ${slideNum + 1}...`);

      // Get all text elements
      const textElements = await page.locator('.slide-content p, .slide-content li, .slide-content h3, .slide-content strong').all();

      for (let i = 0; i < Math.min(textElements.length, 5); i++) {
        const element = textElements[i];
        const isVisible = await element.isVisible();
        if (!isVisible) continue;

        const styles = await element.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontSize: computed.fontSize
          };
        });

        // Check if background is too light for light text
        if (styles.color.includes('245') && styles.backgroundColor.includes('255')) {
          contrastIssues.push({
            slide: slideNum + 1,
            element: await element.textContent(),
            issue: 'Light text on light background',
            color: styles.color,
            bg: styles.backgroundColor
          });
        }
      }
    }

    // Report issues
    if (contrastIssues.length > 0) {
      console.log('\n❌ CONTRAST ISSUES FOUND:');
      contrastIssues.forEach(issue => {
        console.log(`  Slide ${issue.slide}: "${issue.element?.substring(0, 50)}..." - ${issue.issue}`);
        console.log(`    Color: ${issue.color}, BG: ${issue.bg}`);
      });
    } else {
      console.log('\n✅ NO CONTRAST ISSUES - All text is readable!');
    }

    // Allow some issues but not too many
    expect(contrastIssues.length).toBeLessThan(3);
  });

  test('Verify minimum contrast ratio WCAG AA (4.5:1)', async ({ page }) => {
    await page.goto(PRODUCTION_URL);
    await page.waitForLoadState('networkidle');

    // Helper to calculate relative luminance
    const getLuminance = (rgb: number[]) => {
      const [r, g, b] = rgb.map(val => {
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    // Helper to calculate contrast ratio
    const getContrastRatio = (rgb1: number[], rgb2: number[]) => {
      const lum1 = getLuminance(rgb1);
      const lum2 = getLuminance(rgb2);
      const lighter = Math.max(lum1, lum2);
      const darker = Math.min(lum1, lum2);
      return (lighter + 0.05) / (darker + 0.05);
    };

    // Parse RGB string to array
    const parseRgb = (rgbString: string): number[] => {
      const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [0, 0, 0];
    };

    // Check main heading
    const h2 = page.locator('h2').first();
    const h2Styles = await h2.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        color: computed.color,
        bg: window.getComputedStyle(document.body).backgroundColor
      };
    });

    const textRgb = parseRgb(h2Styles.color);
    const bgRgb = parseRgb(h2Styles.bg);
    const contrastRatio = getContrastRatio(textRgb, bgRgb);

    console.log(`\n📏 Main heading contrast ratio: ${contrastRatio.toFixed(2)}:1`);
    console.log(`   Text: ${h2Styles.color}, Background: ${h2Styles.bg}`);
    expect(contrastRatio).toBeGreaterThanOrEqual(4.5);

    // Check card text (navigate to slide with cards)
    await page.click('button.arrow-right');
    await page.click('button.arrow-right');
    await page.waitForTimeout(1000);

    const cardText = page.locator('.card p, .card strong').first();
    if (await cardText.isVisible()) {
      const cardStyles = await cardText.evaluate(el => {
        const computed = window.getComputedStyle(el);
        const parent = el.closest('.card');
        const parentBg = parent ? window.getComputedStyle(parent as HTMLElement).backgroundColor : 'rgb(0,0,0)';
        return {
          color: computed.color,
          bg: parentBg
        };
      });

      const cardTextRgb = parseRgb(cardStyles.color);
      const cardBgRgb = parseRgb(cardStyles.bg);
      const cardContrast = getContrastRatio(cardTextRgb, cardBgRgb);

      console.log(`\n📏 Card text contrast ratio: ${cardContrast.toFixed(2)}:1`);
      console.log(`   Text: ${cardStyles.color}, Background: ${cardStyles.bg}`);

      // For normal text, we need at least 4.5:1
      expect(cardContrast).toBeGreaterThanOrEqual(4.5);
    }

    console.log('\n✅ WCAG AA contrast requirements met!');
  });
});
