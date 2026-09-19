import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Coupon, CartTotals } from '../types/cart';
import { Product, ProductIngredient, ProductSizeOption } from '../types/product';
import { mockProducts } from '../data/mockProducts';
import { mockCoupons } from '../data/mockCoupons';
import { useTheme } from './ThemeContext';
import { getItem, setItem } from '../utils/storage';
import { generateId } from '../utils/formatters';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    size: ProductSizeOption,
    selectedIngredients: ProductIngredient[],
    quantity?: number,
    specialInstructions?: string
  ) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  tipPercent: number;
  setTipPercent: (percent: number) => void;
  totals: CartTotals;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

// Initial mock cart matching Brago products
const getInitialCart = (): CartItem[] => {
  const p1 = mockProducts.find(p => p.id === 'prod-m101') || mockProducts[0];
  const p2 = mockProducts.find(p => p.id === 'prod-garra-chlor') || mockProducts[1];
  const p3 = mockProducts.find(p => p.id === 'prod-sepa-wax') || mockProducts[2];

  const p1Size = p1.sizes[0];
  const p1Ingredients = p1.ingredients.filter(i => i.isDefaultChecked);
  const p1IngPrice = p1Ingredients.reduce((sum, i) => sum + i.price, 0);
  const p1UnitPrice = parseFloat((p1Size.price + p1IngPrice).toFixed(2));

  const p2Size = p2.sizes[0];
  const p3Size = p3.sizes[0];

  return [
    {
      id: 'cart-init-1',
      productId: p1.id,
      product: p1,
      size: p1Size,
      selectedIngredients: p1Ingredients,
      specialInstructions: '',
      unitPrice: p1UnitPrice,
      quantity: 1,
      totalPrice: p1UnitPrice
    },
    {
      id: 'cart-init-2',
      productId: p2.id,
      product: p2,
      size: p2Size,
      selectedIngredients: [],
      specialInstructions: '',
      unitPrice: p2Size.price,
      quantity: 1,
      totalPrice: p2Size.price
    },
    {
      id: 'cart-init-3',
      productId: p3.id,
      product: p3,
      size: p3Size,
      selectedIngredients: [],
      specialInstructions: '',
      unitPrice: p3Size.price,
      quantity: 1,
      totalPrice: p3Size.price
    }
  ];
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { config } = useTheme();
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = getItem<CartItem[] | null>('cart_items', null);
    if (saved && Array.isArray(saved) && saved.length > 0) {
      const valid = saved.every((item: CartItem) => mockProducts.some(p => p.id === item.productId));
      if (valid) return saved;
    }
    return getInitialCart();
  });
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => getItem('cart_coupon', null));
  const [tipPercent, setTipPercent] = useState<number>(() => getItem('cart_tip_percent', 0));
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    setItem('cart_items', items);
  }, [items]);

  useEffect(() => {
    setItem('cart_coupon', appliedCoupon);
  }, [appliedCoupon]);

  useEffect(() => {
    setItem('cart_tip_percent', tipPercent);
  }, [tipPercent]);

  const calculateUnitPrice = (size: ProductSizeOption, ingredients: ProductIngredient[]): number => {
    const ingredientsSum = ingredients.reduce((sum, ing) => sum + ing.price, 0);
    return parseFloat((size.price + ingredientsSum).toFixed(2));
  };

  const addToCart = (
    product: Product,
    size: ProductSizeOption,
    selectedIngredients: ProductIngredient[],
    quantity: number = 1,
    specialInstructions: string = ''
  ) => {
    const unitPrice = calculateUnitPrice(size, selectedIngredients);
    const optionsKey = `${product.id}_${size.id}_${selectedIngredients.map(i => i.id).sort().join('-')}_${specialInstructions}`;

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === optionsKey);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: parseFloat((updated[existingIndex].unitPrice * newQty).toFixed(2))
        };
        return updated;
      }

      const newItem: CartItem = {
        id: optionsKey || generateId('item'),
        productId: product.id,
        product,
        size,
        selectedIngredients,
        specialInstructions,
        unitPrice,
        quantity,
        totalPrice: parseFloat((unitPrice * quantity).toFixed(2))
      };
      return [...prevItems, newItem];
    });
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === cartItemId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: parseFloat((item.unitPrice * newQuantity).toFixed(2))
            }
          : item
      )
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = mockCoupons.find(c => c.code.toUpperCase() === cleanCode);

    if (!found) {
      return { success: false, message: 'Cupom inválido ou expirado.' };
    }

    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    if (found.minOrderValue && subtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Valor mínimo para este cupom é $${found.minOrderValue.toFixed(2)}`
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Cupom ${found.code} aplicado com sucesso!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculate totals
  const subtotal = parseFloat(items.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2));
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = parseFloat(((subtotal * appliedCoupon.discountValue) / 100).toFixed(2));
    } else if (appliedCoupon.discountType === 'fixed') {
      discountAmount = Math.min(appliedCoupon.discountValue, subtotal);
    }
  }

  let deliveryFee = items.length > 0 ? config.deliveryFee : 0;
  if (appliedCoupon && appliedCoupon.discountType === 'free_shipping') {
    deliveryFee = 0;
  }
  if (subtotal >= config.freeDeliveryThreshold && items.length > 0) {
    deliveryFee = 0;
  }

  const tipAmount = tipPercent > 0 && subtotal > 0
    ? parseFloat(((subtotal * tipPercent) / 100).toFixed(2))
    : 0;

  const total = parseFloat((Math.max(0, subtotal - discountAmount) + deliveryFee + tipAmount).toFixed(2));

  const totals: CartTotals = {
    subtotal,
    discountAmount,
    deliveryFee,
    tipAmount,
    total,
    itemCount
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        tipPercent,
        setTipPercent,
        totals,
        isCartDrawerOpen,
        setIsCartDrawerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
