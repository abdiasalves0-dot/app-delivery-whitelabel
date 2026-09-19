import { CartItem } from './cart';
import { Address } from './user';

export type OrderStatus = 
  | 'placed'        // Pedido Realizado
  | 'confirmed'     // Confirmado pelo Restaurante
  | 'preparing'     // Em Preparo na Cozinha
  | 'on_the_way'    // Saiu para Entrega / A Caminho
  | 'delivered'     // Entregue
  | 'cancelled';    // Cancelado

export type PaymentMethodType = 'pix' | 'credit_card' | 'debit_card' | 'cash' | 'apple_pay' | 'google_pay';

export interface DriverInfo {
  id: string;
  name: string;
  photoUrl: string;
  vehicle: string; // e.g. "Honda CG 160 Fan"
  plate: string;   // e.g. "BRA2E19"
  rating: number;  // e.g. 4.9
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "#DL-8829"
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  tipAmount: number;
  total: number;
  deliveryAddress: Address;
  paymentMethod: PaymentMethodType;
  paymentDetails?: {
    pixCode?: string;
    pixQrCodeUrl?: string;
    cardLastDigits?: string;
    cashChangeFor?: number;
  };
  estimatedDeliveryTime: string; // e.g. "20-30 min"
  driver?: DriverInfo;
  trackingSteps: {
    status: OrderStatus;
    label: string;
    time: string;
    isCompleted: boolean;
  }[];
}
