import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({ rating, reviews, showCount = true, size = 'sm' }) => {
  const stars = [1, 2, 3, 4, 5];
  const starSize = size === 'lg' ? 18 : size === 'md' ? 15 : 13;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
        {stars.map(star => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star === Math.ceil(rating) && rating % 1 !== 0;
          return (
            <span key={star} className="relative">
              <Star
                size={starSize}
                className="text-slate-200"
                fill="currentColor"
              />
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : `${(rating % 1) * 100}%` }}
                >
                  <Star
                    size={starSize}
                    className="text-amber-400"
                    fill="currentColor"
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showCount && (
        <span className={`font-semibold text-slate-700 ${size === 'lg' ? 'text-base' : 'text-xs'}`}>
          {rating}
        </span>
      )}
      {showCount && reviews !== undefined && (
        <span className={`text-slate-400 ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
          ({reviews.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default Rating;
