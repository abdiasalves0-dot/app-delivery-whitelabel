import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus, PaymentMethodType, DriverInfo } from '../types/order';
import { CartItem } from '../types/cart';
import { Address } from '../types/user';
import { getItem, setItem } from '../utils/storage';
import { generateId } from '../utils/formatters';

interface CreateOrderParams {
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
}

interface OrderContextType {
  orders: Order[];
  activeOrder: Order | null;
  createOrder: (params: CreateOrderParams) => Order;
  setActiveOrder: (order: Order | null) => void;
  cancelOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
}

const DEFAULT_DRIVER: DriverInfo = {
  id: 'drv-1',
  name: 'Carlos Oliveira',
  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  vehicle: 'Honda CG 160 Fan - Vermelha',
  plate: 'BRA-2E19',
  rating: 4.9,
  phone: '(11) 98765-4321'
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => getItem('user_orders', []));
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setItem('user_orders', orders);
  }, [orders]);

  // Live order simulation timer
  useEffect(() => {
    if (!activeOrder || activeOrder.status === 'delivered' || activeOrder.status === 'cancelled') {
      return;
    }

    const timer = setTimeout(() => {
      let nextStatus: OrderStatus = activeOrder.status;
      if (activeOrder.status === 'placed') nextStatus = 'confirmed';
      else if (activeOrder.status === 'confirmed') nextStatus = 'preparing';
      else if (activeOrder.status === 'preparing') nextStatus = 'on_the_way';
      else if (activeOrder.status === 'on_the_way') nextStatus = 'delivered';

      const updatedSteps = activeOrder.trackingSteps.map(step => {
        if (step.status === nextStatus || (step.status === 'confirmed' && nextStatus === 'preparing')) {
          return { ...step, isCompleted: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        }
        return step;
      });

      const updatedOrder: Order = {
        ...activeOrder,
        status: nextStatus,
        trackingSteps: updatedSteps
      };

      setActiveOrder(updatedOrder);
      setOrders(prev => prev.map(o => (o.id === updatedOrder.id ? updatedOrder : o)));
    }, 12000); // changes status every 12 seconds in demo mode

    return () => clearTimeout(timer);
  }, [activeOrder]);

  const createOrder = (params: CreateOrderParams): Order => {
    const orderNum = `#DL-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: generateId('order'),
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      status: 'placed',
      items: params.items,
      subtotal: params.subtotal,
      discountAmount: params.discountAmount,
      deliveryFee: params.deliveryFee,
      tipAmount: params.tipAmount,
      total: params.total,
      deliveryAddress: params.deliveryAddress,
      paymentMethod: params.paymentMethod,
      paymentDetails: params.paymentDetails,
      estimatedDeliveryTime: '20-30 min',
      driver: DEFAULT_DRIVER,
      trackingSteps: [
        { status: 'placed', label: 'Pedido Realizado', time: nowStr, isCompleted: true },
        { status: 'confirmed', label: 'Confirmado pelo Restaurante', time: '--:--', isCompleted: false },
        { status: 'preparing', label: 'Em Preparo na Cozinha', time: '--:--', isCompleted: false },
        { status: 'on_the_way', label: 'Saiu para Entrega', time: '--:--', isCompleted: false },
        { status: 'delivered', label: 'Entregue', time: '--:--', isCompleted: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: 'cancelled' as OrderStatus } : o))
    );
    if (activeOrder?.id === orderId) {
      setActiveOrder(prev => (prev ? { ...prev, status: 'cancelled' } : null));
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrder,
        createOrder,
        setActiveOrder,
        cancelOrder,
        getOrderById,
        isTrackingModalOpen,
        setIsTrackingModalOpen
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
