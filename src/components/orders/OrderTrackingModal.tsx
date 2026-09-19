import React, { useState, useEffect } from 'react';
import { X, Phone, MessageSquare, MapPin, Store, Check, Clock, ChevronDown, ChevronUp, Star, Navigation, Truck } from 'lucide-react';
import { Order, OrderStatus } from '../../types/order';
import { formatCurrency } from '../../utils/formatters';

interface OrderTrackingModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (type: 'success' | 'error' | 'info', text: string) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  order,
  isOpen,
  onClose,
  onShowToast
}) => {
  const [showItems, setShowItems] = useState(false);
  const [riderProgress, setRiderProgress] = useState(30); // 0 to 100 on map route

  // Animated rider movement on the map
  useEffect(() => {
    if (!isOpen || !order || order.status === 'delivered') return;

    const interval = setInterval(() => {
      setRiderProgress(prev => (prev < 90 ? prev + 3 : 90));
    }, 1500);

    return () => clearInterval(interval);
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const getStatusHeadline = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 'Aguardando confirmação do restaurante...';
      case 'confirmed':
        return 'Restaurante confirmou seu pedido!';
      case 'preparing':
        return 'O pedido está sendo separado e embalado';
      case 'on_the_way':
        return 'O entregador está a caminho da sua entrega';
      case 'delivered':
        return 'Pedido entregue com sucesso!';
      default:
        return 'Acompanhando seu pedido';
    }
  };

  const isDelivered = order.status === 'delivered';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-sheet-content"
        style={{ height: '94%', maxHeight: '94%', display: 'flex', flexDirection: 'column' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="modal-sheet-header">
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>RASTREAMENTO AO VIVO</span>
            <h3 className="modal-sheet-title">{order.orderNumber}</h3>
          </div>
          <button className="detail-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '20px' }}>
          {/* Simulated Animated GPS Map */}
          <div
            className="tracking-map-box"
            style={{
              background: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {/* Map Grid and streets visualization */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)',
                backgroundSize: '16px 16px',
                opacity: 0.4
              }}
            />

            {/* Route line */}
            <svg
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              viewBox="0 0 300 150"
            >
              <path
                d="M 40 110 Q 120 40 260 50"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="4"
                strokeDasharray="6,4"
              />
            </svg>

            {/* Restaurant Pin */}
            <div
              style={{
                position: 'absolute',
                left: '28px',
                top: '95px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  backgroundColor: '#1E293B',
                  color: '#FFFFFF',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}
              >
                <Store size={14} />
              </div>
              <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '1px 4px', borderRadius: '4px' }}>
                Restaurante
              </span>
            </div>

            {/* Moving Motoboy Marker */}
            <div
              style={{
                position: 'absolute',
                left: `${20 + (riderProgress * 2.2)}px`,
                top: `${95 - (riderProgress * 0.55)}px`,
                transition: 'all 1s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 10
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 16px var(--color-primary)',
                  fontSize: '16px'
                }}
              >
                <Truck size={17} color="#FFFFFF" strokeWidth={2.2} />
              </div>
              <span style={{ fontSize: '9px', fontWeight: 800, color: '#FFFFFF', backgroundColor: 'var(--color-primary-active)', padding: '1px 5px', borderRadius: '10px' }}>
                Carlos (A Caminho)
              </span>
            </div>

            {/* Customer Home Pin */}
            <div
              style={{
                position: 'absolute',
                right: '25px',
                top: '35px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(239,68,68,0.3)'
                }}
              >
                <MapPin size={14} />
              </div>
              <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '1px 4px', borderRadius: '4px' }}>
                Você ({order.deliveryAddress.label})
              </span>
            </div>
          </div>

          {/* Status Headline Card */}
          <div
            style={{
              backgroundColor: isDelivered ? 'var(--color-primary-light)' : 'var(--bg-card-muted)',
              border: `1px solid ${isDelivered ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '14px 16px',
              marginBottom: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 600 }}>Previsão Estimada</span>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-primary-active)' }}>
                {isDelivered ? 'Entregue com Sucesso!' : order.estimatedDeliveryTime}
              </span>
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {getStatusHeadline(order.status)}
            </h4>
          </div>

          {/* Driver Info Card */}
          {order.driver && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-card)',
                padding: '12px 14px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={order.driver.photoUrl}
                  alt={order.driver.name}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {order.driver.name}
                  </h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {order.driver.vehicle} • {order.driver.plate}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: 'var(--color-star)', fontWeight: 700, marginTop: '2px' }}>
                    <Star size={11} fill="currentColor" /> {order.driver.rating}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onShowToast?.('info', `Ligando para ${order.driver?.name}...`)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Ligar para o entregador"
                >
                  <Phone size={16} />
                </button>

                <button
                  onClick={() => onShowToast?.('info', `Abrindo chat com ${order.driver?.name}...`)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-card-muted)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-subtle)'
                  }}
                  title="Mensagem para o entregador"
                >
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Stepper Steps List */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
              Etapas do Pedido
            </h4>

            <div className="tracking-stepper">
              {order.trackingSteps.map((step, idx) => (
                <div key={idx} className="stepper-item">
                  <div className={`stepper-dot ${step.isCompleted ? 'completed' : ''}`}>
                    {step.isCompleted ? <Check size={13} strokeWidth={3} /> : idx + 1}
                  </div>
                  <div className="stepper-text">
                    <span className="stepper-label">{step.label}</span>
                    <span className="stepper-sub">{step.time !== '--:--' ? step.time : 'Pendente'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order items dropdown */}
          <div
            style={{
              backgroundColor: 'var(--bg-card-muted)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div
              onClick={() => setShowItems(!showItems)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Ver itens do pedido ({order.items.length})
              </span>
              {showItems ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {showItems && (
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px' }}>
                {order.items.map(it => (
                  <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <span>{it.quantity}x {it.product.name} ({it.size.label})</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{formatCurrency(it.totalPrice)}</strong>
                  </div>
                ))}

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', paddingTop: '6px', borderTop: '1px solid var(--border-subtle)' }}>
                  <span>Total Geral</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
