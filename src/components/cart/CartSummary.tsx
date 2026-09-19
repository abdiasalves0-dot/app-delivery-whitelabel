import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

export const CartSummary: React.FC = () => {
  const { totals, appliedCoupon } = useCart();

  return (
    <div className="cart-breakdown-card">
      <div className="breakdown-row">
        <span>Subtotal</span>
        <span>{formatCurrency(totals.subtotal)}</span>
      </div>

      {totals.discountAmount > 0 && (
        <div className="breakdown-row" style={{ color: 'var(--color-primary)' }}>
          <span>Desconto ({appliedCoupon?.code})</span>
          <span>-{formatCurrency(totals.discountAmount)}</span>
        </div>
      )}

      <div className="breakdown-row">
        <span>Delivery</span>
        <span>
          {totals.deliveryFee === 0 ? (
            <strong style={{ color: 'var(--color-primary)' }}>Grátis</strong>
          ) : (
            formatCurrency(totals.deliveryFee)
          )}
        </span>
      </div>

      {totals.tipAmount > 0 && (
        <div className="breakdown-row">
          <span>Gorjeta do Entregador</span>
          <span>{formatCurrency(totals.tipAmount)}</span>
        </div>
      )}

      <div className="breakdown-row total-row">
        <span>Total</span>
        <span>{formatCurrency(totals.total)}</span>
      </div>
    </div>
  );
};
