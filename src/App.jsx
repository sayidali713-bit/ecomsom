import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Categories = lazy(() => import('./pages/Categories'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Page loading fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" style={{ borderWidth: '3px' }} />
      <p className="text-sm text-slate-400 font-medium">Loading…</p>
    </div>
  </div>
);

// Layout wrapper
const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1" id="main-content">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/index.html" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
