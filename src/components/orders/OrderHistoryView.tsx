import React from 'react';
import { ReceiptText, Repeat, Navigation, Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useCart } from '../../context/CartContext';
import { Order } from '../../types/order';
import { formatCurrency } from '../../utils/formatters';

interface OrderHistoryViewProps {
  onOpenTracking: (order: Order) => void;
  onExploreMenu: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
}

export const OrderHistoryView: React.FC<OrderHistoryViewProps> = ({
  onOpenTracking,
  onExploreMenu,
  onShowToast
}) => {
  const { orders } = useOrders();
  const { addToCart } = useCart();

  const handleReorder = (order: Order) => {
    order.items.forEach(it => {
      addToCart(it.product, it.size, it.selectedIngredients, it.quantity, it.specialInstructions);
    });
    onShowToast('success', `Itens do pedido ${order.orderNumber} adicionados ao carrinho!`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-active)', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={12} /> Entregue
          </span>
        );
      case 'cancelled':
        return (
          <span style={{ backgroundColor: '#FEF2F2', color: '#DC2626', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={12} /> Cancelado
          </span>
        );
      default:
        return (
          <span style={{ backgroundColor: '#FEF3C7', color: '#D97706', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} /> Em Andamento
          </span>
        );
    }
  };

  if (orders.length === 0) {
    return (
      <div className="cart-screen-container" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '450px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-card-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            marginBottom: '16px'
          }}
        >
          <ReceiptText size={38} />
        </div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
          Nenhum pedido realizado ainda
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '240px', marginBottom: '24px' }}>
          Faça seu primeiro pedido e acompanhe todo o trajeto em tempo real!
        </p>
        <button
          className="btn-checkout-cta"
          onClick={onExploreMenu}
          style={{ maxWidth: '220px' }}
        >
          <span>Fazer um Pedido</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '12px 20px 100px 20px' }}>
      <div style={{ marginBottom: '18px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
          Histórico de Pedidos
        </h1>
        <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
          Acompanhe pedidos ativos ou repita seus pratos favoritos
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {orders.map(order => (
          <div
            key={order.id}
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 16px',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {order.orderNumber}
              </span>
              {getStatusBadge(order.status)}
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
              {new Date(order.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })} • {order.items.length} itens
            </p>

            {/* List of items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px', borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px' }}>
              {order.items.map(it => (
                <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {it.quantity}x {it.product.name} ({it.size.label})
                  </span>
                  <strong style={{ color: 'var(--text-primary)' }}>
                    {formatCurrency(it.totalPrice)}
                  </strong>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', marginTop: '4px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total: </span>
                <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>
                  {formatCurrency(order.total)}
                </strong>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onOpenTracking(order)}
                  style={{
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Navigation size={13} />
                  <span>Rastrear</span>
                </button>

                <button
                  onClick={() => handleReorder(order)}
                  style={{
                    backgroundColor: 'var(--bg-card-muted)',
                    color: 'var(--text-primary)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <Repeat size={13} />
                  <span>Repetir</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
