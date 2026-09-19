import React, { useState } from 'react';
import { Search, Bell, ChevronDown, MapPin, Home, Heart, ShoppingBag, ReceiptText, User, Sun, Moon, Sparkles, Package, Zap, ArrowRight } from 'lucide-react';
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
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenSearch();
  };

  return (
    <header className={`app-header ml-desktop-header ${currentTab !== 'home' ? 'mobile-hidden' : ''}`}>
      {/* =========================================================================
          DESKTOP TIER 1: LOGO + WIDE SEARCH BAR + PROMO BANNER (Mercado Livre Style)
          ========================================================================= */}
      <div className="ml-header-top-row">
        {/* Left: Brand Logo */}
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

        {/* Center: Mercado Livre Iconic Search Bar */}
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

        {/* Right: Promotional Benefit Highlight */}
        <div className="ml-header-promo-banner" onClick={() => onSelectTab && onSelectTab('home')}>
          <div className="ml-promo-banner-badge">
            <Zap size={14} fill="#00A650" color="#00A650" />
            <span>30% OFF</span>
          </div>
          <div className="ml-promo-banner-text">
            <span className="ml-promo-text-bold">Frete Grátis</span>
            <span className="ml-promo-text-sub">em pedidos &gt; R$ 200</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DESKTOP TIER 2: LOCATION + CATEGORIES MENU + USER ACTIONS & CART
          ========================================================================= */}
      <div className="ml-header-bottom-row">
        {/* Left: Mercado Livre Delivery Address Selector */}
        <div
          className="ml-header-address-btn"
          onClick={onOpenAddressSelector}
          role="button"
          tabIndex={0}
          title="Clique para alterar seu endereço de entrega"
        >
          <MapPin size={18} className="ml-address-pin" />
          <div className="ml-address-text-box">
            <span className="ml-address-label">
              Enviar para {user?.name ? user.name.split(' ')[0] : 'Cliente'}
            </span>
            <span className="ml-address-street">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.number}`
                : 'Informe seu endereço'}
            </span>
          </div>
          <ChevronDown size={14} className="ml-address-chevron" />
        </div>

        {/* Center: Navigation Links & Categories */}
        <nav className="ml-header-nav-menu" aria-label="Menu Principal">
          <button
            className={`ml-nav-link ${currentTab === 'home' ? 'active' : ''}`}
            onClick={() => onSelectTab && onSelectTab('home')}
          >
            <span>Início</span>
          </button>

          <button
            className="ml-nav-link ml-nav-has-sub"
            onClick={onOpenSearch}
          >
            <span>Categorias</span>
            <ChevronDown size={12} />
          </button>

          <button
            className="ml-nav-link"
            onClick={() => onSelectTab && onSelectTab('home')}
          >
            <span>Ofertas do Dia</span>
          </button>

          <button
            className="ml-nav-link"
            onClick={() => onSelectTab && onSelectTab('home')}
          >
            <span>Embalagens</span>
          </button>

          <button
            className="ml-nav-link"
            onClick={() => onSelectTab && onSelectTab('home')}
          >
            <span>Limpeza</span>
          </button>

          <button
            className="ml-nav-link"
            onClick={() => onSelectTab && onSelectTab('home')}
          >
            <span>Panificação</span>
          </button>

          <button
            className="ml-nav-link"
            onClick={() => onSelectTab && onSelectTab('home')}
          >
            <span>Contato</span>
          </button>
        </nav>

        {/* Right: User Menu, Orders, Favorites & Cart */}
        <div className="ml-header-user-menu">
          {onSelectTab && (
            <>
              <button
                className={`ml-user-link ${currentTab === 'profile' ? 'active' : ''}`}
                onClick={() => onSelectTab('profile')}
              >
                <span>Olá, {user?.name ? user.name.split(' ')[0] : 'Cliente'}</span>
                <ChevronDown size={12} />
              </button>

              <button
                className={`ml-user-link ${currentTab === 'orders' ? 'active' : ''}`}
                onClick={() => onSelectTab('orders')}
              >
                <span>Meus pedidos</span>
              </button>

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
            className="ml-theme-toggle-btn"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Tema Claro' : 'Tema Escuro'}
            title={isDarkMode ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Notification Button */}
          <button
            className="ml-notifications-btn"
            onClick={onOpenNotifications}
            aria-label="Notificações"
            title="Avisos e novidades"
          >
            <Bell size={18} />
            {unreadNotificationsCount > 0 && <span className="ml-badge-dot" />}
          </button>

          {/* Mercado Livre Style Cart Button */}
          {onSelectTab && (
            <button
              className={`ml-cart-button ${currentTab === 'cart' ? 'active' : ''}`}
              onClick={() => onSelectTab('cart')}
              aria-label={`Carrinho com ${totals.itemCount} itens`}
              title="Ver Carrinho"
            >
              <div className="ml-cart-icon-box">
                <ShoppingBag size={20} />
                {totals.itemCount > 0 && (
                  <span className="ml-cart-count-badge">{totals.itemCount}</span>
                )}
              </div>
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
