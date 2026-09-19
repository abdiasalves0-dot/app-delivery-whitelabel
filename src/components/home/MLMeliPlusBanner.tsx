import React from 'react';
import { Sparkles, Truck, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

interface MLMeliPlusBannerProps {
  onSubscribe?: () => void;
}

export const MLMeliPlusBanner: React.FC<MLMeliPlusBannerProps> = ({ onSubscribe }) => {
  return (
    <div className="ml-meliplus-banner ml-desktop-only">
      <div className="ml-meliplus-left">
        <div className="ml-meliplus-logo-badge">
          <Zap size={20} fill="#3483FA" color="#3483FA" />
          <span className="ml-meliplus-title">CLUBE BRAGO+</span>
        </div>
        <p className="ml-meliplus-headline">
          Economize em todas as compras com <strong>Frete Grátis</strong> e <strong>descontos exclusivos no atacado</strong>
        </p>
      </div>

      <div className="ml-meliplus-middle">
        <div className="ml-meliplus-perk">
          <Truck size={18} className="text-primary" />
          <span>Frete Grátis FULL ilimitado</span>
        </div>
        <div className="ml-meliplus-perk">
          <Sparkles size={18} className="text-primary" />
          <span>5% de cashback em compras PJ</span>
        </div>
        <div className="ml-meliplus-perk">
          <ShieldCheck size={18} className="text-primary" />
          <span>Atendimento VIP via WhatsApp</span>
        </div>
      </div>

      <div className="ml-meliplus-right">
        <div className="ml-meliplus-price-tag">
          <span className="ml-meliplus-price-sub">Apenas</span>
          <strong className="ml-meliplus-price">R$ 9,90/mês</strong>
        </div>
        <button
          className="ml-meliplus-cta-btn"
          onClick={onSubscribe}
        >
          <span>Assinar Agora</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
