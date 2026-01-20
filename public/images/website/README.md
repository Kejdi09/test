# Website Section Images

This folder contains non-product images for website sections (hero, banners, etc.).

## Image Locations & Usage

### Hero Section
- **Path:** `public/images/website/hero.jpg`
- **Used in:** Home page hero banner
- **Recommended size:** 1920×600px or wider, landscape
- **Current code:** [src/components/home/Hero.tsx](../../src/components/home/Hero.tsx) imports from `@/assets/hero-abaya.jpg`

### About Page Hero
- **Path:** `public/images/website/about-hero.jpg`
- **Used in:** About page banner
- **Recommended size:** 1920×600px
- **Current code:** [src/pages/About.tsx](../../src/pages/About.tsx) imports from `@/assets/hero-abaya.jpg`

### Category Showcase Images (Browse By section)
- **Path:** `public/images/website/category-apparel.jpg`
- **Path:** `public/images/website/category-home-decor.jpg`
- **Path:** `public/images/website/category-business.jpg`
- **Used in:** Home page "Browse By Categories" grid
- **Recommended size:** 600×800px (portrait)
- **Current code:** [src/components/home/Categories.tsx](../../src/components/home/Categories.tsx)

### Featured Products Banner
- **Path:** `public/images/website/featured-banner.jpg`
- **Used in:** Promotional/seasonal banners
- **Recommended size:** 1920×400px

### Contact Page Image
- **Path:** `public/images/website/contact-banner.jpg`
- **Used in:** Contact page header
- **Recommended size:** 1920×400px

---

## How to Add Images

1. Save your image files to this folder (`public/images/website/`)
2. Update the component to reference the new path, e.g.:
   ```tsx
   import heroImage from '@/assets/hero-embroidery.jpg';  // Old way (assets)
   // Change to:
   const heroImage = '/images/website/hero.jpg';  // New way (public)
   ```

3. Or in HTML/JSX:
   ```tsx
   <img src="/images/website/hero.jpg" alt="Hero section" />
   ```

---

## Image Dimensions Quick Reference

| Section | Width | Height | Format |
|---------|-------|--------|--------|
| Hero | 1920 | 600 | JPG/WebP |
| Hero Short | 1920 | 400 | JPG/WebP |
| Category Grid | 600 | 800 | JPG/PNG |
| Banners | 1920 | 400 | JPG/WebP |
| Mobile Hero | 800 | 600 | JPG/WebP |

---

## Current Assets Usage

Check these files to see what images are currently referenced:
- [src/components/home/Hero.tsx](../../src/components/home/Hero.tsx)
- [src/components/home/Categories.tsx](../../src/components/home/Categories.tsx)
- [src/pages/About.tsx](../../src/pages/About.tsx)
- [src/pages/Contact.tsx](../../src/pages/Contact.tsx)
