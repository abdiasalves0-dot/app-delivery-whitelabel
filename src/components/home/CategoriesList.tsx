import React from 'react';
import { Package, Sparkles, Wheat, CupSoda, ShieldCheck } from 'lucide-react';
import { ProductCategory } from '../../types/product';

interface CategoryItem {
  id: ProductCategory;
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'embalagens', label: 'Embalagens', Icon: Package },
  { id: 'limpeza', label: 'Limpeza', Icon: Sparkles },
  { id: 'panificacao', label: 'Panificação', Icon: Wheat },
  { id: 'descartaveis', label: 'Descartáveis', Icon: CupSoda },
  { id: 'epi', label: 'EPIs & Luvas', Icon: ShieldCheck }
];

interface CategoriesListProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoriesList: React.FC<CategoriesListProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="categories-scroll-wrapper" role="tablist" aria-label="Categorias de produtos">
      {CATEGORIES.map(cat => {
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
  );
};
