import React, { useState } from 'react';
import { Search, X, Package, Clock, Plus } from 'lucide-react';
import { Product } from '../../types/product';
import { mockProducts } from '../../data/mockProducts';
import { formatCurrency } from '../../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  if (!isOpen) return null;

  const filteredProducts = mockProducts.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) ||
                         p.restaurant.toLowerCase().includes(query.toLowerCase()) ||
                         p.description.toLowerCase().includes(query.toLowerCase());
    const matchesTag = selectedTag === 'all' || p.category === selectedTag;
    return matchesQuery && matchesTag;
  });

  const filterTags = [
    { id: 'all', label: 'Todos' },
    { id: 'embalagens', label: 'Embalagens' },
    { id: 'limpeza', label: 'Limpeza' },
    { id: 'panificacao', label: 'Panificação' },
    { id: 'descartaveis', label: 'Descartáveis' },
    { id: 'epi', label: 'EPIs & Luvas' }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-sheet-content"
        style={{ height: '90%', maxHeight: '90%' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--bg-input)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-full)',
                flex: 1,
                border: '1px solid var(--border-subtle)'
              }}
            >
              <Search size={18} color="var(--text-muted)" />
              <input
                type="text"
                autoFocus
                placeholder="Buscar pizzas, hambúrgueres, combos..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  width: '100%',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ color: 'var(--text-muted)' }}>
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <button className="detail-icon-btn" onClick={onClose} style={{ marginLeft: '10px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Quick Category Tags */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '6px 0 14px 0', scrollbarWidth: 'none' }}>
          {filterTags.map(tag => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                backgroundColor: selectedTag === tag.id ? 'var(--color-primary)' : 'var(--bg-card-muted)',
                color: selectedTag === tag.id ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                transition: 'var(--transition-fast)'
              }}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>Nenhum prato encontrado</p>
              <p style={{ fontSize: '12.5px' }}>Tente pesquisar com outro termo ou categoria.</p>
            </div>
          ) : (
            filteredProducts.map(prod => (
              <div
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--bg-card-muted)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--border-subtle)',
                      padding: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '6px' }}
                    />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {prod.name}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      <span>{prod.restaurant}</span>
                      <span>•</span>
                      <span style={{ color: 'var(--color-accent-amber)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Package size={12} /> Cód. {prod.calories}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {formatCurrency(prod.basePrice)}
                  </span>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-primary)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Plus size={16} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
