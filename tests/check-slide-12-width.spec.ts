import { test, expect } from '@playwright/test';

test('Check slide 12 contact image width and container sizing', async ({ page }) => {
  await page.goto('http://localhost:5175/interfaces2data/#/11/0/3');
  
  // Wait for slide to fully load
  await page.waitForLoadState('networkidle');
  
  // Get the image element
  const image = await page.locator('img[src*="Contact.Matthias"]');
  
  // Get the parent container
  const imageContainer = await page.locator('div[style*="width: calc(100%"]');
  
  // Get the slide content wrapper
  const slideContent = await page.locator('.slide-content');
  
  // Get dimensions
  const imageBBox = await image.boundingBox();
  const containerBBox = await imageContainer.boundingBox();
  const slideContentBBox = await slideContent.boundingBox();
  
  console.log('Image bounding box:', imageBBox);
  console.log('Image container bounding box:', containerBBox);
  console.log('Slide content bounding box:', slideContentBBox);
  
  // Get computed styles
  const imageStyle = await image.evaluate(el => {
    const computed = window.getComputedStyle(el);
    return {
      width: computed.width,
      height: computed.height,
      objectFit: computed.objectFit,
      display: computed.display,
    };
  });
  
  const containerStyle = await imageContainer.evaluate(el => {
    const computed = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      width: computed.width,
      marginLeft: computed.marginLeft,
      marginRight: computed.marginRight,
      display: computed.display,
      parentWidth: el.parentElement?.clientWidth,
      elementWidth: el.clientWidth,
      boundingWidth: rect.width,
    };
  });
  
  const slideStyle = await slideContent.evaluate(el => {
    const computed = window.getComputedStyle(el);
    return {
      width: computed.width,
      padding: computed.padding,
      paddingLeft: computed.paddingLeft,
      paddingRight: computed.paddingRight,
      clientWidth: el.clientWidth,
    };
  });
  
  console.log('Image computed style:', imageStyle);
  console.log('Container computed style:', containerStyle);
  console.log('Slide content style:', slideStyle);
  
  // Check if image is 100% width
  const containerWidth = containerBBox?.width || 0;
  const slideWidth = slideContentBBox?.width || 0;
  
  console.log(`\n=== WIDTH COMPARISON ===`);
  console.log(`Slide content width: ${slideWidth}px`);
  console.log(`Image container width: ${containerWidth}px`);
  console.log(`Width difference: ${Math.abs(slideWidth - containerWidth)}px`);
  console.log(`Is image taking up full width? ${Math.abs(slideWidth - containerWidth) < 5 ? 'YES' : 'NO'}`);
});
