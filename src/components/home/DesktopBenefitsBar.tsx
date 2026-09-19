import React from 'react';
import { QrCode, Truck, Zap, ShieldCheck, CreditCard } from 'lucide-react';

export const DesktopBenefitsBar: React.FC = () => {
  return (
    <section className="desktop-benefits-container" aria-label="Benefícios e Formas de Pagamento">
      <div className="benefits-inner-row">
        {/* Benefit 1: PIX / Pagamento */}
        <div className="benefit-item">
          <div className="benefit-icon-circle">
            <QrCode size={22} className="benefit-icon" />
          </div>
          <div className="benefit-text-box">
            <span className="benefit-title">PIX & Faturamento</span>
            <span className="benefit-sub">Desconto à vista ou faturado</span>
          </div>
        </div>

        <div className="benefit-divider" />

        {/* Benefit 2: Frete Grátis */}
        <div className="benefit-item">
          <div className="benefit-icon-circle">
            <Truck size={22} className="benefit-icon" />
          </div>
          <div className="benefit-text-box">
            <span className="benefit-title">Frete Grátis</span>
            <span className="benefit-sub">Em pedidos acima de R$ 200</span>
          </div>
        </div>

        <div className="benefit-divider" />

        {/* Benefit 3: Pronta Entrega FULL */}
        <div className="benefit-item">
          <div className="benefit-icon-circle">
            <Zap size={22} className="benefit-icon" />
          </div>
          <div className="benefit-text-box">
            <span className="benefit-title">Envio FULL Expresso</span>
            <span className="benefit-sub">Pronta entrega para seu negócio</span>
          </div>
        </div>

        <div className="benefit-divider" />

        {/* Benefit 4: Compra Segura */}
        <div className="benefit-item">
          <div className="benefit-icon-circle">
            <ShieldCheck size={22} className="benefit-icon" />
          </div>
          <div className="benefit-text-box">
            <span className="benefit-title">Distribuidora Oficial</span>
            <span className="benefit-sub">Garantia direta de fábrica</span>
          </div>
        </div>
      </div>
    </section>
  );
};
