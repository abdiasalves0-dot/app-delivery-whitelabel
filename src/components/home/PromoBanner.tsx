import React from 'react';
import { ArrowRight, Truck, Package } from 'lucide-react';

interface PromoBannerProps {
  onClaimOffer: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onClaimOffer }) => {
  return (
    <div className="promo-banner-container">
      {/* Gliding Shimmer Motion */}
      <div className="promo-shimmer-sweep" />

      <div className="promo-banner-content">
        <span className="promo-tag">Distribuição Express</span>
        <h2 className="promo-headline">30% OFF</h2>
        <p className="promo-date">Embalagens & Food Service</p>
        <button
          className="promo-cta-btn"
          onClick={onClaimOffer}
          aria-label="Aproveitar desconto de 30%"
        >
          <span>Aproveitar</span>
          <ArrowRight size={13} strokeWidth={2.5} />
        </button>
      </div>

      <div className="promo-banner-graphic">
        {/* Delivery Graphic representation with floating physics */}
        <div className="promo-graphic-float" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              color: '#FFFFFF',
              filter: 'drop-shadow(0 10px 14px rgba(0,0,0,0.4))',
              transform: 'scaleX(-1) translateY(6px)'
            }}
          >
            <Truck size={68} strokeWidth={1.8} />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '20px',
              color: 'var(--color-primary-light)',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }}
          >
            <Package size={34} strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </div>
  );
};
