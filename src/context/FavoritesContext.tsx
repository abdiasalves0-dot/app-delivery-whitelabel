import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem } from '../utils/storage';

interface FavoritesContextType {
  favoriteIds: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Pre-favorite prod-1 and prod-2 to match the screenshot vibe
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getItem('fav_product_ids', ['prod-1']));

  useEffect(() => {
    setItem('fav_product_ids', favoriteIds);
  }, [favoriteIds]);

  const toggleFavorite = (productId: string) => {
    setFavoriteIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isFavorite = (productId: string): boolean => {
    return favoriteIds.includes(productId);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
