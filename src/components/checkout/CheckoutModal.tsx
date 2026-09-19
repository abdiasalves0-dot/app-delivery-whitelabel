import React, { useState } from 'react';
import { X, MapPin, Clock, CreditCard, Banknote, ShieldCheck, Check, Sparkles, ChevronRight, ArrowRight, Smartphone, Zap, Calendar, QrCode, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { PaymentMethodType } from '../../types/order';
import { formatCurrency } from '../../utils/formatters';
import { PixPaymentModal } from './PixPaymentModal';
import { OrderSuccessModal } from './OrderSuccessModal';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLiveTracking: () => void;
  onOpenAddressManager: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOpenLiveTracking,
  onOpenAddressManager
}) => {
  const { items, totals, tipPercent, setTipPercent, clearCart } = useCart();
  const { user, selectedAddress } = useAuth();
  const { createOrder } = useOrders();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('pix');
  const [deliverySchedule, setDeliverySchedule] = useState<'express' | 'scheduled'>('express');
  const [cashChange, setCashChange] = useState<string>('');
  
  // Credit card inputs
  const [cardHolder, setCardHolder] = useState(user?.cards[0]?.cardHolder || 'CLIENTE VIP');
  const [cardNumber, setCardNumber] = useState('4532 8900 1234 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  // Sub-modals
  const [showPixModal, setShowPixModal] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const tipOptions = [0, 10, 15, 20];

  const handleFinalize = () => {
    if (!selectedAddress) {
      alert('Por favor, selecione um endereço para entrega.');
      return;
    }

    if (paymentMethod === 'pix') {
      setShowPixModal(true);
      return;
    }

    processOrderCreation();
  };

  const processOrderCreation = () => {
    setIsProcessing(true);

    setTimeout(() => {
      if (!selectedAddress) return;

      const order = createOrder({
        items,
        subtotal: totals.subtotal,
        discountAmount: totals.discountAmount,
        deliveryFee: totals.deliveryFee,
        tipAmount: totals.tipAmount,
        total: totals.total,
        deliveryAddress: selectedAddress,
        paymentMethod,
        paymentDetails: {
          cardLastDigits: paymentMethod === 'credit_card' ? cardNumber.slice(-4) : undefined,
          cashChangeFor: paymentMethod === 'cash' && cashChange ? parseFloat(cashChange) : undefined
        }
      });

      setIsProcessing(false);
      clearCart();
      setShowPixModal(false);
      setCreatedOrder(order);
    }, 1200);
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div
          className="modal-sheet-content"
          style={{ height: '92%', maxHeight: '92%' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-sheet-header">
            <h3 className="modal-sheet-title">Finalizar Pedido</h3>
            <button className="detail-icon-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '30px' }}>
            {/* 1. Endereço de Entrega */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={15} color="var(--color-primary)" /> Endereço de Entrega
                </span>
                <button
                  onClick={onOpenAddressManager}
                  style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)' }}
                >
                  Alterar
                </button>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--bg-card-muted)',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {selectedAddress?.label || 'Endereço Principal'}
                  </h4>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.number} - ${selectedAddress.neighborhood}` : 'Nenhum endereço selecionado'}
                  </p>
                </div>
                <ChevronRight size={16} color="var(--text-muted)" />
              </div>
            </div>

            {/* 2. Tipo de Entrega */}
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Clock size={15} color="var(--color-primary)" /> Previsão de Entrega
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div
                  onClick={() => setDeliverySchedule('express')}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${deliverySchedule === 'express' ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: 'var(--bg-card)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Zap size={13} color="var(--color-primary)" /> Expressa
                    </span>
                    {deliverySchedule === 'express' && <Check size={14} color="var(--color-primary)" strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>20-30 minutos</span>
                </div>

                <div
                  onClick={() => setDeliverySchedule('scheduled')}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${deliverySchedule === 'scheduled' ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: 'var(--bg-card)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} color="var(--color-primary)" /> Agendada
                    </span>
                    {deliverySchedule === 'scheduled' && <Check size={14} color="var(--color-primary)" strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Hoje às 19:30</span>
                </div>
              </div>
            </div>

            {/* 3. Forma de Pagamento */}
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <CreditCard size={15} color="var(--color-primary)" /> Forma de Pagamento
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* PIX */}
                <div
                  onClick={() => setPaymentMethod('pix')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${paymentMethod === 'pix' ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: 'var(--bg-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <QrCode size={19} color="var(--color-primary)" />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>PIX Instantâneo</span>
                        <span style={{ fontSize: '10px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-active)', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>Aprovação Imediata</span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>QR Code & Chave Copia e Cola</span>
                    </div>
                  </div>
                  {paymentMethod === 'pix' && <Check size={16} color="var(--color-primary)" strokeWidth={3} />}
                </div>

                {/* Cartão de Crédito */}
                <div
                  onClick={() => setPaymentMethod('credit_card')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${paymentMethod === 'credit_card' ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: 'var(--bg-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CreditCard size={18} color="var(--color-primary)" />
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Cartão de Crédito</span>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Mastercard final 4242</p>
                    </div>
                  </div>
                  {paymentMethod === 'credit_card' && <Check size={16} color="var(--color-primary)" strokeWidth={3} />}
                </div>

                {/* Dinheiro */}
                <div
                  onClick={() => setPaymentMethod('cash')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${paymentMethod === 'cash' ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: 'var(--bg-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Banknote size={18} color="#15803D" />
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Dinheiro na Entrega</span>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pague ao entregador</p>
                    </div>
                  </div>
                  {paymentMethod === 'cash' && <Check size={16} color="var(--color-primary)" strokeWidth={3} />}
                </div>

                {/* Apple Pay / Google Pay */}
                <div
                  onClick={() => setPaymentMethod('apple_pay')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${paymentMethod === 'apple_pay' ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: 'var(--bg-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Smartphone size={18} color="var(--text-primary)" />
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Apple Pay / Google Pay</span>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>1-Click Biometria</p>
                    </div>
                  </div>
                  {paymentMethod === 'apple_pay' && <Check size={16} color="var(--color-primary)" strokeWidth={3} />}
                </div>
              </div>

              {/* Cash change field */}
              {paymentMethod === 'cash' && (
                <div style={{ marginTop: '10px', padding: '10px 14px', backgroundColor: 'var(--bg-card-muted)', borderRadius: 'var(--radius-md)' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                    Precisa de troco para quanto?
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 50.00 (deixe em branco se não precisar)"
                    value={cashChange}
                    onChange={e => setCashChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '13px'
                    }}
                  />
                </div>
              )}
            </div>

            {/* 4. Gorjeta do Entregador */}
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Truck size={15} color="var(--color-primary)" /> Gorjeta para o Entregador
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                {tipOptions.map(percent => (
                  <button
                    key={percent}
                    onClick={() => setTipPercent(percent)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${tipPercent === percent ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                      backgroundColor: tipPercent === percent ? 'var(--color-primary-light)' : 'var(--bg-card)',
                      color: tipPercent === percent ? 'var(--color-primary-active)' : 'var(--text-secondary)',
                      fontWeight: 700,
                      fontSize: '12px'
                    }}
                  >
                    {percent === 0 ? 'Sem gorjeta' : `${percent}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Total final */}
            <div style={{ padding: '14px', backgroundColor: 'var(--bg-card-muted)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total a Pagar</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {formatCurrency(totals.total)}
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                <ShieldCheck size={14} color="var(--color-primary)" /> Pagamento Seguro
              </div>
            </div>

            {/* Finalize Button */}
            <button
              className="btn-checkout-cta"
              onClick={handleFinalize}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span>Processando Pedido...</span>
              ) : (
                <>
                  <span>Confirmar e Pagar {formatCurrency(totals.total)}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Pix Modal */}
      {showPixModal && (
        <PixPaymentModal
          totalAmount={totals.total}
          onConfirmPayment={processOrderCreation}
          onCancel={() => setShowPixModal(false)}
        />
      )}

      {/* Success Modal with Confetti */}
      {createdOrder && (
        <OrderSuccessModal
          order={createdOrder}
          onOpenTracking={() => {
            setCreatedOrder(null);
            onClose();
            onOpenLiveTracking();
          }}
          onClose={() => {
            setCreatedOrder(null);
            onClose();
          }}
        />
      )}
    </>
  );
};
