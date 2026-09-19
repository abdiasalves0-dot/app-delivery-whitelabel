import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/cart';
import { formatCurrency } from '../../utils/formatters';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove
}) => {
  return (
    <div className="cart-item-row">
      <div className="cart-item-left">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="cart-item-thumb"
        />

        <div className="cart-item-details">
          <h4 className="cart-item-name">{item.product.name}</h4>
          <span className="cart-item-restaurant">
            {item.product.restaurant}
            {item.selectedIngredients.length > 0 && ` • +${item.selectedIngredients.length} extras`}
          </span>
          <span className="cart-item-price">{formatCurrency(item.totalPrice)}</span>
        </div>
      </div>

      <div className="cart-item-quantity-pill">
        <button
          className="cart-qty-btn"
          onClick={() => {
            if (item.quantity === 1) {
              onRemove(item.id);
            } else {
              onUpdateQuantity(item.id, item.quantity - 1);
            }
          }}
          aria-label="Diminuir quantidade"
        >
          {item.quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
        </button>

        <span className="cart-qty-number">{item.quantity}</span>

        <button
          className="cart-qty-btn"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          aria-label="Aumentar quantidade"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
};
