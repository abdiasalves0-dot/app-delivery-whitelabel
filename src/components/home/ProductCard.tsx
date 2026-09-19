import React from 'react';
import { Package, Clock, Plus, Heart } from 'lucide-react';
import { Product } from '../../types/product';
import { useFavorites } from '../../context/FavoritesContext';
import { formatCurrency } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onQuickAdd: (e: React.MouseEvent, product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  onQuickAdd
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <div
      className="product-card-item"
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes de ${product.name}`}
    >
      <button
        className={`product-fav-btn ${favorited ? 'active' : ''}`}
        onClick={handleFavorite}
        aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <Heart size={14} fill={favorited ? 'currentColor' : 'none'} />
      </button>

      <div className="product-card-img-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-thumb"
          loading="lazy"
        />
      </div>

      <div className="product-card-header">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-price">{formatCurrency(product.basePrice)}</p>
      </div>

      <div className="product-card-meta-row">
        <span className="meta-chip calories">
          <Package size={12} /> Cód. {product.calories}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span className="meta-chip">
            <Clock size={12} /> {product.prepTime}
          </span>
          <button
            className="product-add-btn"
            onClick={(e) => onQuickAdd(e, product)}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            title="Adicionar ao carrinho"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};
