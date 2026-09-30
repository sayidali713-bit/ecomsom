import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

// ─── Constants ────────────────────────────────────────────────────────────────
const PRODUCTS_PER_PAGE = 12;

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'newest',     label: 'Newest' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Highest Rated' },
];

const RATING_OPTIONS = [
  { value: 4, label: '4★ & up' },
  { value: 3, label: '3★ & up' },
  { value: 2, label: '2★ & up' },
  { value: 0, label: 'All ratings' },
];

// ─── Helper ───────────────────────────────────────────────────────────────────
const clamp = (val, min, max) => Math.min(Math.max(Number(val) || 0, min), max);

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Reusable radio-button group */
const RadioGroup = ({ name, options, value, onChange }) => (
  <div className="space-y-2">
    {options.map((opt) => (
      <label
        key={opt.value}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <input
          type="radio"
          name={name}
          value={opt.value}
          checked={value === opt.value}
          onChange={() => onChange(opt.value)}
          className="accent-indigo-600 w-4 h-4 cursor-pointer"
        />
        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
          {opt.label}
        </span>
      </label>
    ))}
  </div>
);

/** Section title inside the sidebar */
const FilterSection = ({ title, children }) => (
  <div className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
      {title}
    </h3>
    {children}
  </div>
);

/** The entire filter panel (shared between sidebar & mobile drawer) */
const FilterPanel = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
  sortBy,
  setSortBy,
  onClearAll,
}) => {
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

  return (
    <div className="space-y-5">
      {/* Search */}
      <FilterSection title="Search">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="search"
            placeholder="Search products…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                       placeholder-slate-400 bg-slate-50 transition"
          />
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category">
        <RadioGroup
          name="category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
        />
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
            <input
              type="number"
              min={0}
              max={priceRange.max}
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange((prev) => ({
                  ...prev,
                  min: clamp(e.target.value, 0, prev.max),
                }))
              }
              className="w-full pl-6 pr-2 py-2 text-sm border border-slate-200 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-slate-50"
              placeholder="Min"
            />
          </div>
          <span className="text-slate-400 text-xs shrink-0">to</span>
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
            <input
              type="number"
              min={priceRange.min}
              max={10000}
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange((prev) => ({
                  ...prev,
                  max: clamp(e.target.value, prev.min, 10000),
                }))
              }
              className="w-full pl-6 pr-2 py-2 text-sm border border-slate-200 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-slate-50"
              placeholder="Max"
            />
          </div>
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Minimum Rating">
        <RadioGroup
          name="rating"
          options={RATING_OPTIONS}
          value={selectedRating}
          onChange={(val) => setSelectedRating(Number(val))}
        />
      </FilterSection>

      {/* Sort */}
      <FilterSection title="Sort By">
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                       bg-slate-50 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      </FilterSection>

      {/* Clear All */}
      <button
        onClick={onClearAll}
        className="w-full py-2 px-4 text-sm font-medium text-indigo-600 border border-indigo-200
                   rounded-xl hover:bg-indigo-50 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

