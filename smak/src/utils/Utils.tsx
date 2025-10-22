import React from 'react';

export function renderRatingStars(rating: number): React.ReactElement[] {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i
        key={i}
        className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'} text-warning`}
      />
    );
  }
  return stars;
}
