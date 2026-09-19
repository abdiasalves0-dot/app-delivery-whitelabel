import React, { useState } from 'react';
import { ArrowLeft, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { CouponInput } from './CouponInput';
import { CartSummary } from './CartSummary';
import { formatCurrency } from '../../utils/formatters';

interface CartViewProps {
  onBack?: () => void;
  onProceedToCheckout: () => void;
  onExploreMenu: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  onBack,
  onProceedToCheckout,
  onExploreMenu,
  onShowToast
}) => {
  const { items, updateQuantity, removeFromCart, clearCart, totals } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClear = () => {
    clearCart();
    setShowClearConfirm(false);
    onShowToast('info', 'O carrinho foi esvaziado.');
  };

  if (items.length === 0) {
    return (
      <div className="cart-screen-container" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '450px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary)',
            marginBottom: '16px'
          }}
        >
          <ShoppingBag size={40} />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Seu carrinho está vazio
        </h2>
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '300px', marginBottom: '24px' }}>
          Explore o catálogo oficial da Brago Distribuidora e adicione os produtos desejados!
        </p>
        <button
          className="btn-checkout-cta"
          onClick={onExploreMenu}
          style={{ maxWidth: '240px' }}
        >
          <span>Explorar Catálogo</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="cart-screen-container">
      {/* Top Bar Header */}
      <div className="cart-top-bar">
        <button
          className="detail-icon-btn"
          onClick={onBack || onExploreMenu}
          aria-label="Voltar"
        >
          <ArrowLeft size={19} strokeWidth={2.2} />
        </button>

        <h1 className="cart-page-title">Carrinho de Compras</h1>

        <button
          className="detail-icon-btn"
          onClick={() => setShowClearConfirm(true)}
          aria-label="Limpar carrinho"
          title="Esvaziar carrinho"
        >
          <Trash2 size={19} strokeWidth={2.2} />
        </button>
      </div>

      {/* Confirmation Modal to Clear Cart */}
      {showClearConfirm && (
        <div className="modal-backdrop" onClick={() => setShowClearConfirm(false)}>
          <div className="modal-sheet-content" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Esvaziar Carrinho?
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Tem certeza que deseja remover todos os itens do seu pedido?
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowClearConfirm(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-card-muted)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '13px'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleClear}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-accent-red)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '13px'
                }}
              >
                Sim, Limpar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive 2-Column Desktop Grid */}
      <div className="cart-desktop-grid">
        {/* Left Column: Items List */}
        <div className="cart-left-col">
          <div className="cart-items-list">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Sticky Summary & Checkout */}
        <div className="cart-right-col">
          <div className="cart-summary-card">
            <h3 className="cart-summary-heading">Resumo do Pedido</h3>

            {/* Promo Code Input */}
            <CouponInput
              onFeedback={(success, msg) => {
                onShowToast(success ? 'success' : 'error', msg);
              }}
            />

            {/* Financial Breakdown */}
            <CartSummary />

            {/* Primary Checkout CTA */}
            <button
              className="btn-checkout-cta"
              onClick={onProceedToCheckout}
              aria-label={`Finalizar pedido valor ${formatCurrency(totals.total)}`}
            >
              <span>Finalizar Compra</span>
              <span>{formatCurrency(totals.total)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
