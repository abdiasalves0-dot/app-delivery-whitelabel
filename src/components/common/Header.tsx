import React, { useState } from 'react';
import { Search, Bell, ChevronDown, MapPin, ShoppingCart, Sun, Moon, Package } from 'lucide-react';
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
  unreadNotificationsCount = 3
}) => {
  const { user, selectedAddress } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { totals } = useCart();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenSearch();
  };

  const getInitials = (name?: string) => {
    if (!name) return 'AA';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const firstName = user?.name ? user.name.trim().split(' ')[0] : 'Abdias';

  return (
    <header className={`app-header ml-desktop-header ${currentTab !== 'home' ? 'mobile-hidden' : ''}`}>
      {/* =========================================================================
          DESKTOP TIER 1: LOGO + WIDE SEARCH BAR + PROMO BANNER (Mercado Livre Style)
          ========================================================================= */}
      <div className="ml-header-top-row">
        {/* Left Column: Brand Logo */}
        <div
          className="ml-header-logo-box"
          onClick={() => onSelectTab && onSelectTab('home')}
          role="button"
          tabIndex={0}
          title="Brago Distribuidora - Ir para a Página Inicial"
        >
          <div className="ml-logo-badge">
            <Package size={22} className="ml-logo-icon" />
          </div>
          <div className="ml-logo-text-box">
            <span className="ml-logo-brand-title">BRAGO</span>
            <span className="ml-logo-brand-sub">DISTRIBUIDORA</span>
          </div>
        </div>

        {/* Center Column: Mercado Livre Iconic Search Bar */}
        <form className="ml-header-search-form" onSubmit={handleSearchSubmit} onClick={onOpenSearch}>
          <input
            type="text"
            className="ml-header-search-input"
            placeholder="Buscar produtos, marcas e muito mais…"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            readOnly
          />
          <div className="ml-search-divider" />
          <button
            type="button"
            className="ml-header-search-btn"
            aria-label="Buscar"
            onClick={onOpenSearch}
          >
            <Search size={18} strokeWidth={2.2} />
          </button>
        </form>

        {/* Right Column: Meli+ Style Pill Banner */}
        <div className="ml-header-promo-banner" onClick={() => onSelectTab && onSelectTab('home')}>
          <div className="ml-promo-badge">
            <span className="ml-promo-badge-text">brago</span>
            <span className="ml-promo-badge-plus">+</span>
          </div>
          <div className="ml-promo-text">
            <span className="ml-promo-text-bold">4 benefícios e e-books</span>
            <span className="ml-promo-text-sub">em 1 assinatura</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DESKTOP TIER 2: LOCATION + CATEGORIES MENU + USER ACTIONS & CART
          ========================================================================= */}
      <div className="ml-header-bottom-row">
        {/* Left Column: Mercado Livre Delivery Address Selector (Clean, no box) */}
        <div
          className="ml-header-address-btn"
          onClick={onOpenAddressSelector}
          role="button"
          tabIndex={0}
          title="Clique para alterar seu endereço de entrega"
        >
          <MapPin size={22} strokeWidth={1.7} className="ml-address-pin" />
          <div className="ml-address-text-box">
            <span className="ml-address-label">
              Enviar para {firstName}
            </span>
            <span className="ml-address-street">
              {selectedAddress
                ? `${selectedAddress.street}${selectedAddress.number ? ` ${selectedAddress.number}` : ''}`
                : 'Rua F SN'}
            </span>
          </div>
        </div>

        {/* Center Column: Navigation Links & Categories */}
        <nav className="ml-header-nav-menu" aria-label="Menu Principal">
          <button
            className="ml-nav-link ml-nav-has-sub"
            onClick={onOpenSearch}
          >
            <span>Categorias</span>
            <ChevronDown size={12} strokeWidth={2.5} />
          </button>

          <button
            className="ml-nav-link"
            onClick={() => onSelectTab && onSelectTab('home')}
          >
            <span>Ofertas</span>
          </button>

          <button
            className="ml-nav-link"
            onClick={() => onSelectTab && onSelectTab('home')}
          >
            <span>Cupons</span>
          </button>

          <button
            className="ml-nav-link"
            onClick={() => onSelectTab && onSelectTab('home')}
          >
            <span>Supermercado</span>
          </button>

          <button
            className="ml-nav-link"
            onClick={() => onSelectTab && onSelectTab('home')}
          >
            <span>Moda</span>
          </button>

          <button
            className="ml-nav-link ml-nav-with-badge"
            onClick={() => onSelectTab && onSelectTab('home')}
          >
            <span className="ml-nav-badge-pill">GRÁTIS</span>
            <span>Mercado Play</span>
          </button>

          <button
            className="ml-nav-link"
            onClick={() => onSelectTab && onSelectTab('home')}
          >
            <span>Vender</span>
          </button>

          <button
            className="ml-nav-link"
            onClick={() => onSelectTab && onSelectTab('home')}
          >
            <span>Contato</span>
          </button>
        </nav>

        {/* Right Column: User Menu, Orders, Favorites & Cart */}
        <div className="ml-header-user-menu">
          {onSelectTab && (
            <>
              {/* User Profile with Avatar Circle + Name */}
              <button
                className={`ml-user-profile-btn ${currentTab === 'profile' ? 'active' : ''}`}
                onClick={() => onSelectTab('profile')}
              >
                <div className="ml-user-avatar-circle">
                  <span>{getInitials(user?.name)}</span>
                </div>
                <span className="ml-user-name">{firstName}</span>
                <ChevronDown size={12} strokeWidth={2.5} />
              </button>

              {/* Compras (Orders) */}
              <button
                className={`ml-user-link ${currentTab === 'orders' ? 'active' : ''}`}
                onClick={() => onSelectTab('orders')}
              >
                <span>Compras</span>
              </button>

              {/* Favoritos */}
              <button
                className={`ml-user-link ${currentTab === 'favorites' ? 'active' : ''}`}
                onClick={() => onSelectTab('favorites')}
              >
                <span>Favoritos</span>
              </button>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button
            className="ml-icon-btn ml-theme-toggle"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Tema Claro' : 'Tema Escuro'}
            title={isDarkMode ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
          >
            {isDarkMode ? <Sun size={17} strokeWidth={2} /> : <Moon size={17} strokeWidth={2} />}
          </button>

          {/* Notification Button with Badge */}
          <button
            className="ml-icon-btn ml-notifications-btn"
            onClick={onOpenNotifications}
            aria-label="Notificações"
            title="Avisos e novidades"
          >
            <Bell size={18} strokeWidth={2} />
            {unreadNotificationsCount > 0 && (
              <span className="ml-badge-counter">{unreadNotificationsCount}</span>
            )}
          </button>

          {/* Mercado Livre Style Cart Button */}
          {onSelectTab && (
            <button
              className={`ml-icon-btn ml-cart-btn ${currentTab === 'cart' ? 'active' : ''}`}
              onClick={() => onSelectTab('cart')}
              aria-label={`Carrinho com ${totals.itemCount} itens`}
              title="Ver Carrinho"
            >
              <ShoppingCart size={19} strokeWidth={2} />
              {totals.itemCount > 0 && (
                <span className="ml-badge-counter ml-cart-badge">{totals.itemCount}</span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          MOBILE HEADER (PRESERVADO 100% PARA SMARTPHONES < 768px)
          ========================================================================= */}
      <div className="mobile-header-inner">
        <div
          className="header-greeting"
          onClick={onOpenAddressSelector}
          role="button"
          tabIndex={0}
          title="Clique para gerenciar ou selecionar seus endereços de entrega"
        >
          <span className="greeting-sub">Olá</span>
          <h1 className="greeting-title">{user?.name || 'Cliente'}</h1>
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
            title="Buscar no catálogo"
          >
            <Search size={19} strokeWidth={2.2} />
          </button>

          <button
            className="header-circle-btn"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Tema Claro' : 'Tema Escuro'}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="header-circle-btn"
            onClick={onOpenNotifications}
            aria-label="Notificações"
          >
            <Bell size={19} strokeWidth={2.2} />
            {unreadNotificationsCount > 0 && <span className="badge-dot" />}
          </button>
        </div>
      </div>
    </header>
  );
};
