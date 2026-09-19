import React, { useState } from 'react';
import { Percent, Check, X, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CouponInputProps {
  onFeedback?: (success: boolean, message: string) => void;
}

export const CouponInput: React.FC<CouponInputProps> = ({ onFeedback }) => {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const result = applyCoupon(code);
    if (result.success) {
      setCode('');
      setErrorMsg('');
      if (onFeedback) onFeedback(true, result.message);
    } else {
      setErrorMsg(result.message);
      if (onFeedback) onFeedback(false, result.message);
    }
  };

  if (appliedCoupon) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--color-primary-light)',
          padding: '10px 16px',
          borderRadius: 'var(--radius-full)',
          marginBottom: '20px',
          border: '1px solid var(--color-primary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-active)' }}>
          <Tag size={16} />
          <span style={{ fontSize: '13px', fontWeight: 700 }}>
            {appliedCoupon.code} aplicado ({appliedCoupon.description})
          </span>
        </div>
        <button
          onClick={removeCoupon}
          style={{
            color: 'var(--color-accent-red)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px'
          }}
          title="Remover cupom"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <form className="promo-code-box" onSubmit={handleApply}>
        <Percent size={18} color="var(--text-muted)" />
        <input
          type="text"
          className="promo-code-input"
          placeholder="Promo code"
          value={code}
          onChange={e => {
            setCode(e.target.value.toUpperCase());
            setErrorMsg('');
          }}
        />
        <button type="submit" className="promo-apply-btn">
          Apply
        </button>
      </form>
      {errorMsg && (
        <span style={{ fontSize: '11.5px', color: 'var(--color-accent-red)', fontWeight: 600, paddingLeft: '14px' }}>
          {errorMsg}
        </span>
      )}
    </div>
  );
};
