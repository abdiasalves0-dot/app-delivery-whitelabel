import React from 'react';
import { Search, Bell, ChevronDown, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenAddressSelector: () => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenNotifications,
  onOpenAddressSelector,
  unreadNotificationsCount = 2
}) => {
  const { user, selectedAddress } = useAuth();
  const { config } = useTheme();

  return (
    <header className="app-header">
      <div
        className="header-greeting"
        onClick={onOpenAddressSelector}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenAddressSelector();
          }
        }}
        role="button"
        tabIndex={0}
        title="Clique para gerenciar ou selecionar seus endereços de entrega"
      >
        <span className="greeting-sub">
          Olá
        </span>
        <h1 className="greeting-title">
          {user?.name || 'Cliente'}
        </h1>
        <div className="header-location-row">
          <MapPin size={12} className="location-pin-icon" />
          <span className="location-address-text">
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.number}${selectedAddress.neighborhood ? ` - ${selectedAddress.neighborhood}` : ''}`
              : 'Selecione um endereço de entrega'}
          </span>
          <ChevronDown size={13} className="location-chevron-icon" />
        </div>
      </div>

      <div className="header-actions">
        <button
          className="header-circle-btn"
          onClick={onOpenSearch}
          aria-label="Buscar produtos"
          title="Buscar no cardápio"
        >
          <Search size={19} strokeWidth={2.2} />
        </button>

        <button
          className="header-circle-btn"
          onClick={onOpenNotifications}
          aria-label="Notificações"
          title="Avisos e promoções"
        >
          <Bell size={19} strokeWidth={2.2} />
          {unreadNotificationsCount > 0 && <span className="badge-dot" />}
        </button>
      </div>
    </header>
  );
};
