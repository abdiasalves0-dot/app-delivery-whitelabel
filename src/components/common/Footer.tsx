import React from 'react';
import { ShieldCheck, Truck, Clock, Headphones, Award, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="desktop-footer" aria-label="Rodapé Institucional">
      {/* Top Value Proposition Grid */}
      <div className="footer-values-row">
        <div className="footer-value-item">
          <Truck size={28} className="footer-value-icon" />
          <div>
            <h4 className="footer-value-title">Frete Grátis acima de R$ 200</h4>
            <p className="footer-value-desc">Entregamos com frota própria e parceiros qualificados</p>
          </div>
        </div>

        <div className="footer-value-item">
          <ShieldCheck size={28} className="footer-value-icon" />
          <div>
            <h4 className="footer-value-title">Compra 100% Garantida</h4>
            <p className="footer-value-desc">Produtos originais com garantia direto da fábrica</p>
          </div>
        </div>

        <div className="footer-value-item">
          <Clock size={28} className="footer-value-icon" />
          <div>
            <h4 className="footer-value-title">Entrega Expressa FULL</h4>
            <p className="footer-value-desc">Agilidade máxima para restaurantes e comércios</p>
          </div>
        </div>

        <div className="footer-value-item">
          <Headphones size={28} className="footer-value-icon" />
          <div>
            <h4 className="footer-value-title">Atendimento Especializado</h4>
            <p className="footer-value-desc">Suporte consultivo para o seu negócio</p>
          </div>
        </div>
      </div>

      {/* Main Links Multi-Column Grid */}
      <div className="footer-links-grid">
        {/* Col 1 */}
        <div className="footer-links-col">
          <h5 className="footer-col-title">Sobre a Brago</h5>
          <ul className="footer-nav-list">
            <li><a href="#about" onClick={e => e.preventDefault()}>Quem Somos</a></li>
            <li><a href="#clients" onClick={e => e.preventDefault()}>Trabalhe Conosco</a></li>
            <li><a href="#wholesale" onClick={e => e.preventDefault()}>Vendas no Atacado</a></li>
            <li><a href="#sustainability" onClick={e => e.preventDefault()}>Sustentabilidade & Meio Ambiente</a></li>
            <li><a href="#locations" onClick={e => e.preventDefault()}>Nossas Unidades</a></li>
          </ul>
        </div>

        {/* Col 2 */}
        <div className="footer-links-col">
          <h5 className="footer-col-title">Principais Linhas</h5>
          <ul className="footer-nav-list">
            <li><a href="#embalagens" onClick={e => e.preventDefault()}>Embalagens Meiwa</a></li>
            <li><a href="#limpeza" onClick={e => e.preventDefault()}>Higiene & Limpeza Oleak</a></li>
            <li><a href="#panificacao" onClick={e => e.preventDefault()}>Ingredientes Ireks Brasil</a></li>
            <li><a href="#descartaveis" onClick={e => e.preventDefault()}>Garrafas & Descartáveis</a></li>
            <li><a href="#epis" onClick={e => e.preventDefault()}>Luvas & EPIs Nobre</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="footer-links-col">
          <h5 className="footer-col-title">Ajuda & Suporte</h5>
          <ul className="footer-nav-list">
            <li><a href="#help" onClick={e => e.preventDefault()}>Central de Atendimento</a></li>
            <li><a href="#orders" onClick={e => e.preventDefault()}>Rastrear meu Pedido</a></li>
            <li><a href="#returns" onClick={e => e.preventDefault()}>Trocas e Devoluções</a></li>
            <li><a href="#terms" onClick={e => e.preventDefault()}>Termos e Condições de Uso</a></li>
            <li><a href="#privacy" onClick={e => e.preventDefault()}>Política de Privacidade</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="footer-links-col">
          <h5 className="footer-col-title">Formas de Pagamento</h5>
          <p className="footer-payment-desc">
            Pague com total segurança via PIX (desconto especial), Boleto Faturado para Empresas ou Cartão de Crédito em até 3x sem juros.
          </p>
          <div className="footer-payment-badges">
            <span className="payment-badge">PIX</span>
            <span className="payment-badge">Boleto</span>
            <span className="payment-badge">Visa</span>
            <span className="payment-badge">Mastercard</span>
            <span className="payment-badge">Elo</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Bar */}
      <div className="footer-bottom-bar">
        <p className="footer-copyright-text">
          © {new Date().getFullYear()} Brago Distribuidora. Todos os direitos reservados. CNPJ: 00.000.000/0001-00.
        </p>
        <p className="footer-legal-sub">
          Preços e condições de pagamento exclusivos para compras realizadas no canal online, válidos enquanto durarem os estoques.
        </p>
      </div>
    </footer>
  );
};
