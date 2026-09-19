import React, { useState } from 'react';
import {
  ArrowLeft, Heart, Share2, Star, Check, Trash2, Plus, Minus,
  CheckCircle2, Sparkles, Package, ShieldCheck, Building2, Tag, X,
  Truck, Zap, ChevronRight, Award, ThumbsUp, Clock, HelpCircle, MessageSquare
} from 'lucide-react';
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
  const [activeThumbIndex, setActiveThumbIndex] = useState<number>(0);
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [questionSent, setQuestionSent] = useState<boolean>(false);

  // Mock thumbnails for ML gallery
  const thumbnails = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

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
  const originalPrice = parseFloat((unitPrice * 1.16).toFixed(2));
  const pixPrice = parseFloat((unitPrice * 0.95).toFixed(2));
  const installmentsPrice = parseFloat((unitPrice / 3).toFixed(2));
  const totalPrice = parseFloat((unitPrice * quantity).toFixed(2));

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedIngredients, quantity, specialInstructions);
    if (onAddedToCartToast) {
      onAddedToCartToast();
    }
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedIngredients, quantity, specialInstructions);
    if (onAddedToCartToast) {
      onAddedToCartToast();
    }
    onClose();
    // Dispatch custom event to switch to cart/checkout
    window.dispatchEvent(new CustomEvent('nav:switch-tab', { detail: 'cart' }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Confira ${product.name} na Brago Distribuidora!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    setQuestionSent(true);
    setUserQuestion('');
    setTimeout(() => setQuestionSent(false), 4000);
  };

  return (
    <div className="modal-backdrop product-detail-backdrop" onClick={onClose}>
      <div
        className="product-detail-modal ml-pdp-modal"
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
      >
        {/* =================================================================
            MOBILE TOP NAV (< 1024px)
            ================================================================= */}
        <div className="detail-top-nav ml-mobile-only">
          <button
            className="detail-icon-btn"
            onClick={onClose}
            aria-label="Fechar"
            title="Fechar detalhes"
          >
            <X size={19} strokeWidth={2.2} />
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

        {/* =================================================================
            DESKTOP MERCADO LIVRE PDP TOP BREADCRUMBS (>= 1024px)
            ================================================================= */}
        <div className="ml-pdp-breadcrumbs-bar ml-desktop-only">
          <div className="ml-pdp-breadcrumbs-left">
            <button className="ml-pdp-back-btn" onClick={onClose}>
              <ArrowLeft size={16} />
              <span>Voltar à lista</span>
            </button>
            <span className="ml-pdp-crumb-divider">|</span>
            <span className="ml-pdp-crumb">Alimentos e Bebidas</span>
            <ChevronRight size={13} className="text-muted" />
            <span className="ml-pdp-crumb">Distribuidora</span>
            <ChevronRight size={13} className="text-muted" />
            <span className="ml-pdp-crumb active">{product.category.toUpperCase()}</span>
          </div>

          <div className="ml-pdp-breadcrumbs-right">
            <button className="ml-pdp-action-btn" onClick={handleShare}>
              {copiedShare ? <CheckCircle2 size={15} color="#22C55E" /> : <Share2 size={15} />}
              <span>{copiedShare ? 'Link copiado!' : 'Compartilhar'}</span>
            </button>

            <button
              className={`ml-pdp-action-btn ${favorited ? 'favorited' : ''}`}
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart size={15} fill={favorited ? '#3483FA' : 'none'} color={favorited ? '#3483FA' : 'currentColor'} />
              <span>{favorited ? 'Salvo nos favoritos' : 'Favoritar'}</span>
            </button>

            <button className="ml-pdp-close-desktop-btn" onClick={onClose} title="Fechar modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* =================================================================
            MAIN SCROLL CONTENT (RESPONSIVE: MOBILE STACK / DESKTOP 3-COL)
            ================================================================= */}
        <div className="detail-scroll-content">
          <div className="ml-pdp-3col-container">
            {/* -------------------------------------------------------------
                COLUNA 1 (ESQUERDA): GALERIA DE FOTOS (ESTILO MERCADO LIVRE)
                ------------------------------------------------------------- */}
            <div className="ml-pdp-col-gallery">
              {/* Miniaturas Verticais Desktop */}
              <div className="ml-gallery-thumbnails ml-desktop-only">
                {thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    className={`ml-gallery-thumb-btn ${activeThumbIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveThumbIndex(idx)}
                    onMouseEnter={() => setActiveThumbIndex(idx)}
                  >
                    <img src={thumb} alt={`Miniatura ${idx + 1}`} />
                  </button>
                ))}
              </div>

              {/* Foto Principal com Tag FULL */}
              <div className="ml-gallery-main-display">
                <span className="ml-pdp-full-badge">
                  <Zap size={11} fill="currentColor" />
                  <span>FULL</span>
                </span>

                <img
                  src={thumbnails[activeThumbIndex]}
                  alt={product.name}
                  className="ml-gallery-hero-image"
                />

                <div className="ml-gallery-trust-badges ml-desktop-only">
                  <div className="ml-trust-badge-item">
                    <ShieldCheck size={16} className="text-primary" />
                    <span><strong>Compra Garantida</strong>: receba o produto ou devolvemos seu dinheiro.</span>
                  </div>
                  <div className="ml-trust-badge-item">
                    <Truck size={16} className="text-primary" />
                    <span><strong>Devolução grátis</strong>: até 30 dias a partir da data de entrega.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                COLUNA 2 (CENTRO): ESPECIFICAÇÕES, DETALHES & REVIEWS
                ------------------------------------------------------------- */}
            <div className="ml-pdp-col-center">
              {/* Header do Produto: Condição e Vendas */}
              <div className="ml-pdp-meta-row">
                <span className="ml-pdp-condition">Novo</span>
                <span className="ml-pdp-bullet">•</span>
                <span className="ml-pdp-sold-count">+1.000 vendidos</span>
              </div>

              {/* Título Principal */}
              <h1 className="ml-pdp-title">{product.name}</h1>

              {/* Avaliação em Estrelas */}
              <div className="ml-pdp-rating-row">
                <div className="ml-pdp-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} size={14} fill="#3483FA" color="#3483FA" />
                  ))}
                </div>
                <span className="ml-pdp-rating-number">{product.rating}</span>
                <span className="ml-pdp-reviews-count">({product.reviewsCount} avaliações)</span>
              </div>

              {/* Bloco de Preços no Estilo Mercado Livre */}
              <div className="ml-pdp-pricing-box">
                <span className="ml-pdp-original-price">{formatCurrency(originalPrice)}</span>
                
                <div className="ml-pdp-current-price-row">
                  <span className="ml-pdp-currency-symbol">R$</span>
                  <span className="ml-pdp-price-amount">{unitPrice.toFixed(2).replace('.', ',')}</span>
                  <span className="ml-pdp-discount-pill">16% OFF</span>
                </div>

                <p className="ml-pdp-installments">
                  em <span className="text-success font-bold">3x de {formatCurrency(installmentsPrice)}</span> sem juros
                </p>

                <div className="ml-pdp-pix-tag">
                  <Zap size={14} className="text-success" />
                  <span>ou <strong>{formatCurrency(pixPrice)}</strong> no Pix (5% de desconto extra)</span>
                </div>
              </div>

              {/* Seletor de Tamanho / Fardo */}
              {product.sizes.length > 0 && (
                <div className="ml-pdp-options-section">
                  <span className="ml-pdp-section-label">Opção de Embalagem:</span>
                  <div className="ml-pdp-size-selector-grid">
                    {product.sizes.map(size => {
                      const isSelected = selectedSize.id === size.id;
                      return (
                        <button
                          key={size.id}
                          className={`ml-pdp-size-pill ${isSelected ? 'selected' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          <span className="ml-size-name">{size.name}</span>
                          <span className="ml-size-price">{formatCurrency(size.price)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Seletor de Adicionais & Acessórios */}
              {product.ingredients.length > 0 && (
                <div className="ml-pdp-options-section">
                  <span className="ml-pdp-section-label">Adicionais & Acessórios:</span>
                  <div className="ml-pdp-ingredients-grid">
                    {product.ingredients.map(ingredient => {
                      const isSelected = selectedIngredients.some(item => item.id === ingredient.id);
                      return (
                        <div
                          key={ingredient.id}
                          className={`ml-pdp-ingredient-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleIngredient(ingredient)}
                        >
                          <div className="ml-ingredient-check">
                            {isSelected && <Check size={13} strokeWidth={3} />}
                          </div>
                          <div className="ml-ingredient-text">
                            <span className="ml-ingredient-name">{ingredient.name}</span>
                            <span className="ml-ingredient-price">
                              {ingredient.price > 0 ? `+${formatCurrency(ingredient.price)}` : 'Incluso'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* "O que você precisa saber sobre este produto" (Exclusivo Mercado Livre) */}
              <div className="ml-pdp-highlights-box">
                <h3 className="ml-pdp-box-title">O que você precisa saber sobre este produto:</h3>
                <ul className="ml-pdp-bullet-list">
                  <li>Lote recente e lacrado direto da Brago Distribuidora Oficial.</li>
                  <li>Embalagem reforçada para transporte seguro, garantindo integridade total.</li>
                  <li>Produto com Nota Fiscal Eletrônica (NF-e) e procedência 100% garantida.</li>
                  <li>Ideal para abastecimento de adegas, bares, restaurantes, conveniências e eventos.</li>
                  <li>Validade estendida e armazenamento em temperatura controlada.</li>
                </ul>
              </div>

              {/* Tabela de Características Técnicas */}
              <div className="ml-pdp-specs-box">
                <h3 className="ml-pdp-box-title">Características principais</h3>
                <div className="ml-pdp-specs-table">
                  <div className="ml-spec-row">
                    <span className="ml-spec-name">Marca</span>
                    <span className="ml-spec-value">{product.restaurant}</span>
                  </div>
                  <div className="ml-spec-row">
                    <span className="ml-spec-name">Linha</span>
                    <span className="ml-spec-value">Distribuição Especial</span>
                  </div>
                  <div className="ml-spec-row">
                    <span className="ml-spec-name">Categoria</span>
                    <span className="ml-spec-value">{product.category.toUpperCase()}</span>
                  </div>
                  <div className="ml-spec-row">
                    <span className="ml-spec-name">Condição do item</span>
                    <span className="ml-spec-value">Novo e Lacrado</span>
                  </div>
                  <div className="ml-spec-row">
                    <span className="ml-spec-name">Formato de venda</span>
                    <span className="ml-spec-value">{selectedSize.name}</span>
                  </div>
                </div>
              </div>

              {/* Descrição Detalhada */}
              <div className="ml-pdp-description-box">
                <h3 className="ml-pdp-box-title">Descrição</h3>
                <p className="ml-pdp-description-text">
                  {product.description || 'Produto de alta qualidade selecionado especialmente para atender aos mais rigorosos padrões de exigência do mercado. Fornecido diretamente pelos canais oficiais da Brago Distribuidora com embalagem lacrada de fábrica, validade estendida e rastreamento completo até o seu endereço.'}
                </p>
              </div>

              {/* Perguntas e Respostas */}
              <div className="ml-pdp-qa-box">
                <h3 className="ml-pdp-box-title">Perguntas e respostas</h3>
                
                <form onSubmit={handleSendQuestion} className="ml-qa-form">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={e => setUserQuestion(e.target.value)}
                    placeholder="Escreva sua pergunta para a distribuidora..."
                    className="ml-qa-input"
                  />
                  <button type="submit" className="ml-qa-btn">Perguntar</button>
                </form>

                {questionSent && (
                  <div className="ml-qa-success-message">
                    <CheckCircle2 size={16} />
                    <span>Sua pergunta foi enviada! A equipe Brago responderá em instantes.</span>
                  </div>
                )}

                <div className="ml-qa-history">
                  <div className="ml-qa-item">
                    <p className="ml-qa-question">Boa tarde! O produto é original e acompanha nota fiscal?</p>
                    <p className="ml-qa-answer">
                      <span className="ml-qa-answer-tag">Resposta:</span> Olá! Sim, produto 100% original, lacrado de fábrica e com emissão de nota fiscal. Aguardamos sua compra!
                    </p>
                  </div>
                  <div className="ml-qa-item">
                    <p className="ml-qa-question">Qual o prazo de validade desse lote?</p>
                    <p className="ml-qa-answer">
                      <span className="ml-qa-answer-tag">Resposta:</span> Olá! Todos os nossos produtos possuem giro rápido e validade mínima de 6 a 12 meses.
                    </p>
                  </div>
                </div>
              </div>

              {/* Opiniões sobre o produto */}
              <div className="ml-pdp-reviews-box">
                <h3 className="ml-pdp-box-title">Opiniões sobre o produto</h3>
                
                <div className="ml-reviews-summary">
                  <div className="ml-reviews-score-col">
                    <span className="ml-score-large">{product.rating}</span>
                    <div className="ml-pdp-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} size={15} fill="#3483FA" color="#3483FA" />
                      ))}
                    </div>
                    <span className="ml-reviews-count-sub">{product.reviewsCount} avaliações</span>
                  </div>

                  <div className="ml-reviews-bars-col">
                    <div className="ml-bar-row">
                      <span>5 estrelas</span>
                      <div className="ml-bar-track"><div className="ml-bar-fill" style={{ width: '85%' }} /></div>
                      <span>85%</span>
                    </div>
                    <div className="ml-bar-row">
                      <span>4 estrelas</span>
                      <div className="ml-bar-track"><div className="ml-bar-fill" style={{ width: '10%' }} /></div>
                      <span>10%</span>
                    </div>
                    <div className="ml-bar-row">
                      <span>3 estrelas</span>
                      <div className="ml-bar-track"><div className="ml-bar-fill" style={{ width: '3%' }} /></div>
                      <span>3%</span>
                    </div>
                  </div>
                </div>

                <div className="ml-reviews-testimonials">
                  <div className="ml-testimonial-item">
                    <div className="ml-pdp-stars">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="#3483FA" color="#3483FA" />)}
                    </div>
                    <p className="ml-testimonial-text">"Excelente produto! Chegou muito rápido e muito bem embalado. A Brago sempre entrega no prazo."</p>
                    <span className="ml-testimonial-author">Carlos M. • Comprador verificado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                COLUNA 3 (DIREITA): BUY BOX FLUTUANTE (MERCADO LIVRE)
                ------------------------------------------------------------- */}
            <div className="ml-pdp-col-buybox">
              <div className="ml-buybox-card">
                {/* Previsão de Frete */}
                <div className="ml-buybox-shipping">
                  <div className="ml-shipping-headline">
                    <Truck size={18} className="text-success" />
                    <span className="ml-shipping-title">Chegará grátis amanhã</span>
                  </div>
                  <span className="ml-shipping-badge-full">
                    <Zap size={11} fill="currentColor" />
                    <span>FULL</span>
                  </span>
                  <p className="ml-shipping-address">
                    Enviar para <strong>Abdias - João Pessoa 58000-000</strong>
                  </p>
                </div>

                {/* Disponibilidade de Estoque */}
                <div className="ml-buybox-stock">
                  <span className="ml-stock-badge">Estoque disponível</span>
                  <span className="ml-stock-sub">Embalagem armazenada no centro de distribuição</span>
                </div>

                {/* Seletor de Quantidade */}
                <div className="ml-buybox-quantity-row">
                  <span className="ml-qty-label">Quantidade:</span>
                  <div className="ml-qty-stepper">
                    <button
                      className="ml-qty-btn"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      aria-label="Diminuir"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="ml-qty-number">{quantity}</span>
                    <button
                      className="ml-qty-btn"
                      onClick={() => setQuantity(prev => prev + 1)}
                      aria-label="Aumentar"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="ml-qty-available">(+50 disponíveis)</span>
                </div>

                {/* Botões de Ação Principais */}
                <div className="ml-buybox-actions">
                  <button
                    className="ml-btn-buy-now"
                    onClick={handleBuyNow}
                  >
                    Comprar agora
                  </button>

                  <button
                    className="ml-btn-add-cart"
                    onClick={handleAddToCart}
                  >
                    Adicionar ao carrinho
                  </button>
                </div>

                {/* Informações do Vendedor */}
                <div className="ml-seller-info-card">
                  <div className="ml-seller-header">
                    <Building2 size={16} className="text-muted" />
                    <div className="ml-seller-text">
                      <span className="ml-seller-label">Vendido por</span>
                      <strong className="ml-seller-name">{product.restaurant}</strong>
                    </div>
                  </div>

                  <div className="ml-seller-reputation-box">
                    <div className="ml-seller-badge-platinum">
                      <Award size={14} />
                      <span>MercadoLíder Platinum</span>
                    </div>
                    <p className="ml-seller-reputation-desc">É um dos melhores do site!</p>

                    {/* Termômetro de Reputação Verde */}
                    <div className="ml-reputation-thermometer">
                      <div className="ml-thermometer-step" />
                      <div className="ml-thermometer-step" />
                      <div className="ml-thermometer-step" />
                      <div className="ml-thermometer-step" />
                      <div className="ml-thermometer-step active" />
                    </div>

                    <div className="ml-seller-metrics-grid">
                      <div className="ml-metric-item">
                        <strong className="ml-metric-value">+10mil</strong>
                        <span className="ml-metric-sub">vendas nos últimos 60 dias</span>
                      </div>
                      <div className="ml-metric-item">
                        <ThumbsUp size={16} className="text-success" />
                        <span className="ml-metric-sub">Presta bom atendimento</span>
                      </div>
                      <div className="ml-metric-item">
                        <Clock size={16} className="text-success" />
                        <span className="ml-metric-sub">Entrega os produtos no prazo</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Garantias Oficiais */}
                <div className="ml-buybox-guarantees">
                  <div className="ml-guarantee-row">
                    <ShieldCheck size={16} className="text-muted" />
                    <p>
                      <strong>Compra Garantida</strong>: receba o produto que está esperando ou devolvemos o dinheiro.
                    </p>
                  </div>
                  <div className="ml-guarantee-row">
                    <Award size={16} className="text-muted" />
                    <p>
                      <strong>Garantia de 90 dias</strong> da distribuidora.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            STICKY BOTTOM ACTION BAR FOR MOBILE ONLY (< 1024px)
            ================================================================= */}
        <div className="detail-bottom-action-bar ml-mobile-only">
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

          <button
            className="btn-add-to-cart-cta"
            onClick={handleAddToCart}
            aria-label={`Adicionar ao carrinho total ${formatCurrency(totalPrice)}`}
          >
            <span>Adicionar ao Carrinho</span>
            <span>•</span>
            <span>{formatCurrency(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
