import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Truck, ArrowRight, Sparkles } from 'lucide-react';

interface MLHeroBannerProps {
  onClaimOffer: () => void;
}

interface BannerSlide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  bgGradient: string;
  badgeColor: string;
  icon: React.ReactNode;
}

export const MLHeroBanner: React.FC<MLHeroBannerProps> = ({ onClaimOffer }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: BannerSlide[] = [
    {
      id: 1,
      tag: 'OFERTA DO DIA • ENVIOS FULL',
      title: 'ATÉ 30% OFF EM BEBIDAS & DESCARTÁVEIS',
      subtitle: 'Abasteça seu comércio ou evento com entrega garantida no mesmo dia',
      ctaText: 'Aproveitar Oferta',
      bgGradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0369A1 100%)',
      badgeColor: '#00A650',
      icon: <Zap size={44} className="text-warning" />
    },
    {
      id: 2,
      tag: 'CLUBE BRAGO+ • EXCLUSIVO',
      title: 'FRETE GRÁTIS EM COMPRAS NO ATACADO',
      subtitle: 'Condições especiais de faturamento PJ em até 3x sem juros ou Boleto 28D',
      ctaText: 'Conhecer Vantagens',
      bgGradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
      badgeColor: '#3483FA',
      icon: <Truck size={44} className="text-white" />
    },
    {
      id: 3,
      tag: 'DISTRIBUIDORA OFICIAL',
      title: 'PRODUTOS 100% ORIGINAIS DIRETO DA FÁBRICA',
      subtitle: 'Garantia de procedência, nota fiscal eletrônica e lotes recentes',
      ctaText: 'Ver Catálogo Oficial',
      bgGradient: 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%)',
      badgeColor: '#10B981',
      icon: <ShieldCheck size={44} className="text-white" />
    }
  ];

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="ml-hero-banner-wrapper">
      {/* Banner Slide */}
      <div
        className="ml-hero-banner-slide"
        style={{ background: slide.bgGradient }}
      >
        <div className="ml-hero-banner-content">
          <span className="ml-hero-tag" style={{ backgroundColor: slide.badgeColor }}>
            {slide.tag}
          </span>
          <h2 className="ml-hero-title">{slide.title}</h2>
          <p className="ml-hero-subtitle">{slide.subtitle}</p>
          
          <button
            className="ml-hero-cta-btn"
            onClick={onClaimOffer}
          >
            <span>{slide.ctaText}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="ml-hero-graphic-box">
          <div className="ml-hero-icon-circle">
            {slide.icon}
          </div>
        </div>
      </div>

      {/* Navigation Arrows (Mercado Livre Style) */}
      <button
        className="ml-hero-arrow-btn ml-hero-arrow-left"
        onClick={prevSlide}
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className="ml-hero-arrow-btn ml-hero-arrow-right"
        onClick={nextSlide}
        aria-label="Próximo slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="ml-hero-pagination">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            className={`ml-hero-dot ${currentSlide === idx ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
