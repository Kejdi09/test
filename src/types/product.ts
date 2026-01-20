export interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: Array<{ url: string; alt: string; isPrimary: boolean }>;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  parent?: string;
}
