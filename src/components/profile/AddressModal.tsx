import React, { useState } from 'react';
import { X, MapPin, Plus, Trash2, CheckCircle2, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Address } from '../../types/user';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const { user, selectedAddress, setSelectedAddress, addAddress, removeAddress, setDefaultAddress } = useAuth();
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New address form fields
  const [label, setLabel] = useState('Casa');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('São Paulo');
  const [state, setState] = useState('SP');
  const [zipCode, setZipCode] = useState('');

  if (!isOpen) return null;

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street || !number || !neighborhood) {
      onShowToast('error', 'Preencha a rua, número e bairro.');
      return;
    }

    addAddress({
      label,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      isDefault: false
    });

    onShowToast('success', 'Novo endereço cadastrado com sucesso!');
    setIsAddingNew(false);
    // Reset
    setStreet('');
    setNumber('');
    setComplement('');
    setNeighborhood('');
  };

  const addresses = user?.addresses || [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-sheet-content"
        style={{ height: '88%', maxHeight: '88%' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} color="var(--color-primary)" />
            <h3 className="modal-sheet-title">Meus Endereços</h3>
          </div>
          <button className="detail-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {!isAddingNew ? (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {addresses.map(addr => {
                const isSelected = selectedAddress?.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => {
                      setSelectedAddress(addr);
                      setDefaultAddress(addr.id);
                      onShowToast('info', `Endereço "${addr.label}" selecionado!`);
                    }}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-card-muted)',
                      border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--bg-card)',
                          color: isSelected ? 'var(--color-primary)' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <MapPin size={18} />
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {addr.label}
                          </h4>
                          {addr.isDefault && (
                            <span style={{ fontSize: '10px', backgroundColor: 'var(--color-primary)', color: '#FFF', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                              Principal
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {addr.street}, {addr.number} {addr.complement && `- ${addr.complement}`}
                        </p>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {addr.neighborhood} - {addr.city}/{addr.state}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {isSelected ? (
                        <CheckCircle2 size={18} color="var(--color-primary)" />
                      ) : (
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            removeAddress(addr.id);
                            onShowToast('info', 'Endereço removido.');
                          }}
                          style={{ color: 'var(--text-muted)', padding: '6px' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setIsAddingNew(true)}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px dashed var(--color-primary)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary-active)',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Adicionar Novo Endereço</span>
            </button>
          </div>
        ) : (
          /* Add Address Form */
          <form onSubmit={handleCreateAddress} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Identificador</label>
              <input
                type="text"
                placeholder="Ex: Casa, Trabalho, Namorada"
                value={label}
                onChange={e => setLabel(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', backgroundColor: 'var(--bg-input)', fontSize: '13px', marginTop: '4px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Rua / Avenida</label>
                <input
                  type="text"
                  placeholder="Nome da rua"
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', backgroundColor: 'var(--bg-input)', fontSize: '13px', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Número</label>
                <input
                  type="text"
                  placeholder="123"
                  value={number}
                  onChange={e => setNumber(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', backgroundColor: 'var(--bg-input)', fontSize: '13px', marginTop: '4px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Bairro</label>
                <input
                  type="text"
                  placeholder="Bairro"
                  value={neighborhood}
                  onChange={e => setNeighborhood(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', backgroundColor: 'var(--bg-input)', fontSize: '13px', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Complemento</label>
                <input
                  type="text"
                  placeholder="Apto, Bloco..."
                  value={complement}
                  onChange={e => setComplement(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', backgroundColor: 'var(--bg-input)', fontSize: '13px', marginTop: '4px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-card-muted)', color: 'var(--text-primary)', fontWeight: 700, fontSize: '13px' }}
              >
                Voltar
              </button>
              <button
                type="submit"
                style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-primary)', color: '#FFF', fontWeight: 700, fontSize: '13px' }}
              >
                Salvar Endereço
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
