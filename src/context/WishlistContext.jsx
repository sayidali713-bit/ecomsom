import React, { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext(null);

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.find(item => item.id === action.payload.id)) return state;
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'TOGGLE_ITEM': {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'LOAD_WISHLIST':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ecom_wishlist');
      if (saved) {
        dispatch({ type: 'LOAD_WISHLIST', payload: JSON.parse(saved) });
      }
    } catch (e) {
      console.warn('Failed to load wishlist from localStorage');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ecom_wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const toggleItem = (product) => dispatch({ type: 'TOGGLE_ITEM', payload: product });
  const isInWishlist = (id) => state.items.some(item => item.id === id);

  return (
    <WishlistContext.Provider value={{
      items: state.items,
      itemCount: state.items.length,
      addItem,
      removeItem,
      toggleItem,
      isInWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
