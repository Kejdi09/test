import heroAbaya from '@/assets/hero-abaya.jpg';
import hijabRose from '@/assets/product-hijab-rose.jpg';
import abayaBlack from '@/assets/product-abaya-black.jpg';
import kaftanSage from '@/assets/product-kaftan-sage.jpg';
import prayerCream from '@/assets/product-prayer-cream.jpg';

import { Product, Category } from '@/types/product';
import { useTranslation } from '@/context/LanguageContext';

// Base products data (without translations)
const baseProducts = [
  { id: '1', price: 189, originalPrice: 249, image: heroAbaya, category: 'dresses', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Sage', 'Black', 'Navy'], inStock: true, isNew: true, isFeatured: true },
  { id: '2', price: 45, image: hijabRose, category: 'tops', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Rose', 'Black', 'Cream', 'Sage'], inStock: true, isFeatured: true },
  { id: '3', price: 259, image: abayaBlack, category: 'dresses', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black'], inStock: true, isNew: true, isFeatured: true },
  { id: '4', price: 199, originalPrice: 279, image: kaftanSage, category: 'skirts', sizes: ['S', 'M', 'L', 'XL'], colors: ['Sage', 'Cream', 'Dusty Rose'], inStock: true, isFeatured: true },
  { id: '5', price: 129, image: prayerCream, category: 'jackets', sizes: ['S', 'M', 'L', 'XL'], colors: ['Cream', 'White', 'Sage'], inStock: true, isNew: true },
  { id: '6', price: 75, image: hijabRose, category: 'tops', sizes: ['One Size'], colors: ['Mixed Set'], inStock: true },
  { id: '7', price: 145, image: kaftanSage, category: 'dresses', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], colors: ['Sage', 'Black', 'Navy', 'Cream'], inStock: true },
  { id: '8', price: 89, image: prayerCream, category: 'jackets', sizes: ['One Size'], colors: ['Cream', 'Black'], inStock: true },
];

const baseCategories = [
  { id: 'dresses', image: abayaBlack },
  { id: 'tops', image: hijabRose },
  { id: 'skirts', image: kaftanSage },
  { id: 'jackets', image: prayerCream },
];

export const useTranslatedProducts = (): Product[] => {
  const { t } = useTranslation();
  
  const productTranslations: Record<string, { name: string; description: string }> = {
    '1': { name: t.productDress1Name, description: t.productDress1Desc },
    '2': { name: t.productTop1Name, description: t.productTop1Desc },
    '3': { name: t.productDress2Name, description: t.productDress2Desc },
    '4': { name: t.productSkirt1Name, description: t.productSkirt1Desc },
    '5': { name: t.productJacket1Name, description: t.productJacket1Desc },
    '6': { name: t.productTopSet, description: t.productTopSetDesc },
    '7': { name: t.productDress3Name, description: t.productDress3Desc },
    '8': { name: t.productJacket2Name, description: t.productJacket2Desc },
  };

  return baseProducts.map((product) => ({
    ...product,
    name: productTranslations[product.id]?.name || '',
    description: productTranslations[product.id]?.description || '',
  }));
};

export const useTranslatedCategories = (): Category[] => {
  const { t } = useTranslation();
  
  const categoryTranslations: Record<string, { name: string; description: string }> = {
    'dresses': { name: t.dresses, description: t.dressesDesc },
    'tops': { name: t.tops, description: t.topsDesc },
    'skirts': { name: t.skirts, description: t.skirtsDesc },
    'jackets': { name: t.jackets, description: t.jacketsDesc },
  };

  return baseCategories.map((category) => ({
    ...category,
    name: categoryTranslations[category.id]?.name || category.id,
    description: categoryTranslations[category.id]?.description || '',
  }));
};

// Legacy exports for compatibility
export const products = baseProducts.map((p) => ({ ...p, name: '', description: '' }));
export const categories = baseCategories.map((c) => ({ ...c, name: c.id, description: '' }));
