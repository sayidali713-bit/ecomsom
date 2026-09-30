import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        const updated = state.items.map((item, i) =>
          i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { ...state, items: updated };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'INCREASE_QTY': {
      const updated = state.items.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      return { ...state, items: updated };
    }
    case 'DECREASE_QTY': {
      const updated = state.items.map(item =>
        item.id === action.payload ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      );
      return { ...state, items: updated };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ecom_cart');
      if (saved) {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage');
    }
  }, []);

  // Persist cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('ecom_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const increaseQty = (id) => dispatch({ type: 'INCREASE_QTY', payload: id });
  const decreaseQty = (id) => dispatch({ type: 'DECREASE_QTY', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isInCart = (id) => state.items.some(item => item.id === id);

  return (
    <CartContext.Provider value={{
      items: state.items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      increaseQty,
      decreaseQty,
      clearCart,
      isInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
