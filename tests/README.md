# Playwright Testing Guide for Interface2Data Presentation

This directory contains comprehensive end-to-end tests for the Interface2Data presentation using Playwright.

## Setup

### 1. Install Dependencies

```bash
npm install
```

This will install Playwright and all required dependencies.

### 2. Install Playwright Browsers

```bash
npx playwright install
```

This will download the necessary browser binaries (Chromium, Firefox, WebKit).

## Running Tests

### Run All Tests

```bash
npm test
```

This runs all tests in headless mode across all configured browsers.

### Run Tests with UI Mode (Recommended for Development)

```bash
npm run test:ui
```

This opens the Playwright UI, allowing you to:
- See tests running in real-time
- Debug failed tests
- View screenshots and videos
- Inspect test steps

### Run Tests in Headed Mode

```bash
npm run test:headed
```

This runs tests with visible browser windows.

### Run Specific Test File

```bash
npx playwright test presentation.spec.js
```

### Run Tests for Specific Browser

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit (Safari) only
npx playwright test --project=webkit
```

### Run Specific Test

```bash
npx playwright test -g "Page Load & Initial State"
```

## Viewing Test Results

### HTML Report

After tests complete, view the HTML report:

```bash
npm run test:report
```

This opens an interactive HTML report with:
- Test results summary
- Screenshots and videos
- Detailed test steps
- Timing information

### Report Locations

- **HTML Report**: `test-results/html-report/index.html`
- **JSON Results**: `test-results/results.json`
- **Screenshots**: `test-results/screenshots/`
- **Videos**: `test-results/artifacts/`

## Test Coverage

The test suite covers both German and English versions of the presentation:

### 1. Page Load & Initial State
- ✅ Page loads successfully
- ✅ Slide counter shows "< 01 / 12 >"
- ✅ Language switcher is visible
- ✅ First slide content is visible

### 2. Navigation (Button Clicks)
- ✅ Next button advances slides
- ✅ Previous button goes back
- ✅ Slide counter updates correctly

### 3. Navigation (Keyboard)
- ✅ Arrow keys navigate slides
- ✅ Space key reveals fragments
- ✅ All keyboard shortcuts work

### 4. Fragment Animations
- ✅ Fragments appear progressively
- ✅ Fragment visibility classes work
- ✅ Fragment timing is correct

### 5. Scrolling
- ✅ Content-heavy slides are scrollable
- ✅ Scroll behavior is smooth
- ✅ Overflow content is accessible

### 6. Language Switching
- ✅ Language switcher navigates correctly
- ✅ Content is properly translated
- ✅ URL changes appropriately

### 7. Overview Mode
- ✅ 'O' key activates overview
- ✅ All 12 slides appear in grid
- ✅ Clicking slide jumps to it
- ✅ ESC exits overview mode

### 8. Dark Mode
- ✅ Dark theme is applied
- ✅ Background colors are correct
- ✅ Visual appearance is consistent

### 9. Text Readability
- ✅ Font sizes are appropriate
- ✅ Text contrast is sufficient
- ✅ Content is readable

### 10. All Slides Navigate
- ✅ All 12 slides are accessible
- ✅ No navigation errors
- ✅ Slide transitions work smoothly

## Browser Coverage

Tests run on:
- ✅ **Desktop Chrome** (Chromium)
- ✅ **Desktop Firefox**
- ✅ **Desktop Safari** (WebKit)
- ✅ **Mobile Chrome** (Pixel 5)
- ✅ **Mobile Safari** (iPhone 12)

## Debugging Tests

### Debug Mode

```bash
npx playwright test --debug
```

This opens the Playwright Inspector for step-by-step debugging.

### View Specific Test with Inspector

```bash
npx playwright test --debug -g "Fragment Animations"
```

### Check Test in Specific Browser

```bash
npx playwright test --debug --project=firefox
```

## CI/CD Integration

The test configuration is ready for CI/CD integration:

```yaml
# Example GitHub Actions workflow
- name: Run Playwright tests
  run: npm test

- name: Upload test results
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: test-results/
```

## Troubleshooting

### Tests Failing Due to Slow Network

Increase timeout in `playwright.config.js`:

```javascript
timeout: 60 * 1000, // 60 seconds
```

### Browser Not Installed

```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### Screenshot Directory Doesn't Exist

The test will create it automatically, but you can create it manually:

```bash
mkdir -p tests/screenshots
```

## Test Structure

Each test follows this pattern:

1. **Arrange**: Navigate to page and wait for load
2. **Act**: Perform user actions (clicks, key presses)
3. **Assert**: Verify expected outcomes
4. **Screenshot**: Capture visual evidence

## Updating Tests

When presentation content changes:

1. Update slide count in tests if needed
2. Update expected content selectors
3. Run tests to verify changes
4. Update screenshots if visual changes occur

## Best Practices

- ✅ Run tests before committing changes
- ✅ Check test report for failures
- ✅ Review screenshots for visual regressions
- ✅ Keep tests updated with presentation changes
- ✅ Use meaningful test descriptions
- ✅ Add new tests for new features

## Support

For issues or questions:
- Check [Playwright Documentation](https://playwright.dev)
- Review test output in HTML report
- Examine screenshots and videos
- Check browser console logs in test output
