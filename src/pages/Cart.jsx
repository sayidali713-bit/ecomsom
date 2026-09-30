import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Lock,
  ArrowLeft,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import EmptyState from '../components/EmptyState';
import Rating from '../components/Rating';

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const LOYALTY_THRESHOLD = 100;   // subtotal above which 10% discount applies
const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 9.99;
const DISCOUNT_RATE = 0.1;

/* ─────────────────────────────────────────────
   Cart Item Card
───────────────────────────────────────────── */
const CartItemCard = ({ item, onRemove, onIncrease, onDecrease }) => {
  const lineTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-6">
      {/* Product image */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded-xl object-cover bg-slate-100"
          onError={(e) => {
            e.currentTarget.src =
              'https://placehold.co/80x80/e2e8f0/94a3b8?text=No+Image';
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        {/* Name + category */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-800 truncate leading-snug">
              {item.name}
            </h3>
            {item.category && (
              <span className="inline-block mt-1 px-2 py-0.5 text-[11px] font-medium bg-indigo-50 text-indigo-600 rounded-full capitalize">
                {item.category}
              </span>
            )}
          </div>

          {/* Remove button */}
          <button
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            className="flex-shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Rating */}
        {item.rating !== undefined && (
          <Rating rating={item.rating} reviews={item.reviews} showCount size="sm" />
        )}

        {/* Price + qty + line total */}
        <div className="flex items-center justify-between gap-4 mt-1 flex-wrap">
          {/* Unit price */}
          <span className="text-sm text-slate-500">
            ${item.price.toFixed(2)} / each
          </span>

          {/* Quantity controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDecrease(item.id)}
              aria-label="Decrease quantity"
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors disabled:opacity-40"
              disabled={item.quantity <= 1}
            >
              <Minus size={13} />
            </button>
            <span className="w-6 text-center text-sm font-semibold text-slate-800 tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => onIncrease(item.id)}
              aria-label="Increase quantity"
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <Plus size={13} />
            </button>
          </div>

          {/* Line total */}
          <span className="text-sm font-bold text-slate-800 tabular-nums">
            ${lineTotal}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Cart Page
───────────────────────────────────────────── */
const Cart = () => {
  const navigate = useNavigate();
  const { items, subtotal, removeItem, increaseQty, decreaseQty, clearCart } =
    useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  /* Order summary calculations */
  const hasLoyaltyDiscount = subtotal > LOYALTY_THRESHOLD;
  const discountAmount = hasLoyaltyDiscount ? subtotal * DISCOUNT_RATE : 0;
  const discountedSubtotal = subtotal - discountAmount;
  const shipping =
    discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const orderTotal = discountedSubtotal + shipping;

  /* ── Empty State ── */
  if (items.length === 0) {
    return (
      <div className="page-enter min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet."
          actionLabel="Continue Shopping"
          actionTo="/shop"
        />
      </div>
    );
  }

  /* ── Populated Cart ── */
  return (
    <div className="page-enter min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back link */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ══════════════════════════════════════
              LEFT — Cart Items
          ══════════════════════════════════════ */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h1 className="text-lg font-bold text-slate-800">
                  Shopping Cart&nbsp;
                  <span className="text-slate-400 font-normal text-base">
                    ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </span>
                </h1>
                <button
                  onClick={clearCart}
                  className="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                >
                  Clear Cart
                </button>
              </div>

              {/* Items */}
              <div className="px-6 divide-y divide-slate-100">
                {items.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onRemove={removeItem}
                    onIncrease={increaseQty}
                    onDecrease={decreaseQty}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════
              RIGHT — Order Summary
          ══════════════════════════════════════ */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-800 mb-5">
                Order Summary
              </h2>

              {/* Rows */}
              <div className="space-y-3 text-sm">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium text-slate-700 tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Loyalty discount */}
                {hasLoyaltyDiscount && (
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      🎉 Loyalty Discount (10%)
                    </span>
                    <span className="text-emerald-600 font-semibold tabular-nums">
                      −${discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Shipping */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-semibold">Free</span>
                  ) : (
                    <span className="font-medium text-slate-700 tabular-nums">
                      ${shipping.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Free shipping nudge */}
                {shipping > 0 && (
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Add&nbsp;
                    <span className="font-semibold text-indigo-500">
                      ${(FREE_SHIPPING_THRESHOLD - discountedSubtotal).toFixed(2)}
                    </span>
                    &nbsp;more for free shipping.
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-dashed border-slate-200" />

              {/* Total */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-base font-bold text-slate-800">Total</span>
                <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-sm font-semibold shadow-md shadow-indigo-200 transition-all"
              >
                Proceed to Checkout
              </button>

              {/* Continue shopping */}
              <div className="mt-4 text-center">
                <Link
                  to="/shop"
                  className="text-sm text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Divider */}
              <div className="mt-5 border-t border-slate-100 pt-4">
                {/* Security badges */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <Lock size={13} className="text-slate-400" />
                  <span>Secure Checkout — SSL Encrypted</span>
                </div>
                <div className="mt-3 flex items-center justify-center gap-3 flex-wrap">
                  {['Visa', 'Mastercard', 'PayPal', 'Amex'].map((brand) => (
                    <span
                      key={brand}
                      className="px-2.5 py-1 rounded-md border border-slate-200 text-[10px] font-semibold text-slate-400 tracking-wide"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
