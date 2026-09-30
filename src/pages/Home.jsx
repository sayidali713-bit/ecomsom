import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Truck,
  RefreshCw,
  Shield,
  Headphones,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { categories, getFeaturedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useToast } from '../context/ToastContext';

/* ─── Loading Skeleton ─────────────────────────────────────────────────────── */
const LoadingSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm">
        <div className="skeleton aspect-square w-full" />
        <div className="p-4 space-y-2">
          <div className="skeleton h-3 w-1/3 rounded" />
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
          <div className="skeleton h-9 w-full rounded-xl mt-3" />
        </div>
      </div>
    ))}
  </div>
);

/* ─── Why E-COM Feature Cards data ────────────────────────────────────────── */
const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $50',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '256-bit SSL encryption',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Always here to help',
    bg: 'bg-slate-50',
    iconColor: 'text-slate-600',
  },
];

/* ─── Home Page ────────────────────────────────────────────────────────────── */
const Home = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [productsLoading, setProductsLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  /* Simulate async product load */
  useEffect(() => {
    const timer = setTimeout(() => {
      setFeaturedProducts(getFeaturedProducts().slice(0, 8));
      setProductsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribing(true);
    setTimeout(() => {
      addToast('🎉 You\'re subscribed! Welcome to E-COM.', 'success');
      setEmail('');
      setSubscribing(false);
    }, 600);
  };

  return (
    <div className="page-enter min-h-screen">

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-800 to-violet-700">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — Copy */}
            <div
              className="page-enter text-center lg:text-left"
              style={{ animationDelay: '0ms' }}
            >
              {/* Eyebrow */}
              <span
                className="page-enter inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-indigo-200 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10"
                style={{ animationDelay: '100ms' }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                New arrivals every week
              </span>

              <h1
                className="page-enter text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6"
                style={{ animationDelay: '200ms' }}
              >
                Discover Products{' '}
                <span className="bg-gradient-to-r from-violet-300 to-indigo-200 bg-clip-text text-transparent">
                  You'll Love
                </span>
              </h1>

              <p
                className="page-enter text-indigo-200 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
                style={{ animationDelay: '300ms' }}
              >
                Explore quality products, discover new favorites, and enjoy a
                simple shopping experience with E-COM.
              </p>

              <div
                className="page-enter flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                style={{ animationDelay: '400ms' }}
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-indigo-700 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-indigo-50 transition-all duration-200 active:scale-95"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/categories"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 active:scale-95"
                >
                  Explore Categories
                  <ChevronRight size={18} />
                </Link>
              </div>

              {/* Stats bar */}
              <div
                className="page-enter mt-12 flex flex-wrap gap-6 justify-center lg:justify-start text-center lg:text-left"
                style={{ animationDelay: '500ms' }}
              >
                {[
                  { value: '10K+', label: 'Products' },
                  { value: '50K+', label: 'Happy Customers' },
                  { value: '4.9★', label: 'Avg. Rating' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                    <p className="text-indigo-300 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Product showcase image */}
            <div
              className="page-enter hidden lg:flex items-center justify-center"
              style={{ animationDelay: '250ms' }}
            >
              <div className="relative">
                {/* Glowing ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-400/40 to-indigo-400/20 blur-2xl scale-110" />
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                  alt="E-COM product showcase"
                  className="relative rounded-3xl shadow-2xl object-cover w-full max-w-lg aspect-[4/3] border border-white/10"
                  loading="eager"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <Truck size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Free delivery</p>
                    <p className="text-sm font-bold text-slate-800">Orders over $50</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Shield size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Guaranteed</p>
                    <p className="text-sm font-bold text-slate-800">Safe checkout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. FEATURED CATEGORIES SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">
                Browse
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Shop by Category
              </h2>
            </div>
            <Link
              to="/categories"
              className="inline-flex items-center gap-1.5 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
            >
              View all categories
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/shop?category=${cat.id}`)}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-left"
                style={{ animationDelay: `${index * 60}ms` }}
                aria-label={`Shop ${cat.name}`}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 group-hover:opacity-75 transition-opacity duration-300`} />
                </div>

                {/* Text overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-3">
                  <p className="text-white font-bold text-sm leading-tight drop-shadow">
                    {cat.name}
                  </p>
                  <p className="text-white/80 text-xs mt-0.5 line-clamp-1 hidden sm:block">
                    {cat.description.split(',')[0]}
                  </p>
                </div>

                {/* Arrow icon on hover */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                  <ArrowRight size={13} className="text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. FEATURED PRODUCTS SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">
                Curated for you
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Featured Products
              </h2>
              <p className="text-slate-500 mt-2">Handpicked favorites for you</p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
            >
              View all products
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Products grid or skeleton */}
          {productsLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* CTA */}
          {!productsLoading && (
            <div className="text-center mt-12">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                Browse All Products
                <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. WHY E-COM SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">
              Our Promise
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Why Choose E-COM
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              We go the extra mile so your shopping experience is seamless,
              secure, and satisfying.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="group flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-slate-100"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div
                    className={`w-16 h-16 ${feat.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={30} className={feat.iconColor} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-slate-500 text-sm">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. NEWSLETTER SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
            <Mail size={28} className="text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Stay in the Loop
          </h2>
          <p className="text-indigo-200 text-lg mb-10 max-w-lg mx-auto">
            Get exclusive deals, new arrivals, and style tips delivered straight
            to your inbox. No spam — ever.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3.5 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/60 focus:bg-white/20 transition-all"
            />
            <button
              type="submit"
              disabled={subscribing}
              className="px-7 py-3.5 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap shadow-md"
            >
              {subscribing ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>

          <p className="text-indigo-300 text-xs mt-5">
            By subscribing you agree to our{' '}
            <Link to="/privacy" className="underline hover:text-white transition-colors">
              Privacy Policy
            </Link>
            . Unsubscribe anytime.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Home;
