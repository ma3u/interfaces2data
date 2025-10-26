import { test } from '@playwright/test';

test('Take screenshots of all 12 slides', async ({ page }) => {
  await page.goto('https://ma3u.github.io/interfaces2data/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  for (let i = 0; i < 12; i++) {
    if (i > 0) {
      await page.click('button.arrow-right');
      await page.waitForTimeout(1200);
    }

    const slideNum = String(i + 1).padStart(2, '0');
    await page.screenshot({
      path: `tests/screenshots/final-slide-${slideNum}.png`,
      fullPage: false
    });

    console.log(`✅ Screenshot ${i + 1}/12 saved`);
  }

  console.log('\n✅ All 12 slides captured for visual review');
});
