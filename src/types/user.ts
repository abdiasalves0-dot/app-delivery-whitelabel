export interface Address {
  id: string;
  label: string; // e.g. "Casa", "Trabalho", "Apartamento"
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface PaymentCard {
  id: string;
  cardHolder: string;
  cardNumber: string; // masked e.g. **** **** **** 4242
  expiryDate: string;
  brand: 'visa' | 'mastercard' | 'elo' | 'amex';
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  addresses: Address[];
  cards: PaymentCard[];
  role?: 'customer' | 'admin';
}
