import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (e: React.MouseEvent, product: Product) => void;
  title?: string;
  onSeeAll?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
  title = 'Best Sellers',
  onSeeAll
}) => {
  return (
    <section>
      <div className="section-header-row">
        <h2 className="section-main-title">{title}</h2>
        {onSeeAll && (
          <button className="section-see-all-btn" onClick={onSeeAll}>
            See All
          </button>
        )}
      </div>

      <div className="products-grid-layout">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onSelectProduct}
            onQuickAdd={onQuickAdd}
          />
        ))}
      </div>
    </section>
  );
};
