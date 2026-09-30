import React from 'react';

export const ProductSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
    <div className="aspect-square skeleton" />
    <div className="p-4 space-y-3">
      <div className="h-3 skeleton rounded w-1/3" />
      <div className="h-4 skeleton rounded w-4/5" />
      <div className="h-3 skeleton rounded w-2/3" />
      <div className="h-4 skeleton rounded w-1/4" />
      <div className="h-10 skeleton rounded-xl" />
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-4">
        <div className="aspect-square skeleton rounded-2xl" />
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square skeleton rounded-xl" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-6 skeleton rounded w-1/4" />
        <div className="h-8 skeleton rounded w-4/5" />
        <div className="h-4 skeleton rounded w-1/2" />
        <div className="h-10 skeleton rounded w-1/3" />
        <div className="h-24 skeleton rounded" />
        <div className="h-12 skeleton rounded-xl" />
        <div className="h-12 skeleton rounded-xl" />
      </div>
    </div>
  </div>
);

export const CategorySkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
    <div className="h-48 skeleton" />
    <div className="p-6 space-y-3">
      <div className="h-5 skeleton rounded w-2/3" />
      <div className="h-4 skeleton rounded" />
      <div className="h-4 skeleton rounded w-4/5" />
      <div className="h-3 skeleton rounded w-1/3" />
      <div className="h-10 skeleton rounded-xl" />
    </div>
  </div>
);

const LoadingSkeleton = ({ type = 'product', count = 8 }) => {
  const SkeletonComponent = type === 'category' ? CategorySkeleton : ProductSkeleton;
  const cols = type === 'category'
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <div className={`grid ${cols} gap-6`} aria-label="Loading products" aria-busy="true">
      {[...Array(count)].map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
