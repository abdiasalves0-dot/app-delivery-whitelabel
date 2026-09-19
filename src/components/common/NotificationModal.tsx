import React from 'react';
import { X, Bell, Tag, Sparkles, Clock } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOffer?: (code: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onSelectOffer
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'Oferta Especial de Distribuição!',
      desc: 'Use o cupom PROMO30 e garanta 30% de desconto em todo o catálogo.',
      time: 'Há 10 minutos',
      code: 'PROMO30',
      icon: <Sparkles size={18} style={{ color: '#F59E0B' }} />
    },
    {
      id: 'notif-2',
      title: 'Frete Grátis Liberado!',
      desc: 'Pedidos acima de R$ 150 têm frete grátis com o cupom FRETEGRATIS.',
      time: 'Há 2 horas',
      code: 'FRETEGRATIS',
      icon: <Tag size={18} style={{ color: '#22C55E' }} />
    },
    {
      id: 'notif-3',
      title: 'Novo Prato no Cardápio!',
      desc: 'Experimente nosso Truffle Cream Fettuccine artesanal com queijo Grana Padano.',
      time: 'Ontem',
      icon: <Bell size={18} style={{ color: '#3B82F6' }} />
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet-content" onClick={e => e.stopPropagation()}>
        <div className="modal-sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} className="text-primary" />
            <h3 className="modal-sheet-title">Notificações</h3>
          </div>
          <button className="detail-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
          {notifications.map(notif => (
            <div
              key={notif.id}
              style={{
                backgroundColor: 'var(--bg-card-muted)',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                gap: '12px',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {notif.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {notif.title}
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={11} /> {notif.time}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.35, marginBottom: notif.code ? '8px' : '0' }}>
                  {notif.desc}
                </p>

                {notif.code && onSelectOffer && (
                  <button
                    onClick={() => {
                      onSelectOffer(notif.code);
                      onClose();
                    }}
                    style={{
                      backgroundColor: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Tag size={12} /> Copiar & Aplicar Cupom
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
