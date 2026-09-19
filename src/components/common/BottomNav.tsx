import React from 'react';
import { Home, Heart, ShoppingBag, ReceiptText, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export type TabType = 'home' | 'favorites' | 'cart' | 'orders' | 'profile';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const { totals } = useCart();
  const [isBumping, setIsBumping] = React.useState(false);

  React.useEffect(() => {
    if (totals.itemCount > 0) {
      setIsBumping(true);
      const timer = setTimeout(() => setIsBumping(false), 450);
      return () => clearTimeout(timer);
    }
  }, [totals.itemCount]);

  return (
    <nav className="bottom-nav-dock" aria-label="Navegação Principal">
      <button
        className={`nav-item-btn ${currentTab === 'home' ? 'active' : ''}`}
        onClick={() => onSelectTab('home')}
        aria-label="Início"
      >
        <Home size={20} strokeWidth={currentTab === 'home' ? 2.5 : 2} />
        {currentTab === 'home' && <span className="nav-item-label">Home</span>}
      </button>

      <button
        className={`nav-item-btn ${currentTab === 'favorites' ? 'active' : ''}`}
        onClick={() => onSelectTab('favorites')}
        aria-label="Favoritos"
      >
        <Heart size={20} strokeWidth={currentTab === 'favorites' ? 2.5 : 2} />
        {currentTab === 'favorites' && <span className="nav-item-label">Favoritos</span>}
      </button>

      <button
        className={`nav-item-btn ${currentTab === 'cart' ? 'active' : ''}`}
        onClick={() => onSelectTab('cart')}
        aria-label="Carrinho"
      >
        <ShoppingBag size={20} strokeWidth={currentTab === 'cart' ? 2.5 : 2} />
        {totals.itemCount > 0 && (
          <span className={`nav-cart-badge ${isBumping ? 'bump' : ''}`}>{totals.itemCount}</span>
        )}
        {currentTab === 'cart' && <span className="nav-item-label">Cart</span>}
      </button>

      <button
        className={`nav-item-btn ${currentTab === 'orders' ? 'active' : ''}`}
        onClick={() => onSelectTab('orders')}
        aria-label="Meus Pedidos"
      >
        <ReceiptText size={20} strokeWidth={currentTab === 'orders' ? 2.5 : 2} />
        {currentTab === 'orders' && <span className="nav-item-label">Pedidos</span>}
      </button>

      <button
        className={`nav-item-btn ${currentTab === 'profile' ? 'active' : ''}`}
        onClick={() => onSelectTab('profile')}
        aria-label="Meu Perfil"
      >
        <User size={20} strokeWidth={currentTab === 'profile' ? 2.5 : 2} />
        {currentTab === 'profile' && <span className="nav-item-label">Perfil</span>}
      </button>
    </nav>
  );
};
