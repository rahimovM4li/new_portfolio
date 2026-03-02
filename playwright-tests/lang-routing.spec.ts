import { test, expect } from '@playwright/test';

test.describe('URL-based Language Routing', () => {
  
  test('should redirect / to /de/', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL(/.*\/de\/?/);
    expect(page.url()).toContain('/de/');
  });

  test('should load German homepage at /de/', async ({ page }) => {
    await page.goto('/de/');
    
    // Check URL
    expect(page.url()).toContain('/de/');
    
    // Check HTML lang attribute
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('de');
    
    // Check page title contains German text
    const title = await page.title();
    expect(title).toContain('Entwickler Deutschland');
    
    // Check meta description contains German text
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toContain('Entwickler aus Deutschland');
  });

  test('should load English homepage at /en/', async ({ page }) => {
    await page.goto('/en/');
    
    // Check URL
    expect(page.url()).toContain('/en/');
    
    // Check HTML lang attribute
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('en');
    
    // Check page title contains English text
    const title = await page.title();
    expect(title).toContain('Developer Germany');
    
    // Check meta description contains English text
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toContain('Developer based in Germany');
  });

  test('should load Russian homepage at /ru/', async ({ page }) => {
    await page.goto('/ru/');
    
    // Check URL
    expect(page.url()).toContain('/ru/');
    
    // Check HTML lang attribute
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('ru');
    
    // Check page title contains Russian text
    const title = await page.title();
    expect(title).toContain('Германия');
    
    // Check meta description contains Russian text
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toContain('Германии');
  });

  test('should navigate between languages on homepage using language switcher', async ({ page }) => {
    await page.goto('/de/');
    
    // Open language dropdown (assuming navbar has language switcher)
    const langButton = page.locator('[data-testid="lang-switcher"], .lang-dropdown, button:has-text("DE")').first();
    if (await langButton.isVisible()) {
      await langButton.click();
      
      // Click English option
      const enOption = page.locator('button:has-text("EN"), a:has-text("EN")').first();
      await enOption.click();
      
      // Should navigate to /en/
      await page.waitForURL(/.*\/en\/?/);
      expect(page.url()).toContain('/en/');
      
      // Check HTML lang changed to 'en'
      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('en');
    }
  });

  test('should maintain language when navigating between pages', async ({ page }) => {
    await page.goto('/en/');
    
    // Navigate to About page (assuming navbar has About link)
    const aboutLink = page.locator('a:has-text("About")').first();
    await aboutLink.click();
    
    // Should stay in English and go to /en/about
    await page.waitForURL(/.*\/en\/about/);
    expect(page.url()).toContain('/en/about');
    
    // Check HTML lang is still 'en'
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('en');
    
    // Check page title contains English text for About page
    const title = await page.title();
    expect(title).toContain('About');
  });

  test('should have correct hreflang tags for multilingual SEO', async ({ page }) => {
    await page.goto('/de/about');
    
    // Check for hreflang tags
    const hreflangDe = page.locator('link[rel="alternate"][hreflang="de"]');
    const hreflangEn = page.locator('link[rel="alternate"][hreflang="en"]');
    const hreflangRu = page.locator('link[rel="alternate"][hreflang="ru"]');
    const hreflangXDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
    
    // All hreflang tags should exist
    await expect(hreflangDe).toHaveCount(1);
    await expect(hreflangEn).toHaveCount(1);
    await expect(hreflangRu).toHaveCount(1);
    await expect(hreflangXDefault).toHaveCount(1);
    
    // Check href values point to correct language-specific URLs
    const hrefDe = await hreflangDe.getAttribute('href');
    const hrefEn = await hreflangEn.getAttribute('href');
    const hrefRu = await hreflangRu.getAttribute('href');
    
    expect(hrefDe).toContain('/de/about');
    expect(hrefEn).toContain('/en/about');
    expect(hrefRu).toContain('/ru/about');
  });

  test('should have language-specific canonical URLs', async ({ page }) => {
    await page.goto('/en/projects');
    
    // Check canonical URL includes language prefix
    const canonical = page.locator('link[rel="canonical"]');
    const canonicalHref = await canonical.getAttribute('href');
    
    expect(canonicalHref).toContain('/en/projects');
  });

  test('should have language-specific Open Graph URLs', async ({ page }) => {
    await page.goto('/ru/contact');
    
    // Check og:url includes language prefix
    const ogUrl = page.locator('meta[property="og:url"]');
    const ogUrlContent = await ogUrl.getAttribute('content');
    
    expect(ogUrlContent).toContain('/ru/contact');
    
    // Check og:locale is Russian
    const ogLocale = page.locator('meta[property="og:locale"]');
    const ogLocaleContent = await ogLocale.getAttribute('content');
    
    expect(ogLocaleContent).toBe('ru_RU');
  });

  test('should redirect old URLs to German versions', async ({ page }) => {
    // Test redirect from /about to /de/about
    const response = await page.goto('/about');
    
    // Should redirect (status 301 or 302) or client-side redirect to /de/about
    await page.waitForURL(/.*\/de\/about/, { timeout: 5000 });
    expect(page.url()).toContain('/de/about');
  });

});
