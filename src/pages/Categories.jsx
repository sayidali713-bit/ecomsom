import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Package, Home, ChevronRight } from 'lucide-react';
import { categories, products } from '../data/products';
import { CategorySkeleton } from '../components/LoadingSkeleton';

// ---------------------------------------------------------------------------
// CategoryCard
// ---------------------------------------------------------------------------
const CategoryCard = ({ category }) => {
  const productCount = products.filter((p) => p.category === category.id).length;

  return (
    <article
      className="
        group bg-white rounded-2xl border border-slate-100 overflow-hidden
        shadow-sm hover:shadow-xl
        transition-all duration-300 ease-out
        hover:-translate-y-1
        flex flex-col
      "
    >
      {/* ── Image area ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="
            w-full h-full object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-105
          "
        />

        {/* Bottom gradient overlay */}
        <div
          className={`
            absolute inset-0
            bg-gradient-to-t from-black/70 via-black/20 to-transparent
          `}
        />

        {/* Category name overlaid on image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h2 className="text-2xl font-bold text-white drop-shadow-md leading-tight">
            {category.name}
          </h2>
        </div>

        {/* Colour accent stripe at top */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color}`} />
      </div>

      {/* ── Card body ──────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed flex-1">
          {category.description}
        </p>

        {/* Product count badge */}
        <div className="flex items-center gap-2">
          <span
            className={`
              inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
              bg-gradient-to-r ${category.color} text-white
            `}
          >
            <Package size={12} />
            {category.count.toLocaleString()} Products
          </span>

          {/* Live demo count (actual data) */}
          {productCount > 0 && (
            <span className="text-xs text-slate-400">
              ({productCount} in demo)
            </span>
          )}
        </div>

        {/* CTA button */}
        <Link
          to={`/shop?category=${category.id}`}
          className={`
            inline-flex items-center justify-center gap-2
            px-5 py-2.5 rounded-xl text-sm font-semibold
            bg-gradient-to-r ${category.color} text-white
            shadow-sm
            transition-all duration-200
            hover:shadow-md hover:gap-3
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2
          `}
          aria-label={`Explore ${category.name} category`}
        >
          Explore Category
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
};

// ---------------------------------------------------------------------------
// Categories page
// ---------------------------------------------------------------------------
const Categories = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate a 600 ms data-fetch delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-enter min-h-screen bg-slate-50">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-slate-400 mb-5"
          >
            <Link
              to="/"
              className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <Home size={14} />
              Home
            </Link>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-indigo-600 font-medium">Categories</span>
          </nav>

          {/* Title block */}
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              All Categories
            </h1>
            <p className="mt-3 text-lg text-slate-500 leading-relaxed">
              Explore our wide range of product categories and discover something you'll love.
            </p>
          </div>

          {/* Quick stat strip */}
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100">
                <Package size={14} className="text-indigo-600" />
              </span>
              <span>
                <strong className="text-slate-700 font-semibold">{categories.length}</strong> categories
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-violet-100">
                <Package size={14} className="text-violet-600" />
              </span>
              <span>
                <strong className="text-slate-700 font-semibold">
                  {categories.reduce((acc, c) => acc + c.count, 0).toLocaleString()}
                </strong>{' '}
                total products
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {loading ? (
          /* Skeleton grid */
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="Loading categories"
            aria-busy="true"
          >
            {[...Array(6)].map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* Live categories grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-label="Product categories"
            >
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col items-center gap-4 bg-white border border-slate-100 rounded-2xl shadow-sm px-10 py-8">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-50">
                  <Package size={26} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Can't find what you're looking for?
                  </h3>
                  <p className="mt-1 text-slate-500 text-sm">
                    Browse all products or use search to find exactly what you need.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/shop')}
                  className="
                    inline-flex items-center gap-2 px-6 py-3 rounded-xl
                    bg-gradient-to-r from-indigo-600 to-violet-600 text-white
                    font-semibold text-sm shadow-md
                    hover:shadow-lg hover:from-indigo-500 hover:to-violet-500
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2
                  "
                >
                  Browse All Products
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Categories;
