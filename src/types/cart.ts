import { Product, ProductIngredient, ProductSizeOption } from './product';

export interface CartItemOption {
  size: ProductSizeOption;
  selectedIngredients: ProductIngredient[];
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique item id in cart (product.id + hash of options)
  productId: string;
  product: Product;
  size: ProductSizeOption;
  selectedIngredients: ProductIngredient[];
  specialInstructions?: string;
  unitPrice: number; // size.price + sum(ingredients.price)
  quantity: number;
  totalPrice: number; // unitPrice * quantity
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  discountValue: number; // e.g. 30 for 30%, 10 for $10 off
  minOrderValue?: number;
  description: string;
}

export interface CartTotals {
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  tipAmount: number;
  total: number;
  itemCount: number;
}
