import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [adding, setAdding] = useState(false);

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (adding) return;
    setAdding(true);
    addItem(product);
    addToast(`"${product.name}" added to cart!`, 'success');
    setTimeout(() => setAdding(false), 600);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    addToast(
      inWishlist ? 'Removed from wishlist' : `"${product.name}" added to wishlist!`,
      inWishlist ? 'info' : 'success'
    );
  };

  return (
    <article className="card group relative flex flex-col">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-slate-50 aspect-square">
        {!imgLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount > 0 && (
            <span className="badge bg-red-500 text-white">-{product.discount}%</span>
          )}
          {product.isNew && (
            <span className="badge bg-emerald-500 text-white">New</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm ${
            inWishlist
              ? 'bg-rose-500 text-white'
              : 'bg-white text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={15} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Quick view overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Link
            to={`/product/${product.id}`}
            className="flex items-center justify-center gap-2 w-full py-2 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold rounded-lg hover:bg-white transition-colors shadow-sm"
          >
            <Eye size={13} />
            Quick View
          </Link>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <Link to={`/product/${product.id}`} className="block mb-1">
          <span className="text-xs text-indigo-600 font-medium">{product.categoryName}</span>
          <h3 className="text-sm font-semibold text-slate-800 mt-0.5 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mb-3">
          <Rating rating={product.rating} reviews={product.reviews} />
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-slate-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            inCart
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800'
          } ${adding ? 'scale-95 opacity-80' : ''}`}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={15} />
          {inCart ? 'In Cart' : adding ? 'Adding…' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
