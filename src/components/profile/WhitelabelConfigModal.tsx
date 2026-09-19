import React, { useState } from 'react';
import { X, Palette, Check, Sparkles, Sliders, DollarSign, Store } from 'lucide-react';
import { useTheme, BrandColor } from '../../context/ThemeContext';

interface WhitelabelConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
}

const BRAND_PALETTES: { id: BrandColor; name: string; hex: string }[] = [
  { id: 'green', name: 'Verde Original (Delivery)', hex: '#22C55E' },
  { id: 'orange', name: 'Laranja Burger & Fast Food', hex: '#F97316' },
  { id: 'purple', name: 'Roxo Modern / Gourmet', hex: '#8B5CF6' },
  { id: 'blue', name: 'Azul Premium & Sushi', hex: '#0284C7' },
  { id: 'red', name: 'Vermelho Pizza & Carnes', hex: '#EF4444' }
];

export const WhitelabelConfigModal: React.FC<WhitelabelConfigModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const { config, updateConfig, brandColor, setBrandColor } = useTheme();

  const [appName, setAppName] = useState(config.appName);
  const [deliveryFee, setDeliveryFee] = useState(config.deliveryFee.toString());
  const [freeThreshold, setFreeThreshold] = useState(config.freeDeliveryThreshold.toString());

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      appName: appName || 'Delisas Agency',
      deliveryFee: parseFloat(deliveryFee) || 5.0,
      freeDeliveryThreshold: parseFloat(freeThreshold) || 35.0
    });
    onShowToast('success', 'Configurações da Marca Whitelabel salvas!');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-sheet-content"
        style={{ height: 'auto', maxHeight: '90%' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Palette size={20} color="var(--color-primary)" />
            <h3 className="modal-sheet-title">Personalização Whitelabel</h3>
          </div>
          <button className="detail-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* 1. Cores da Marca */}
          <div>
            <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', display: 'block' }}>
              Cor Primária da Marca
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
              {BRAND_PALETTES.map(palette => {
                const isSelected = brandColor === palette.id;
                return (
                  <button
                    type="button"
                    key={palette.id}
                    onClick={() => setBrandColor(palette.id)}
                    style={{
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: palette.hex,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      boxShadow: isSelected ? `0 0 0 3px #FFFFFF, 0 0 0 5px ${palette.hex}` : 'none',
                      transition: 'var(--transition-fast)'
                    }}
                    title={palette.name}
                  >
                    {isSelected && <Check size={20} strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Nome do Estabelecimento */}
          <div>
            <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', display: 'block' }}>
              Nome do Estabelecimento / App
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--bg-input)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <Store size={16} color="var(--text-muted)" />
              <input
                type="text"
                value={appName}
                onChange={e => setAppName(e.target.value)}
                placeholder="Ex: Delisas Agency, Bella Pizza..."
                style={{ background: 'transparent', width: '100%', fontSize: '13px', fontWeight: 600 }}
              />
            </div>
          </div>

          {/* 3. Taxas de Entrega */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', display: 'block' }}>
                Taxa de Entrega Padrão ($)
              </label>
              <input
                type="number"
                step="0.5"
                value={deliveryFee}
                onChange={e => setDeliveryFee(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-input)', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', display: 'block' }}>
                Frete Grátis acima de ($)
              </label>
              <input
                type="number"
                step="5"
                value={freeThreshold}
                onChange={e => setFreeThreshold(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-input)', fontSize: '13px' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-checkout-cta"
            style={{ marginTop: '10px' }}
          >
            <span>Salvar Personalização</span>
          </button>
        </form>
      </div>
    </div>
  );
};
