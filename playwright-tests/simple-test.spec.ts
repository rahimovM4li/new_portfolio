import { test, expect } from '@playwright/test';

test('Simple routing test - German homepage', async ({ page }) => {
  await page.goto('http://localhost:4200/de/');
  await page.waitForLoadState('networkidle');
  
  console.log('Current URL:', page.url());
  
  const htmlLang = await page.getAttribute('html', 'lang');
  console.log('HTML lang:', htmlLang);
  
  const title = await page.title();
  console.log('Title:', title);
  
  expect(page.url()).toContain('/de/');
});
