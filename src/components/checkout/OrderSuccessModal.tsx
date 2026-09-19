import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Navigation, ReceiptText, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Order } from '../../types/order';
import { formatCurrency } from '../../utils/formatters';

interface OrderSuccessModalProps {
  order: Order | null;
  onOpenTracking: () => void;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onOpenTracking,
  onClose
}) => {
  useEffect(() => {
    // Fire confetti cannon!
    if (order) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22C55E', '#16A34A', '#F59E0B', '#3B82F6', '#EC4899']
        });
      } catch (err) {
        console.warn('Confetti error:', err);
      }
    }
  }, [order]);

  if (!order) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-sheet-content"
        style={{ textAlign: 'center', padding: '24px 20px' }}
        onClick={e => e.stopPropagation()}
      >
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            boxShadow: '0 8px 20px rgba(34, 197, 94, 0.25)'
          }}
        >
          <CheckCircle2 size={38} strokeWidth={2.5} />
        </div>

        <span
          style={{
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary-active)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.5px'
          }}
        >
          PEDIDO RECEBIDO {order.orderNumber}
        </span>

        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '10px 0 6px 0' }}>
          Tudo certo! Seu pedido foi enviado para o restaurante
        </h2>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          O restaurante <strong>Pizza Italiano</strong> já está preparando sua refeição com muito carinho.
        </p>

        {/* Order Details Mini Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-card-muted)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px',
            border: '1px solid var(--border-subtle)',
            textAlign: 'left',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px' }}>
            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> Previsão de Entrega:
            </span>
            <strong style={{ color: 'var(--text-primary)' }}>{order.estimatedDeliveryTime}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px' }}>
            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} /> Endereço:
            </span>
            <strong style={{ color: 'var(--text-primary)' }}>{order.deliveryAddress.label}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px', borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Total Pago:</span>
            <strong style={{ color: 'var(--color-primary-active)', fontSize: '14px' }}>
              {formatCurrency(order.total)}
            </strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            className="btn-checkout-cta"
            onClick={() => {
              onClose();
              onOpenTracking();
            }}
          >
            <Navigation size={18} />
            <span>Acompanhar Pedido ao Vivo</span>
          </button>

          <button
            onClick={onClose}
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            Voltar para o Início
          </button>
        </div>
      </div>
    </div>
  );
};
