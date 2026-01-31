import embroideryMain from '@/assets/hero-abaya.jpg';
import embroideryRose from '@/assets/product-hijab-rose.jpg';
import embroideryBlack from '@/assets/product-abaya-black.jpg';
import embroiderySage from '@/assets/product-kaftan-sage.jpg';

import { Product, Category } from '@/types/product';

// Base products data (without translations) aligned to requested embroidery categories
const baseProducts = [
  { id: '1', name: 'Signature Embroidered Apparel', description: 'Everyday apparel with refined embroidery accents.', price: 189, originalPrice: 249, image: embroideryMain, category: 'apparel', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Sage', 'Black', 'Navy'], inStock: true, isNew: true, isFeatured: true },
  { id: '2', name: 'Monogram T-Shirt', description: 'Soft cotton tee with custom monogram embroidery.', price: 45, image: embroideryRose, category: 't-shirts', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Rose', 'Black', 'White', 'Sage'], inStock: true, isFeatured: true },
  { id: '3', name: 'Heritage Hoodie', description: 'Cozy hoodie with textured embroidery detail.', price: 259, image: embroideryBlack, category: 'hoodies', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black'], inStock: true, isNew: true, isFeatured: true },
  { id: '4', name: 'Workwear Uniform Set', description: 'Durable uniform set with branded embroidery.', price: 199, originalPrice: 279, image: embroiderySage, category: 'workwear-uniforms', sizes: ['S', 'M', 'L', 'XL'], colors: ['Sage', 'White', 'Dusty Rose'], inStock: true, isFeatured: true },
  { id: '5', name: 'Decor Accent Set', description: 'Home & decor accents finished with stitching.', price: 75, image: embroideryRose, category: 'home-decor', sizes: ['One Size'], colors: ['Mixed Set'], inStock: true },
  { id: '6', name: 'Custom Embroidered Frame', description: 'Framed embroidery art, ready to gift.', price: 145, image: embroiderySage, category: 'embroidered-frames', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], colors: ['Sage', 'Black', 'Navy', 'White'], inStock: true },
];

// Embroidery-focused categories grouped into three mains with children
const baseCategories = [
  // Main: Apparel
  { id: 'apparel', image: embroideryBlack, translations: {
    sq: { name: 'Veshje', description: 'Thelbësore të veshjeve të qëndisura me luks' },
    en: { name: 'Apparel', description: 'Embroidered apparel essentials' },
    fr: { name: 'Vêtements', description: 'Essentiels vestimentaires brodés' },
  } },
  { id: 't-shirts', image: embroideryRose, parent: 'apparel', translations: {
    sq: { name: 'Bluza', description: 'Bluza të qëndisura me stil' },
    en: { name: 'T-Shirts', description: 'Embroidered tees' },
    fr: { name: 'T-Shirts', description: 'T-shirts brodés' },
  } },
  { id: 'hoodies', image: embroideryMain, parent: 'apparel', translations: {
    sq: { name: 'Hoodies', description: 'Shtresa të ngrohta të qëndisura' },
    en: { name: 'Hoodies', description: 'Cozy embroidered layers' },
    fr: { name: 'Hoodies', description: 'Couches brodées confortables' },
  } },
  { id: 'workwear-uniforms', image: embroiderySage, parent: 'apparel', translations: {
    sq: { name: 'Uniforma Pune', description: 'Uniforma pune me qëndisje të personalizuar' },
    en: { name: 'Workwear Uniforms', description: 'Branded work apparel' },
    fr: { name: 'Uniformes de Travail', description: 'Uniformes de travail personnalisés' },
  } },

  // Main: Home & Decor
  { id: 'home-decor', image: embroideryRose, translations: {
    sq: { name: 'Dekor & Shtëpi', description: 'Dekor shtëpie me qëndisje luksoze' },
    en: { name: 'Home & Decor', description: 'Embroidered decor pieces' },
    fr: { name: 'Maison & Décor', description: 'Décorations brodées pour la maison' },
  } },
  { id: 'embroidered-frames', image: embroideryMain, parent: 'home-decor', translations: {
    sq: { name: 'Korniza të Qendisura', description: 'Art i qëndisur në kornizë' },
    en: { name: 'Embroidered Frames', description: 'Framed embroidery art' },
    fr: { name: 'Cadres Brodés', description: 'Art brodé encadré' },
  } },
  { id: 'kids-frames', image: embroideryRose, parent: 'home-decor', translations: {
    sq: { name: 'Korniza për Fëmijë', description: 'Korniza të gëzueshme për fëmijë' },
    en: { name: 'Kids Frames', description: 'Playful framed pieces' },
    fr: { name: 'Cadres Enfants', description: 'Cadres ludiques pour enfants' },
  } },
  { id: 'cushions', image: embroiderySage, parent: 'home-decor', translations: {
    sq: { name: 'Jastëkë', description: 'Jastëkë dekorativë me qëndisje' },
    en: { name: 'Cushions', description: 'Accent cushions with stitching' },
    fr: { name: 'Coussins', description: 'Coussins décoratifs brodés' },
  } },
  { id: 'wall-decor', image: embroideryBlack, parent: 'home-decor', translations: {
    sq: { name: 'Dekor Muri', description: 'Dekor tekstili për mur' },
    en: { name: 'Wall Decor', description: 'Textile wall pieces' },
    fr: { name: 'Décor Murale', description: 'Décorations murales en textile' },
  } },
  { id: 'napkins', image: embroideryMain, parent: 'home-decor', translations: {
    sq: { name: 'Peceta', description: 'Peceta tavoline të qëndisura' },
    en: { name: 'Napkins', description: 'Table napkins with embroidery' },
    fr: { name: 'Nappes Serviettes', description: 'Serviettes de table brodées' },
  } },

  // Main: Business Embroidery
  { id: 'business-embroidery', image: embroiderySage, translations: {
    sq: { name: 'Qendistje Biznesi', description: 'Shërbime qëndisjeje për brende' },
    en: { name: 'Business Embroidery', description: 'Brand-forward embroidery services' },
    fr: { name: 'Broderie pour Entreprises', description: 'Services de broderie pour entreprises' },
  } },
  { id: 'business-logo-embroidery', image: embroideryRose, parent: 'business-embroidery', translations: {
    sq: { name: 'Qendistje Logo Biznesi', description: 'Qëndisje logosh për kompani' },
    en: { name: 'Business Logo Embroidery', description: 'Logo stitching services' },
    fr: { name: 'Broderie de Logo', description: 'Broderie de logos pour entreprises' },
  } },
];

export const useTranslatedProducts = (): Product[] => {
  return baseProducts.map((product) => ({
    ...product,
    name: product.name || '',
    description: product.description || '',
  }));
};

import { useLanguage } from '@/context/LanguageContext';

export const useTranslatedCategories = (): Category[] => {
  const { language } = useLanguage();
  return baseCategories.map((cat) => ({
    ...cat,
    name: cat.translations[language].name,
    description: cat.translations[language].description,
  }));
};

// Legacy exports for compatibility
export const products = baseProducts.map((p) => ({ ...p, name: '', description: '' }));
export const categories = baseCategories.map((c) => ({ ...c }));
