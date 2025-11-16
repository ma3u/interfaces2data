import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5175/interfaces2data/#/11/0/3');
  await page.waitForTimeout(1000);
  
  // Get the container and image info
  const imageInfo = await page.evaluate(() => {
    const img = document.querySelector('section img[src*="Contact.Matthias"]');
    const container = img?.parentElement;
    const section = img?.closest('section');
    
    if (!img || !container || !section) {
      return { error: 'Image not found' };
    }
    
    const imgRect = img.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const slideContent = section.querySelector('.slide-content');
    const slideContentRect = slideContent?.getBoundingClientRect();
    
    return {
      image: {
        width: imgRect.width,
        height: imgRect.height,
        left: imgRect.left,
        right: imgRect.right,
      },
      container: {
        width: containerRect.width,
        height: containerRect.height,
        left: containerRect.left,
        right: containerRect.right,
      },
      section: {
        width: sectionRect.width,
        height: sectionRect.height,
        left: sectionRect.left,
        right: sectionRect.right,
      },
      slideContent: slideContentRect ? {
        width: slideContentRect.width,
        height: slideContentRect.height,
        left: slideContentRect.left,
        right: slideContentRect.right,
      } : null,
      imageStyles: {
        width: window.getComputedStyle(img).width,
        display: window.getComputedStyle(img).display,
      },
      containerStyles: {
        width: window.getComputedStyle(container).width,
        display: window.getComputedStyle(container).display,
        padding: window.getComputedStyle(container).padding,
        margin: window.getComputedStyle(container).margin,
      },
      slideContentStyles: slideContent ? {
        width: window.getComputedStyle(slideContent).width,
        padding: window.getComputedStyle(slideContent).padding,
        paddingBottom: window.getComputedStyle(slideContent).paddingBottom,
      } : null,
    };
  });
  
  console.log(JSON.stringify(imageInfo, null, 2));
  
  await browser.close();
})();
