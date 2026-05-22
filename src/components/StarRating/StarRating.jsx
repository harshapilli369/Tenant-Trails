import './StarRating.css';

function StarRating({ rating, max = 5 }) {
  return (
    <div className="star-rating" aria-label={`Rating: ${rating} out of ${max}`}>
      <div className="stars-empty">{'★'.repeat(max)}</div>
      <div
        className="stars-filled"
        style={{ width: `${(rating / max) * 100}%` }}
      >
        {'★'.repeat(max)}
      </div>
    </div>
  );
}

export default StarRating;
