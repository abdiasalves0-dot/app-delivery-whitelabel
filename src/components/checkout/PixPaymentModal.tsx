import React, { useState, useEffect } from 'react';
import { X, Copy, CheckCircle2, QrCode, Timer, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface PixPaymentModalProps {
  totalAmount: number;
  onConfirmPayment: () => void;
  onCancel: () => void;
}

export const PixPaymentModal: React.FC<PixPaymentModalProps> = ({
  totalAmount,
  onConfirmPayment,
  onCancel
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer
  const pixCopyPasteCode = `00020126580014br.gov.bcb.pix0136${Math.random().toString(36).substring(2, 15)}520400005303986540${totalAmount.toFixed(2)}5802BR5914DELISAS AGENCY6009SAO PAULO62070503***6304`;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(pixCopyPasteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-sheet-content" onClick={e => e.stopPropagation()}>
        <div className="modal-sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <QrCode size={20} color="var(--color-primary)" />
            <h3 className="modal-sheet-title">Pagamento via PIX</h3>
          </div>
          <button className="detail-icon-btn" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '10px 0' }}>
          {/* Total display */}
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Valor total a pagar</span>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 16px 0' }}>
            {formatCurrency(totalAmount)}
          </h2>

          {/* QR Code Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: '16px',
              borderRadius: 'var(--radius-lg)',
              border: '2px dashed var(--color-primary)',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '14px',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '160px',
                height: '160px',
                backgroundColor: '#0F172A',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                padding: '10px'
              }}
            >
              <QrCode size={110} color="#FFFFFF" strokeWidth={1.5} />
              <span style={{ fontSize: '10px', color: '#94A3B8', marginTop: '4px', fontWeight: 700 }}>
                PIX INSTANTÂNEO
              </span>
            </div>
          </div>

          {/* Expiration countdown */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontWeight: 600,
              marginBottom: '16px'
            }}
          >
            <Timer size={14} color="var(--color-primary)" />
            <span>Código expira em: <strong>{timeFormatted}</strong></span>
          </div>

          {/* Copy Paste Code Box */}
          <div
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-card-muted)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px',
              gap: '8px'
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'monospace',
                color: 'var(--text-secondary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'left'
              }}
            >
              {pixCopyPasteCode}
            </span>

            <button
              onClick={handleCopy}
              style={{
                backgroundColor: copied ? '#15803D' : 'var(--color-primary)',
                color: '#FFFFFF',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '11.5px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
                transition: 'var(--transition-fast)'
              }}
            >
              {copied ? <CheckCircle2 size={13} /> : <Copy size={13} />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '18px' }}>
            <ShieldCheck size={14} color="var(--color-primary)" />
            <span>Após o pagamento, a aprovação é imediata</span>
          </div>

          {/* Confirm Button */}
          <button
            className="btn-checkout-cta"
            onClick={onConfirmPayment}
          >
            <span>Já realizei o pagamento PIX</span>
          </button>
        </div>
      </div>
    </div>
  );
};
