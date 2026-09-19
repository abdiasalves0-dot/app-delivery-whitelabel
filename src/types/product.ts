export type ProductCategory = 
  | 'all'
  | 'embalagens'
  | 'limpeza'
  | 'panificacao'
  | 'descartaveis'
  | 'epi';

export interface ProductSizeOption {
  id: string;
  name: string;        // e.g. "6\" - Small", "8\" - Medium", "10\" - Large"
  label: string;       // e.g. "Small", "Medium", "Large"
  diameter?: string;   // e.g. "6\"", "8\"", "10\""
  price: number;       // base price for this size, e.g. 8.99, 10.99, 12.99
  isDefault?: boolean;
}

export interface ProductIngredient {
  id: string;
  name: string;        // e.g. "Chicken", "Mushroom", "Extra Cheese"
  portion: string;     // e.g. "250 gm", "50 gm", "100 gm"
  price: number;       // additional price e.g. 1.40, 0.40, 1.00
  icon?: string;
  isDefaultChecked?: boolean;
}

export interface Product {
  id: string;
  name: string;
  restaurant: string;      // e.g. "Pizza Italiano", "Burger Hunt", "Melt House"
  category: ProductCategory;
  description: string;
  basePrice: number;
  rating: number;           // e.g. 4.8
  reviewsCount: string;    // e.g. "2.2k"
  calories: number;        // e.g. 44
  prepTime: string;        // e.g. "20 min", "15-20 min"
  image: string;
  isBestSeller?: boolean;
  isPopular?: boolean;
  sizes: ProductSizeOption[];
  ingredients: ProductIngredient[];
}
