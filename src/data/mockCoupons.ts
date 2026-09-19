import { Coupon } from '../types/cart';

export const mockCoupons: Coupon[] = [
  {
    code: 'PROMO30',
    discountType: 'percentage',
    discountValue: 30,
    minOrderValue: 10,
    description: '30% de Desconto Especial de Fim de Ano'
  },
  {
    code: 'FRETEGRATIS',
    discountType: 'free_shipping',
    discountValue: 100,
    minOrderValue: 15,
    description: 'Frete Grátis para qualquer pedido'
  },
  {
    code: 'BEMVINDO10',
    discountType: 'fixed',
    discountValue: 10,
    minOrderValue: 20,
    description: '$10 OFF no seu primeiro pedido'
  },
  {
    code: 'DELIVEROO',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 15,
    description: '20% OFF em todo o cardápio'
  }
];
