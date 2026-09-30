import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Heart, Search, User, Menu, X, Zap,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg"
              aria-label="E-COM Home"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-indigo-600">E</span>
                <span className="text-slate-800">-COM</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      isActive
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1">
              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search products…"
                    className="w-48 sm:w-64 px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    aria-label="Search products"
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="ml-1 p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                    aria-label="Close search"
                  >
                    <X size={18} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  aria-label="Open search"
                >
                  <Search size={20} />
                </button>
              )}

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative hidden sm:flex p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label={`Cart (${itemCount} items)`}
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <button
                className="hidden sm:flex p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Account"
              >
                <User size={20} />
              </button>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setMobileOpen(prev => !prev)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            ref={menuRef}
            className="lg:hidden border-t border-slate-100 bg-white menu-enter"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2 pt-3 border-t border-slate-100 flex items-center gap-3">
                <Link
                  to="/wishlist"
                  onClick={closeMobile}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 flex-1"
                >
                  <Heart size={18} />
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="ml-auto w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
