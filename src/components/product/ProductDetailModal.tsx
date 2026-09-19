import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Star, Check, Trash2, Plus, Minus, CheckCircle2, Sparkles, Package, ShieldCheck, Building2, Tag } from 'lucide-react';
import { Product, ProductIngredient, ProductSizeOption } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { formatCurrency } from '../../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddedToCartToast?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddedToCartToast
}) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  // Default to the medium or first size
  const defaultSize = product.sizes.find(s => s.isDefault) || product.sizes[0];
  const [selectedSize, setSelectedSize] = useState<ProductSizeOption>(defaultSize);

  // Default checked ingredients
  const [selectedIngredients, setSelectedIngredients] = useState<ProductIngredient[]>(() =>
    product.ingredients.filter(ing => ing.isDefaultChecked)
  );

  const [quantity, setQuantity] = useState<number>(1);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const toggleIngredient = (ingredient: ProductIngredient) => {
    setSelectedIngredients(prev => {
      const exists = prev.some(item => item.id === ingredient.id);
      if (exists) {
        return prev.filter(item => item.id !== ingredient.id);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  // Real-time calculated unit price
  const ingredientsTotal = selectedIngredients.reduce((sum, item) => sum + item.price, 0);
  const unitPrice = parseFloat((selectedSize.price + ingredientsTotal).toFixed(2));
  const totalPrice = parseFloat((unitPrice * quantity).toFixed(2));

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedIngredients, quantity, specialInstructions);
    if (onAddedToCartToast) {
      onAddedToCartToast();
    }
    onClose();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Olhe essa deliciosa ${product.name} no ${product.restaurant}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="product-detail-modal" role="dialog" aria-modal="true">
      {/* Top Bar Navigation */}
      <div className="detail-top-nav">
        <button
          className="detail-icon-btn"
          onClick={onClose}
          aria-label="Voltar"
          title="Voltar ao início"
        >
          <ArrowLeft size={19} strokeWidth={2.2} />
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className={`detail-icon-btn ${favorited ? 'favorited' : ''}`}
            onClick={() => toggleFavorite(product.id)}
            aria-label={favorited ? 'Remover dos favoritos' : 'Favoritar produto'}
          >
            <Heart size={19} fill={favorited ? 'currentColor' : 'none'} />
          </button>

          <button
            className="detail-icon-btn"
            onClick={handleShare}
            aria-label="Compartilhar produto"
            title="Compartilhar"
          >
            {copiedShare ? <CheckCircle2 size={18} color="#22C55E" /> : <Share2 size={19} strokeWidth={2.2} />}
          </button>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="detail-scroll-content">
        {/* Hero Section */}
        <div className="detail-hero-section">
          <div className="detail-hero-img-box">
            <span className="floating-basil basil-1"><Sparkles size={18} color="var(--color-primary)" /></span>
            <span className="floating-basil basil-2"><Package size={18} color="var(--color-primary)" /></span>
            <span className="floating-basil basil-3"><ShieldCheck size={18} color="var(--color-primary)" /></span>
            
            <img
              src={product.image}
              alt={product.name}
              className="detail-hero-img"
            />
          </div>
        </div>

        {/* Title & Restaurant Meta */}
        <div className="detail-title-section">
          <h1 className="detail-dish-title">{product.name}</h1>
          
          <div className="detail-dish-meta">
            <div className="detail-restaurant-tag">
              <Building2 size={14} className="text-muted" />
              <span>{product.restaurant}</span>
            </div>

            <span>•</span>

            <div className="detail-rating-pill">
              <Star size={14} fill="#FBBF24" color="#FBBF24" />
              <span>{product.rating} ({product.reviewsCount}) &gt;</span>
            </div>
          </div>
        </div>

        {/* Size Selection Radio Cards */}
        {product.sizes.length > 0 && (
          <div className="size-selector-grid">
            {product.sizes.map(size => {
              const isSelected = selectedSize.id === size.id;
              return (
                <div
                  key={size.id}
                  className={`size-option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <div className="size-radio-circle">
                    {isSelected && <div className="size-radio-dot" />}
                  </div>
                  <span className="size-name-label">{size.name}</span>
                  <span className="size-price-label">{formatCurrency(size.price)}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Add Ingredients Section */}
        {product.ingredients.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 className="ingredients-section-title">Adicionais & Acessórios</h2>
            
            <div className="ingredients-list">
              {product.ingredients.map(ingredient => {
                const isSelected = selectedIngredients.some(item => item.id === ingredient.id);
                return (
                  <div
                    key={ingredient.id}
                    className={`ingredient-item-row ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleIngredient(ingredient)}
                  >
                    <div className="ingredient-left">
                      <span className="ingredient-icon">
                        <Tag size={18} color="var(--color-primary)" />
                      </span>
                      <div className="ingredient-info">
                        <span className="ingredient-name">{ingredient.name}</span>
                        <span className="ingredient-portion">
                          {ingredient.portion} {ingredient.price > 0 ? `+$${ingredient.price.toFixed(2)}` : 'Grátis'}
                        </span>
                      </div>
                    </div>

                    <div className="custom-checkbox">
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Special Instructions Notes */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Observações para a Cozinha
          </h3>
          <textarea
            value={specialInstructions}
            onChange={e => setSpecialInstructions(e.target.value)}
            placeholder="Ex: Tirar a cebola, massa bem crocante, ponto da carne..."
            style={{
              width: '100%',
              minHeight: '70px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              fontSize: '12.5px',
              color: 'var(--text-primary)',
              resize: 'none'
            }}
          />
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="detail-bottom-action-bar">
        {/* Quantity Stepper */}
        <div className="quantity-stepper-box">
          <button
            className="stepper-btn"
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            aria-label="Diminuir quantidade"
          >
            {quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
          </button>
          
          <span className="stepper-value">{quantity}</span>

          <button
            className="stepper-btn"
            onClick={() => setQuantity(prev => prev + 1)}
            aria-label="Aumentar quantidade"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Add to Cart CTA */}
        <button
          className="btn-add-to-cart-cta"
          onClick={handleAddToCart}
          aria-label={`Adicionar ao carrinho total ${formatCurrency(totalPrice)}`}
        >
          <span>Add to Cart</span>
          <span>•</span>
          <span>{formatCurrency(totalPrice)}</span>
        </button>
      </div>
    </div>
  );
};
