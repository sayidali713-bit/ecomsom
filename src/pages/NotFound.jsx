import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden px-4">
      {/* Decorative background blobs */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top-left gradient blob */}
        <defs>
          <radialGradient id="blob1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="blob2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ede9fe" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="blob3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ddd6fe" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ddd6fe" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="10%" cy="20%" rx="380" ry="340" fill="url(#blob1)" />
        <ellipse cx="90%" cy="75%" rx="420" ry="380" fill="url(#blob2)" />
        <ellipse cx="55%" cy="55%" rx="280" ry="240" fill="url(#blob3)" />
      </svg>

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Large 404 */}
        <p
          aria-hidden="true"
          className="text-8xl sm:text-[10rem] font-black text-indigo-200 leading-none select-none"
        >
          404
        </p>

        {/* Divider line */}
        <div className="mx-auto w-16 h-1 rounded-full bg-indigo-300 mb-6" />

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          <br className="hidden sm:block" />
          Let&apos;s get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Home size={16} />
            Back to Home
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-semibold text-sm border border-gray-200 transition-all duration-200 shadow-sm"
          >
            <ShoppingBag size={16} />
            Go to Shop
          </button>
        </div>

        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-indigo-500 transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          Go back to previous page
        </button>
      </div>
    </div>
  );
}
