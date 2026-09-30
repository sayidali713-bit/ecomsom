import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, X, ShoppingCart, Eye } from 'lucide-react';

import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import EmptyState from '../components/EmptyState';
import Rating from '../components/Rating';

// ---------------------------------------------------------------------------
// WishlistCard — individual product card with wishlist-specific actions
// ---------------------------------------------------------------------------
const WishlistCard = ({ item }) => {
  const { removeItem } = useWishlist();
  const { addItem, isInCart } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = () => {
    addItem(item);
    removeItem(item.id);
    showToast(
      isInCart(item.id)
        ? `"${item.name}" quantity increased in your cart.`
        : `"${item.name}" moved to cart!`,
      'success'
    );
  };

  const handleRemove = () => {
    removeItem(item.id);
    showToast(`"${item.name}" removed from wishlist.`, 'info');
  };

  const discountedPrice =
    item.originalPrice && item.originalPrice > item.price
      ? item.price
      : null;

  const displayPrice = discountedPrice ?? item.price;
  const originalPrice = item.originalPrice ?? null;

  return (
    <article className="group relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-md">
      {/* ── Remove button ────────────────────────────────────────────────── */}
      <button
        onClick={handleRemove}
        aria-label={`Remove ${item.name} from wishlist`}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-slate-400 border border-slate-200 shadow-sm transition-colors duration-150 hover:bg-red-50 hover:text-red-500 hover:border-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
      >
        <X size={15} strokeWidth={2.5} />
      </button>

      {/* ── Product image ─────────────────────────────────────────────────── */}
      <Link
        to={`/product/${item.id}`}
        className="block overflow-hidden bg-slate-50 aspect-[4/3]"
        tabIndex={-1}
        aria-hidden="true"
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <Heart size={48} strokeWidth={1.5} />
          </div>
        )}
      </Link>

      {/* ── Card body ────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category badge */}
        {item.category && (
          <span className="text-xs font-medium text-indigo-500 uppercase tracking-wide">
            {item.category}
          </span>
        )}

        {/* Product name */}
        <Link
          to={`/product/${item.id}`}
          className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 hover:text-indigo-600 transition-colors duration-150 focus:outline-none focus-visible:underline"
        >
          {item.name}
        </Link>

        {/* Rating */}
        {item.rating !== undefined && (
          <Rating rating={item.rating} reviews={item.reviews} />
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-base font-bold text-slate-900">
            ${displayPrice.toFixed(2)}
          </span>
          {originalPrice && originalPrice > displayPrice && (
            <span className="text-xs text-slate-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          {originalPrice && originalPrice > displayPrice && (
            <span className="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              {Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}% off
            </span>
          )}
        </div>

        {/* ── Actions ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-2 pt-2">
          {/* Move to Cart */}
          <button
            onClick={handleMoveToCart}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <ShoppingCart size={15} strokeWidth={2.5} />
            Move to Cart
          </button>

          {/* View Product */}
          <Link
            to={`/product/${item.id}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold transition-colors duration-150 hover:bg-slate-200 active:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          >
            <Eye size={15} strokeWidth={2.5} />
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
};

// ---------------------------------------------------------------------------
// Wishlist page
// ---------------------------------------------------------------------------
const Wishlist = () => {
  const { items } = useWishlist();
  const count = items.length;

  // ── Empty state ────────────────────────────────────────────────────────
  if (count === 0) {
    return (
      <div className="page-enter min-h-[60vh] flex flex-col">
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items you love and come back to them later."
          actionTo="/shop"
          actionLabel="Explore Products"
        />
      </div>
    );
  }

  // ── Populated state ────────────────────────────────────────────────────
  return (
    <div className="page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-50 text-pink-500">
              <Heart size={20} fill="currentColor" strokeWidth={0} />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              My Wishlist
              <span className="ml-2 text-lg font-medium text-slate-400">
                ({count} {count === 1 ? 'item' : 'items'})
              </span>
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1 ml-13">
            Items you&apos;ve saved — move them to your cart whenever you&apos;re ready.
          </p>
        </header>

        {/* Product grid */}
        <section aria-label="Wishlist items">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((item) => (
              <WishlistCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Footer hint */}
        <p className="mt-10 text-center text-xs text-slate-400">
          Items in your wishlist are saved locally on this device.{' '}
          <Link to="/shop" className="text-indigo-500 hover:underline">
            Continue shopping
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Wishlist;
