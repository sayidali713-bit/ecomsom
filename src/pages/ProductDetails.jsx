import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Zap, Package, ChevronLeft, Minus, Plus, Star, ChevronRight, Check } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import Rating from '../components/Rating';
import ProductCard from '../components/ProductCard';
import { ProductDetailSkeleton } from '../components/LoadingSkeleton';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setQuantity(1);
    setActiveImage(0);
    const timer = setTimeout(() => {
      const found = getProductById(id);
      setProduct(found || null);
      if (found) setRelatedProducts(getRelatedProducts(found, 4));
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <Package size={48} className="text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p className="text-slate-500 mb-6">This product doesn't exist or has been removed.</p>
        <Link to="/shop" className="btn-primary">Browse All Products</Link>
      </div>
    );
  }

  // Simulate 4 gallery images using the same image
  const images = [product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    addToast(`"${product.name}" added to cart!`, 'success');
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    navigate('/cart');
  };

  const handleWishlist = () => {
    toggleItem(product);
    addToast(
      isInWishlist(product.id) ? 'Removed from wishlist' : `"${product.name}" added to wishlist!`,
      isInWishlist(product.id) ? 'info' : 'success'
    );
  };

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-indigo-600 transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-indigo-600 transition-colors">
            {product.categoryName}
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-600 line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4">
                  <span className="badge bg-red-500 text-white text-sm px-3 py-1">-{product.discount}%</span>
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`rounded-xl overflow-hidden aspect-square border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    activeImage === i ? 'border-indigo-600' : 'border-transparent hover:border-slate-200'
                  }`}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={activeImage === i}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <Link
              to={`/shop?category=${product.category}`}
              className="inline-flex items-center gap-1.5 mb-3"
            >
              <span className="badge bg-indigo-100 text-indigo-700">{product.categoryName}</span>
            </Link>

            <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-3">
              {product.name}
            </h1>

            <div className="mb-5">
              <Rating rating={product.rating} reviews={product.reviews} size="md" />
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="badge bg-red-100 text-red-700 text-sm">Save {product.discount}%</span>
                </>
              )}
            </div>

            {product.originalPrice > product.price && (
              <p className="text-sm text-emerald-600 font-medium mb-5">
                You save ${(product.originalPrice - product.price).toFixed(2)}
              </p>
            )}

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              {product.stock > 0 ? (
                <>
                  <Check size={16} className="text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600">
                    In Stock ({product.stock} available)
                  </span>
                </>
              ) : (
                <>
                  <Package size={16} className="text-red-500" />
                  <span className="text-sm font-medium text-red-600">Out of Stock</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed mb-6 text-sm">{product.description}</p>

            <hr className="border-slate-100 mb-6" />

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-slate-700">Quantity</span>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors focus:outline-none focus:bg-slate-100"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors focus:outline-none focus:bg-slate-100"
                  disabled={quantity >= product.stock}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="text-sm text-slate-400">Max {product.stock}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  inCart
                    ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm hover:shadow-md'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ShoppingCart size={18} />
                {inCart ? 'In Cart — Add More' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap size={18} />
                Buy Now
              </button>
            </div>

            <button
              onClick={handleWishlist}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 ${
                inWishlist
                  ? 'text-rose-600 bg-rose-50 border border-rose-200'
                  : 'text-slate-500 bg-slate-50 border border-slate-200 hover:border-rose-200 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
              {inWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-slate-900 mb-5">Specifications</h2>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div
                  key={key}
                  className={`flex gap-4 px-6 py-4 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
                >
                  <dt className="w-40 flex-shrink-0 text-sm font-medium text-slate-500">{key}</dt>
                  <dd className="text-sm text-slate-800">{value}</dd>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">You May Also Like</h2>
              <Link
                to={`/shop?category=${product.category}`}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
