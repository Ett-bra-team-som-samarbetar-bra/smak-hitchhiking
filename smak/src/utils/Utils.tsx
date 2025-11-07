import React from 'react';

export function renderRatingStars(rating: string | undefined): React.ReactElement[] {
  const stars = [];
  const numericRating = typeof rating === 'string' ? parseFloat(rating) : (rating || 0);

  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= Math.ceil(numericRating);  // Round up: 2.5 -> 3 stars
    stars.push(
      <i key={i}
        className={`bi ${isFilled ? 'bi-star-fill' : 'bi-star'} text-warning`} />
    );
  }
  return stars;
}
