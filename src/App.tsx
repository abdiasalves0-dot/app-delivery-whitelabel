import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { OrderProvider, useOrders } from './context/OrderContext';

// Common Components
import { Header } from './components/common/Header';
import { BottomNav, TabType } from './components/common/BottomNav';
import { NotificationModal } from './components/common/NotificationModal';
import { SearchModal } from './components/common/SearchModal';
import { ToastContainer, ToastMessage } from './components/common/Toast';

// Home Components
import { MLCategoriesSection } from './components/home/MLCategoriesSection';
import { MLHeroBanner } from './components/home/MLHeroBanner';
import { DesktopBenefitsBar } from './components/home/DesktopBenefitsBar';
import { MLMeliPlusBanner } from './components/home/MLMeliPlusBanner';
import { ProductGrid } from './components/home/ProductGrid';
import { Footer } from './components/common/Footer';
import { mockProducts } from './data/mockProducts';
import { Product, ProductCategory } from './types/product';

// Detail & Flow Components
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CartView } from './components/cart/CartView';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderTrackingModal } from './components/orders/OrderTrackingModal';
import { OrderHistoryView } from './components/orders/OrderHistoryView';
import { FavoritesView } from './components/favorites/FavoritesView';
import { ProfileView } from './components/profile/ProfileView';
import { AddressModal } from './components/profile/AddressModal';
import { WhitelabelConfigModal } from './components/profile/WhitelabelConfigModal';
import { AuthModal } from './components/auth/AuthModal';
import { generateId } from './utils/formatters';

const AppContent: React.FC = () => {
  const { addToCart, applyCoupon } = useCart();
  const { activeOrder, setActiveOrder } = useOrders();

  // State Navigation
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals visibility
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isWhitelabelOpen, setIsWhitelabelOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Listen for navigation events (e.g. from PDP "Comprar agora")
  useEffect(() => {
    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent<TabType>;
      if (customEvent.detail) {
        setCurrentTab(customEvent.detail);
      }
    };
    window.addEventListener('nav:switch-tab', handleSwitchTab);
    return () => window.removeEventListener('nav:switch-tab', handleSwitchTab);
  }, []);

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    const newToast: ToastMessage = {
      id: generateId('toast'),
      type,
      text
    };
    setToasts(prev => [newToast, ...prev]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 3200);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Quick add to cart from card
  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes.find(s => s.isDefault) || product.sizes[0];
    const defaultIngredients = product.ingredients.filter(i => i.isDefaultChecked);
    addToCart(product, defaultSize, defaultIngredients, 1);
    showToast('success', `${product.name} adicionado ao carrinho!`);
  };

  // Promo Claim
  const handleClaimOffer = () => {
    applyCoupon('PROMO30');
    showToast('success', 'Cupom PROMO30 (30% OFF) aplicado automaticamente!');
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'all'
    ? mockProducts
    : mockProducts.filter(p => p.category === selectedCategory);

  // Best sellers
  const bestSellerProducts = mockProducts.filter(p => p.isBestSeller || p.rating >= 4.8);

  return (
    <div className="app-root-container">
      {/* App Mobile Container */}
      <div className="app-mobile-shell">
        {/* Global Toast Container */}
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />

        {/* Global Header with Desktop Navigation */}
        <Header
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenAddressSelector={() => setIsAddressModalOpen(true)}
        />

        {/* App Main Scroll View */}
        <main className="app-screen-body">
          <div key={currentTab} className="tab-view-animated">
            {currentTab === 'home' && (
              <>
                {/* Mercado Livre Hero Banner Slider */}
                <MLHeroBanner onClaimOffer={handleClaimOffer} />

                {/* Mercado Livre Quick Benefits Bar */}
                <DesktopBenefitsBar />

                {/* Popular Categories (Circles on Desktop, Pills on Mobile) */}
                <MLCategoriesSection
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                {/* Section 1: Ofertas do dia */}
                <ProductGrid
                  products={filteredProducts}
                  onSelectProduct={setSelectedProduct}
                  onQuickAdd={handleQuickAdd}
                  title={selectedCategory === 'all' ? 'Ofertas do dia' : `Catálogo: ${selectedCategory.toUpperCase()}`}
                  onSeeAll={() => setSelectedCategory('all')}
                />

                {/* Intermediate Meli+ Style Club Banner */}
                <MLMeliPlusBanner onSubscribe={() => showToast('info', 'Clube Brago+ ativado com sucesso para sua conta!')} />

                {/* Section 2: Mais Vendidos (se estiver vendo todas) */}
                {selectedCategory === 'all' && (
                  <ProductGrid
                    products={bestSellerProducts}
                    onSelectProduct={setSelectedProduct}
                    onQuickAdd={handleQuickAdd}
                    title="Mais Vendidos da Distribuidora"
                  />
                )}
              </>
            )}

            {currentTab === 'favorites' && (
              <FavoritesView
                onSelectProduct={setSelectedProduct}
                onQuickAdd={handleQuickAdd}
                onExploreMenu={() => setCurrentTab('home')}
              />
            )}

            {currentTab === 'cart' && (
              <CartView
                onProceedToCheckout={() => setIsCheckoutOpen(true)}
                onExploreMenu={() => setCurrentTab('home')}
                onShowToast={showToast}
              />
            )}

            {currentTab === 'orders' && (
              <OrderHistoryView
                onOpenTracking={(order) => {
                  setActiveOrder(order);
                  setIsTrackingOpen(true);
                }}
                onExploreMenu={() => setCurrentTab('home')}
                onShowToast={showToast}
              />
            )}

            {currentTab === 'profile' && (
              <ProfileView
                onOpenAddressManager={() => setIsAddressModalOpen(true)}
                onOpenWhitelabel={() => setIsWhitelabelOpen(true)}
                onOpenOrders={() => setCurrentTab('orders')}
                onOpenFavorites={() => setCurrentTab('favorites')}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
                onShowToast={showToast}
              />
            )}
          </div>

          {/* Institutional Desktop Footer */}
          <Footer />
        </main>

        {/* Bottom Navigation Dock */}
        <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />

        {/* Modals and Overlays */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddedToCartToast={() => showToast('success', `${selectedProduct.name} adicionado ao carrinho!`)}
          />
        )}

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectProduct={(p) => {
            setSelectedProduct(p);
            setIsSearchOpen(false);
          }}
        />

        {/* Notification Modal */}
        <NotificationModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onSelectOffer={(code) => {
            applyCoupon(code);
            showToast('success', `Cupom ${code} aplicado no carrinho!`);
          }}
        />

        {/* Address Manager Modal */}
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          onShowToast={showToast}
        />

        {/* Whitelabel Configuration Modal */}
        <WhitelabelConfigModal
          isOpen={isWhitelabelOpen}
          onClose={() => setIsWhitelabelOpen(false)}
          onShowToast={showToast}
        />

        {/* Authentication Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onShowToast={showToast}
        />

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onOpenLiveTracking={() => setIsTrackingOpen(true)}
          onOpenAddressManager={() => setIsAddressModalOpen(true)}
        />

        {/* Live Order Tracking Modal */}
        <OrderTrackingModal
          order={activeOrder}
          isOpen={isTrackingOpen}
          onClose={() => setIsTrackingOpen(false)}
          onShowToast={showToast}
        />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <OrderProvider>
              <AppContent />
            </OrderProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
