import React from 'react';
import { Search, Bell, ChevronDown, MapPin, Home, Heart, ShoppingBag, ReceiptText, User, Sun, Moon, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { TabType } from './BottomNav';

interface HeaderProps {
  currentTab?: TabType;
  onSelectTab?: (tab: TabType) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenAddressSelector: () => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab = 'home',
  onSelectTab,
  onOpenSearch,
  onOpenNotifications,
  onOpenAddressSelector,
  unreadNotificationsCount = 2
}) => {
  const { user, selectedAddress } = useAuth();
  const { config, isDarkMode, toggleDarkMode } = useTheme();
  const { totals } = useCart();

  return (
    <header className={`app-header ${currentTab !== 'home' ? 'mobile-hidden' : ''}`}>
      {/* Left Section: Greeting & Address */}
      <div className="header-left-col">
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
      </div>

      {/* Center Section: Desktop Search & Navigation Tabs (visible on desktop >= 768px) */}
      <div className="header-desktop-center">
        {/* Desktop Quick Search Bar Trigger */}
        <div
          className="header-desktop-search"
          onClick={onOpenSearch}
          role="button"
          tabIndex={0}
          title="Buscar no catálogo Brago"
        >
          <Search size={16} className="text-muted" />
          <span className="header-search-placeholder">Buscar produtos, embalagens, descartáveis...</span>
          <kbd className="header-search-shortcut">⌘K</kbd>
        </div>

        {/* Desktop Navigation Tabs */}
        {onSelectTab && (
          <nav className="header-desktop-nav" aria-label="Navegação Desktop">
            <button
              className={`header-nav-link ${currentTab === 'home' ? 'active' : ''}`}
              onClick={() => onSelectTab('home')}
            >
              <Home size={16} />
              <span>Início</span>
            </button>
            <button
              className={`header-nav-link ${currentTab === 'favorites' ? 'active' : ''}`}
              onClick={() => onSelectTab('favorites')}
            >
              <Heart size={16} />
              <span>Favoritos</span>
            </button>
            <button
              className={`header-nav-link ${currentTab === 'orders' ? 'active' : ''}`}
              onClick={() => onSelectTab('orders')}
            >
              <ReceiptText size={16} />
              <span>Pedidos</span>
            </button>
            <button
              className={`header-nav-link ${currentTab === 'profile' ? 'active' : ''}`}
              onClick={() => onSelectTab('profile')}
            >
              <User size={16} />
              <span>Perfil</span>
            </button>
          </nav>
        )}
      </div>

      {/* Right Section: Action Buttons */}
      <div className="header-actions">
        {/* Mobile Search Button (hidden on desktop) */}
        <button
          className="header-circle-btn mobile-only-action"
          onClick={onOpenSearch}
          aria-label="Buscar produtos"
          title="Buscar no cardápio"
        >
          <Search size={19} strokeWidth={2.2} />
        </button>

        {/* Dark Mode Toggle */}
        <button
          className="header-circle-btn"
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          title={isDarkMode ? 'Tema Claro' : 'Tema Escuro'}
        >
          {isDarkMode ? <Sun size={18} strokeWidth={2.2} /> : <Moon size={18} strokeWidth={2.2} />}
        </button>

        {/* Notifications */}
        <button
          className="header-circle-btn"
          onClick={onOpenNotifications}
          aria-label="Notificações"
          title="Avisos e promoções"
        >
          <Bell size={19} strokeWidth={2.2} />
          {unreadNotificationsCount > 0 && <span className="badge-dot" />}
        </button>

        {/* Desktop Cart Button with Counter (visible on desktop) */}
        {onSelectTab && (
          <button
            className={`header-desktop-cart-btn ${currentTab === 'cart' ? 'active' : ''}`}
            onClick={() => onSelectTab('cart')}
            aria-label={`Carrinho com ${totals.itemCount} itens`}
            title="Ver Carrinho"
          >
            <ShoppingBag size={18} />
            <span className="desktop-cart-label">Carrinho</span>
            {totals.itemCount > 0 && (
              <span className="desktop-cart-badge">{totals.itemCount}</span>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
