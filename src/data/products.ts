import heroAbaya from '@/assets/hero-abaya.jpg';
import hijabRose from '@/assets/product-hijab-rose.jpg';
import abayaBlack from '@/assets/product-abaya-black.jpg';
import kaftanSage from '@/assets/product-kaftan-sage.jpg';
import prayerCream from '@/assets/product-prayer-cream.jpg';

import { Product, Category } from '@/types/product';

// Base products data (without translations) aligned to requested embroidery categories
const baseProducts = [
  { id: '1', name: 'Signature Embroidered Apparel', description: 'Everyday apparel with refined embroidery accents.', price: 189, originalPrice: 249, image: heroAbaya, category: 'apparel', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Sage', 'Black', 'Navy'], inStock: true, isNew: true, isFeatured: true },
  { id: '2', name: 'Monogram T-Shirt', description: 'Soft cotton tee with custom monogram embroidery.', price: 45, image: hijabRose, category: 't-shirts', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Rose', 'Black', 'Cream', 'Sage'], inStock: true, isFeatured: true },
  { id: '3', name: 'Heritage Hoodie', description: 'Cozy hoodie with textured embroidery detail.', price: 259, image: abayaBlack, category: 'hoodies', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black'], inStock: true, isNew: true, isFeatured: true },
  { id: '4', name: 'Workwear Uniform Set', description: 'Durable uniform set with branded embroidery.', price: 199, originalPrice: 279, image: kaftanSage, category: 'workwear-uniforms', sizes: ['S', 'M', 'L', 'XL'], colors: ['Sage', 'Cream', 'Dusty Rose'], inStock: true, isFeatured: true },
  { id: '5', name: 'Baby Bodysuit Keepsake', description: 'Gentle bodysuit personalized for little ones.', price: 129, image: prayerCream, category: 'baby-kids-bodysuits', sizes: ['S', 'M', 'L', 'XL'], colors: ['Cream', 'White', 'Sage'], inStock: true, isNew: true },
  { id: '6', name: 'Decor Accent Set', description: 'Home & decor accents finished with stitching.', price: 75, image: hijabRose, category: 'home-decor', sizes: ['One Size'], colors: ['Mixed Set'], inStock: true },
  { id: '7', name: 'Custom Embroidered Frame', description: 'Framed embroidery art, ready to gift.', price: 145, image: kaftanSage, category: 'embroidered-frames', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], colors: ['Sage', 'Black', 'Navy', 'Cream'], inStock: true },
  { id: '8', name: 'Business Logo Patch', description: 'Logo embroidery prepared for business gear.', price: 89, image: prayerCream, category: 'business-logo-embroidery', sizes: ['One Size'], colors: ['Cream', 'Black'], inStock: true },
];

// Embroidery-focused categories grouped into three mains with children
const baseCategories: Category[] = [
  // Main: Apparel
  { id: 'apparel', name: 'Apparel', description: 'Embroidered apparel essentials', image: abayaBlack },
  { id: 't-shirts', name: 'T-Shirts', description: 'Embroidered tees', image: hijabRose, parent: 'apparel' },
  { id: 'hoodies', name: 'Hoodies', description: 'Cozy embroidered layers', image: heroAbaya, parent: 'apparel' },
  { id: 'workwear-uniforms', name: 'Workwear Uniforms', description: 'Branded work apparel', image: kaftanSage, parent: 'apparel' },
  { id: 'baby-kids-bodysuits', name: 'Baby & Kids Clothing (Bodysuits)', description: 'Personalized pieces for little ones', image: prayerCream, parent: 'apparel' },

  // Main: Home & Decor
  { id: 'home-decor', name: 'Home & Decor', description: 'Embroidered decor pieces', image: prayerCream },
  { id: 'embroidered-frames', name: 'Embroidered Frames', description: 'Framed embroidery art', image: heroAbaya, parent: 'home-decor' },
  { id: 'kids-frames', name: 'Kids Frames', description: 'Playful framed pieces', image: hijabRose, parent: 'home-decor' },
  { id: 'cushions', name: 'Cushions', description: 'Accent cushions with stitching', image: kaftanSage, parent: 'home-decor' },
  { id: 'wall-decor', name: 'Wall Decor', description: 'Textile wall pieces', image: abayaBlack, parent: 'home-decor' },
  { id: 'towels', name: 'Towels', description: 'Embroidered towels', image: prayerCream, parent: 'home-decor' },
  { id: 'napkins', name: 'Napkins', description: 'Table napkins with embroidery', image: heroAbaya, parent: 'home-decor' },

  // Main: Business Embroidery
  { id: 'business-embroidery', name: 'Business Embroidery', description: 'Brand-forward embroidery services', image: abayaBlack },
  { id: 'business-logo-embroidery', name: 'Business Logo Embroidery', description: 'Logo stitching services', image: hijabRose, parent: 'business-embroidery' },
];

export const useTranslatedProducts = (): Product[] => {
  return baseProducts.map((product) => ({
    ...product,
    name: product.name || '',
    description: product.description || '',
  }));
};

export const useTranslatedCategories = (): Category[] => {
  return baseCategories;
};

// Legacy exports for compatibility
export const products = baseProducts.map((p) => ({ ...p, name: '', description: '' }));
export const categories = baseCategories.map((c) => ({ ...c }));
