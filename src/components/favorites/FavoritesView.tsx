import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { mockProducts } from '../../data/mockProducts';
import { ProductCard } from '../home/ProductCard';
import { Product } from '../../types/product';

interface FavoritesViewProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (e: React.MouseEvent, product: Product) => void;
  onExploreMenu: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  onSelectProduct,
  onQuickAdd,
  onExploreMenu
}) => {
  const { favoriteIds } = useFavorites();
  const favoritedProducts = mockProducts.filter(p => favoriteIds.includes(p.id));

  if (favoritedProducts.length === 0) {
    return (
      <div className="cart-screen-container" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '450px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#FEF2F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-accent-red)',
            marginBottom: '16px'
          }}
        >
          <Heart size={38} />
        </div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
          Sua lista de favoritos está vazia
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '240px', marginBottom: '24px' }}>
          Salve os pratos que você mais ama clicando no ícone de coração!
        </p>
        <button
          className="btn-checkout-cta"
          onClick={onExploreMenu}
          style={{ maxWidth: '220px' }}
        >
          <span>Ver Cardápio</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '12px 20px 100px 20px' }}>
      <div style={{ marginBottom: '18px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
          Meus Pratos Favoritos
        </h1>
        <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
          {favoritedProducts.length} itens salvos no seu perfil
        </p>
      </div>

      <div className="products-grid-layout" style={{ padding: 0 }}>
        {favoritedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onSelectProduct}
            onQuickAdd={onQuickAdd}
          />
        ))}
      </div>
    </div>
  );
};