// ─── Pagination ───────────────────────────────────────────────────────────────
const Pagination = ({ currentPage, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show at most 7 page buttons; ellipsis handled simply via slice
  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;
    if (currentPage <= 4) return [...pages.slice(0, 5), '…', totalPages];
    if (currentPage >= totalPages - 3)
      return [1, '…', ...pages.slice(totalPages - 5)];
    return [1, '…', currentPage - 1, currentPage, currentPage + 1, '…', totalPages];
  };

  const btnBase =
    'w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400';

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5 mt-12"
    >
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Previous page"
      >
        ‹
      </button>

      {getVisiblePages().map((page, idx) =>
        page === '…' ? (
          <span key={`ellipsis-${idx}`} className="w-9 text-center text-slate-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`${btnBase} ${
              page === currentPage
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Shop = () => {
  const [searchParams] = useSearchParams();

  // ── State ──────────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery]         = useState('');
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('category') ?? '');
  const [priceRange, setPriceRange]           = useState({ min: 0, max: 1000 });
  const [selectedRating, setSelectedRating]   = useState(0);
  const [sortBy, setSortBy]                   = useState('featured');
  const [currentPage, setCurrentPage]         = useState(1);
  const [isLoading, setIsLoading]             = useState(true);
  const [showFilters, setShowFilters]         = useState(false);

  // Apply ?category= search param on first mount
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Simulate 800 ms load on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Reset to page 1 whenever filters/search/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange, selectedRating, sortBy]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = showFilters ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showFilters]);

  // ── Derived data ───────────────────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search (name, description, categoryName)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }

    // Price range
    result = result.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Rating
    if (selectedRating > 0) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    // Sort
    switch (sortBy) {
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, selectedRating, sortBy]);

  const totalPages    = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // ── Actions ────────────────────────────────────────────────────────────────
  const handleClearAll = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 1000 });
    setSelectedRating(0);
    setSortBy('featured');
    setCurrentPage(1);
  }, []);

  const filterProps = {
    searchQuery,      setSearchQuery,
    selectedCategory, setSelectedCategory,
    priceRange,       setPriceRange,
    selectedRating,   setSelectedRating,
    sortBy,           setSortBy,
    onClearAll: handleClearAll,
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-slate-900">Shop</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Discover our full collection of premium products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* ── Desktop Sidebar ──────────────────────────────────────────── */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sticky top-24 shadow-sm">
              <FilterPanel {...filterProps} />
            </div>
          </aside>

          {/* ── Main Content ─────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              {/* Result count */}
              <p className="text-sm text-slate-500">
                {isLoading ? (
                  <span className="inline-block h-4 w-36 skeleton rounded" />
                ) : (
                  <>
                    Showing{' '}
                    <span className="font-semibold text-slate-800">
                      {filteredProducts.length === 0
                        ? 0
                        : `${(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–${Math.min(
                            currentPage * PRODUCTS_PER_PAGE,
                            filteredProducts.length
                          )}`}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold text-slate-800">
                      {filteredProducts.length}
                    </span>{' '}
                    products
                  </>
                )}
              </p>

              <div className="flex items-center gap-2">
                {/* Sort dropdown (visible on desktop too — mirrors sidebar) */}
                <div className="relative hidden sm:block">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none py-2 pl-3 pr-8 text-sm border border-slate-200 rounded-xl
                               focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>

                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 py-2 px-3.5 text-sm font-medium
                             bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <SlidersHorizontal size={15} />
                  Filters
                  {(selectedCategory || searchQuery || selectedRating > 0 ||
                    priceRange.min > 0 || priceRange.max < 1000) && (
                    <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                  )}
                </button>
              </div>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <LoadingSkeleton type="product" count={12} />
            ) : filteredProducts.length === 0 ? (
              <EmptyState
                icon={Search}
                title="No products found"
                description="We couldn't find any products matching your current filters. Try adjusting your search or clearing the filters."
                action={handleClearAll}
                actionLabel="Clear Filters"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ─────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setShowFilters(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          showFilters ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[90vw] bg-white shadow-2xl
                    flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
                      showFilters ? 'translate-x-0' : '-translate-x-full'
                    }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={17} className="text-indigo-600" />
            <h2 className="text-base font-semibold text-slate-800">Filters</h2>
          </div>
          <button
            onClick={() => setShowFilters(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500
                       hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Close filters"
          >
            <X size={17} />
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex-1 overflow-y-auto p-5">
          <FilterPanel
            {...filterProps}
            onClearAll={() => {
              handleClearAll();
              setShowFilters(false);
            }}
          />
        </div>

        {/* Drawer footer */}
        <div className="border-t border-slate-100 px-5 py-4 shrink-0">
          <button
            onClick={() => setShowFilters(false)}
            className="w-full py-2.5 text-sm font-semibold bg-indigo-600 text-white
                       rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            Show {filteredProducts.length} Results
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Shop;
