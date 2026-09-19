import React from 'react';
import { Package, Sparkles, Wheat, CupSoda, ShieldCheck, Grid } from 'lucide-react';
import { ProductCategory } from '../../types/product';

interface CategoryItem {
  id: ProductCategory;
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'all', label: 'Todas', Icon: Grid },
  { id: 'embalagens', label: 'Embalagens', Icon: Package },
  { id: 'limpeza', label: 'Limpeza', Icon: Sparkles },
  { id: 'panificacao', label: 'Panificação', Icon: Wheat },
  { id: 'descartaveis', label: 'Descartáveis', Icon: CupSoda },
  { id: 'epi', label: 'EPIs & Luvas', Icon: ShieldCheck }
];

interface MLCategoriesSectionProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

export const MLCategoriesSection: React.FC<MLCategoriesSectionProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <section className="ml-categories-section">
      {/* Desktop Header: "Categorias populares" */}
      <div className="ml-section-header ml-desktop-only">
        <h2 className="ml-section-title">Categorias populares</h2>
      </div>

      {/* Desktop Circles Grid */}
      <div className="ml-categories-grid ml-desktop-only">
        {CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          const IconComponent = cat.Icon;
          return (
            <button
              key={cat.id}
              className={`ml-category-circle-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
              title={`Filtrar por ${cat.label}`}
            >
              <div className="ml-category-circle-icon">
                <IconComponent size={28} strokeWidth={2} />
              </div>
              <span className="ml-category-circle-label">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Horizontal Pills (< 1024px) */}
      <div className="categories-scroll-wrapper ml-mobile-only" role="tablist" aria-label="Categorias de produtos">
        {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
          const isActive = selectedCategory === cat.id;
          const IconComponent = cat.Icon;
          return (
            <div
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              className={`category-card-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(isActive ? 'all' : cat.id)}
              title={`Filtrar por ${cat.label}`}
            >
              <div className="category-icon-box">
                <IconComponent size={22} strokeWidth={2.2} />
              </div>
              <span className="category-label">{cat.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
