import React from 'react';
import { Package, Clock, Plus, Heart, Zap, Truck } from 'lucide-react';
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

  // Simulated installment calculation (like Mercado Livre "em 3x sem juros")
  const installmentValue = (product.basePrice / 3).toFixed(2);
  const originalPrice = (product.basePrice * 1.15).toFixed(2);

  return (
    <div
      className="product-card-item ml-style-card"
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

      {/* Product Image Box */}
      <div className="product-card-img-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-thumb"
          loading="lazy"
        />
        {/* ML Style Full Delivery Badge */}
        <span className="ml-full-badge" title="Envio mais rápido pelo centro de distribuição">
          <Zap size={10} fill="#00A650" color="#00A650" /> FULL
        </span>
      </div>

      {/* Product Header & Pricing */}
      <div className="product-card-header">
        <h3 className="product-card-title">{product.name}</h3>

        {/* Pricing Row with ML style discount */}
        <div className="ml-pricing-row">
          <span className="ml-original-price">R$ {originalPrice.replace('.', ',')}</span>
          <div className="ml-current-price-row">
            <span className="product-card-price">{formatCurrency(product.basePrice)}</span>
            <span className="ml-discount-tag">15% OFF</span>
          </div>
          <span className="ml-installments-text">
            em 3x de R$ {installmentValue.replace('.', ',')} sem juros
          </span>
        </div>

        {/* Free Shipping Tag */}
        <div className="ml-shipping-tag">
          <Truck size={12} />
          <span>Frete grátis</span>
        </div>
      </div>

      {/* Meta Row & Action Button */}
      <div className="product-card-meta-row">
        <div className="ml-card-bottom-info">
          <span className="meta-chip calories">
            <Package size={12} /> Cód. {product.calories}
          </span>
          <span className="ml-seller-tag">por Brago Distribuidora</span>
        </div>

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
  );
};
