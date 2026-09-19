import React from 'react';
import { User, MapPin, CreditCard, Bell, Moon, Sun, Palette, LogOut, ChevronRight, ShieldCheck, Heart, ReceiptText, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useOrders } from '../../context/OrderContext';
import { useFavorites } from '../../context/FavoritesContext';

interface ProfileViewProps {
  onOpenAddressManager: () => void;
  onOpenWhitelabel: () => void;
  onOpenOrders: () => void;
  onOpenFavorites: () => void;
  onOpenAuthModal: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onOpenAddressManager,
  onOpenWhitelabel,
  onOpenOrders,
  onOpenFavorites,
  onOpenAuthModal,
  onShowToast
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleDarkMode, config } = useTheme();
  const { orders } = useOrders();
  const { favoriteIds } = useFavorites();

  const handleLogout = () => {
    logout();
    onShowToast('info', 'Você saiu da sua conta.');
  };

  return (
    <div style={{ padding: '12px 20px 100px 20px' }}>
      <div style={{ marginBottom: '18px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
          Meu Perfil
        </h1>
        <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
          Gerencie sua conta e preferências do aplicativo
        </p>
      </div>

      {/* User Info Card */}
      {isAuthenticated && user ? (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '20px'
          }}
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {user.name}
              </h3>
              <span style={{ fontSize: '10px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-active)', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                {user.role === 'admin' ? 'ADMIN' : 'VIP'}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{user.email}</p>
            <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{user.phone}</p>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: 'var(--color-primary-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            marginBottom: '20px',
            textAlign: 'center',
            border: '1px solid var(--color-primary)'
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-primary-active)', marginBottom: '4px' }}>
            Acesse sua conta
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Faça login para salvar endereços e acompanhar pedidos
          </p>
          <button
            className="btn-checkout-cta"
            onClick={onOpenAuthModal}
            style={{ padding: '10px 20px', fontSize: '13px' }}
          >
            Entrar ou Cadastrar
          </button>
        </div>
      )}

      {/* Shortcuts grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <div
          onClick={onOpenOrders}
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <div style={{ backgroundColor: 'var(--bg-card-muted)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ReceiptText size={16} color="var(--color-primary)" />
          </div>
          <div>
            <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Pedidos</h4>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{orders.length} realizados</span>
          </div>
        </div>

        <div
          onClick={onOpenFavorites}
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <div style={{ backgroundColor: '#FEF2F2', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={16} color="var(--color-accent-red)" />
          </div>
          <div>
            <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>Favoritos</h4>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{favoriteIds.length} pratos</span>
          </div>
        </div>
      </div>

      {/* Settings list */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '20px'
        }}
      >
        <div
          onClick={onOpenAddressManager}
          style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={18} color="var(--color-primary)" />
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>Endereços de Entrega</span>
          </div>
          <ChevronRight size={16} color="var(--text-muted)" />
        </div>

        <div
          onClick={onOpenWhitelabel}
          style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Palette size={18} color="var(--color-primary)" />
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>Personalização Whitelabel</span>
          </div>
          <ChevronRight size={16} color="var(--text-muted)" />
        </div>

        <div
          onClick={toggleDarkMode}
          style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isDarkMode ? <Sun size={18} color="var(--color-star)" /> : <Moon size={18} color="var(--color-primary)" />}
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Modo Escuro (Dark Theme)
            </span>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
            {isDarkMode ? 'Ligado' : 'Desligado'}
          </span>
        </div>

        <div
          onClick={() => onShowToast('info', 'Suporte Delisas Delivery: atendimento 24 horas.')}
          style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HelpCircle size={18} color="var(--text-muted)" />
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>Ajuda & Suporte</span>
          </div>
          <ChevronRight size={16} color="var(--text-muted)" />
        </div>
      </div>

      {isAuthenticated && (
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#FEF2F2',
            color: 'var(--color-accent-red)',
            fontWeight: 700,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <LogOut size={16} />
          <span>Sair da Conta</span>
        </button>
      )}
    </div>
  );
};
