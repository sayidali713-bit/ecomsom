import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

/* ─────────────────────────────────────────────
   Utility – filter products by a search query
───────────────────────────────────────────── */
const filterProducts = (query) => {
  if (!query) return [];
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q)
  );
};

/* ─────────────────────────────────────────────
   SearchResults page
───────────────────────────────────────────── */
const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const rawQuery = searchParams.get('q') || '';
  const query = rawQuery.trim();

  // local search-bar state (mirrors URL query, lets user type before submitting)
  const [inputValue, setInputValue] = useState(rawQuery);

  // loading + results state
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  /* Whenever the URL query changes, re-run search with 600 ms skeleton */
  useEffect(() => {
    setInputValue(rawQuery);

    if (!query) return;

    setLoading(true);
    const timer = setTimeout(() => {
      setResults(filterProducts(query));
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Redirect when there is no query at all */
  if (!rawQuery) {
    return <Navigate to="/shop" replace />;
  }

  /* ── Handlers ── */
  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (!trimmed) return;
      setSearchParams({ q: trimmed });
    },
    [inputValue, setSearchParams]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchSubmit(e);
  };

  /* ── Skeleton count: match expected grid density ── */
  const SKELETON_COUNT = 8;

  return (
    <div className="page-enter min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span className="text-slate-300">/</span>
          <Link to="/shop" className="hover:text-indigo-600 transition-colors">Shop</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-medium truncate max-w-[200px]" aria-current="page">
            Search
          </span>
        </nav>

        {/* ── Page header ── */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
            Search results for{' '}
            <span className="text-indigo-600">&ldquo;{query}&rdquo;</span>
          </h1>
          {!loading && (
            <p className="text-slate-500 text-sm mt-1">
              {results.length === 0
                ? 'No products matched your search.'
                : `${results.length} product${results.length !== 1 ? 's' : ''} found`}
            </p>
          )}
        </header>

        {/* ── Search-again bar ── */}
        <form
          onSubmit={handleSearchSubmit}
          role="search"
          aria-label="Search products"
          className="mb-10"
        >
          <div className="relative max-w-xl">
            <label htmlFor="search-input" className="sr-only">
              Search products
            </label>
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              <Search size={18} aria-hidden="true" />
            </span>
            <input
              id="search-input"
              type="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products…"
              autoComplete="off"
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute inset-y-0 right-0 px-5 rounded-r-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:bg-indigo-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </form>

        {/* ── Loading skeleton ── */}
        {loading && (
          <LoadingSkeleton type="product" count={SKELETON_COUNT} />
        )}

        {/* ── Results grid ── */}
        {!loading && results.length > 0 && (
          <section aria-label="Search results">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* ── Empty state ── */}
        {!loading && results.length === 0 && (
          <EmptyState
            icon={Search}
            title="No products found"
            description={`Try different keywords or browse our categories.`}
            actionTo="/shop"
            actionLabel="Browse All Products"
          />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
