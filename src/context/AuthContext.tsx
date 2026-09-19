import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Address, PaymentCard } from '../types/user';
import { mockAddresses } from '../data/mockAddresses';
import { getItem, setItem } from '../utils/storage';
import { generateId } from '../utils/formatters';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  selectedAddress: Address | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, pass: string) => Promise<boolean>;
  logout: () => void;
  quickDemoLogin: (role?: 'customer' | 'admin') => void;
  setSelectedAddress: (address: Address) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  addCard: (card: Omit<PaymentCard, 'id'>) => void;
  removeCard: (cardId: string) => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const DEFAULT_USER: User = {
  id: 'usr-1',
  name: 'Lucas Silva',
  email: 'lucas.silva@email.com',
  phone: '+55 11 99876-5432',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  role: 'customer',
  addresses: mockAddresses,
  cards: [
    {
      id: 'card-1',
      cardHolder: 'LUCAS SILVA',
      cardNumber: '•••• •••• •••• 4242',
      expiryDate: '12/28',
      brand: 'mastercard',
      isDefault: true
    },
    {
      id: 'card-2',
      cardHolder: 'LUCAS SILVA',
      cardNumber: '•••• •••• •••• 8890',
      expiryDate: '09/29',
      brand: 'visa',
      isDefault: false
    }
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = getItem<User | null>('auth_user', DEFAULT_USER);
    if (saved && (saved.name === 'Delisas Agency' || !saved.name)) {
      return { ...saved, name: 'Lucas Silva' };
    }
    return saved;
  });
  const [selectedAddress, setSelectedAddressState] = useState<Address | null>(() => {
    const savedUser = getItem<User | null>('auth_user', DEFAULT_USER);
    if (savedUser && savedUser.addresses.length > 0) {
      return savedUser.addresses.find(a => a.isDefault) || savedUser.addresses[0];
    }
    return mockAddresses[0];
  });

  useEffect(() => {
    if (user) {
      setItem('auth_user', user);
      if (!selectedAddress && user.addresses.length > 0) {
        setSelectedAddressState(user.addresses.find(a => a.isDefault) || user.addresses[0]);
      }
    } else {
      setItem('auth_user', null);
    }
  }, [user]);

  const login = async (email: string, _pass: string): Promise<boolean> => {
    // Simulated instant login
    const loggedUser: User = {
      ...DEFAULT_USER,
      email: email || 'cliente@delivery.com',
      name: email.split('@')[0] || 'Cliente VIP'
    };
    setUser(loggedUser);
    return true;
  };

  const register = async (name: string, email: string, phone: string, _pass: string): Promise<boolean> => {
    const newUser: User = {
      id: generateId('usr'),
      name: name || 'Novo Usuário',
      email: email,
      phone: phone,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      role: 'customer',
      addresses: mockAddresses,
      cards: []
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const quickDemoLogin = (role: 'customer' | 'admin' = 'customer') => {
    if (role === 'admin') {
      setUser({
        ...DEFAULT_USER,
        name: 'Administrador Whitelabel',
        email: 'admin@whitelabel.com',
        role: 'admin'
      });
    } else {
      setUser(DEFAULT_USER);
    }
  };

  const setSelectedAddress = (address: Address) => {
    setSelectedAddressState(address);
  };

  const addAddress = (newAddrData: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddress: Address = {
      ...newAddrData,
      id: generateId('addr')
    };

    const updatedAddresses = newAddress.isDefault
      ? user.addresses.map(a => ({ ...a, isDefault: false })).concat(newAddress)
      : [...user.addresses, newAddress];

    const updatedUser = { ...user, addresses: updatedAddresses };
    setUser(updatedUser);
    if (newAddress.isDefault || user.addresses.length === 0) {
      setSelectedAddressState(newAddress);
    }
  };

  const removeAddress = (addressId: string) => {
    if (!user) return;
    const updatedAddresses = user.addresses.filter(a => a.id !== addressId);
    const updatedUser = { ...user, addresses: updatedAddresses };
    setUser(updatedUser);
    if (selectedAddress?.id === addressId) {
      setSelectedAddressState(updatedAddresses[0] || null);
    }
  };

  const setDefaultAddress = (addressId: string) => {
    if (!user) return;
    const updatedAddresses = user.addresses.map(a => ({
      ...a,
      isDefault: a.id === addressId
    }));
    const target = updatedAddresses.find(a => a.id === addressId);
    const updatedUser = { ...user, addresses: updatedAddresses };
    setUser(updatedUser);
    if (target) {
      setSelectedAddressState(target);
    }
  };

  const addCard = (cardData: Omit<PaymentCard, 'id'>) => {
    if (!user) return;
    const newCard: PaymentCard = {
      ...cardData,
      id: generateId('card')
    };
    const updatedCards = newCard.isDefault
      ? user.cards.map(c => ({ ...c, isDefault: false })).concat(newCard)
      : [...user.cards, newCard];
    setUser({ ...user, cards: updatedCards });
  };

  const removeCard = (cardId: string) => {
    if (!user) return;
    const updatedCards = user.cards.filter(c => c.id !== cardId);
    setUser({ ...user, cards: updatedCards });
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updatedData });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        selectedAddress,
        login,
        register,
        logout,
        quickDemoLogin,
        setSelectedAddress,
        addAddress,
        removeAddress,
        setDefaultAddress,
        addCard,
        removeCard,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
