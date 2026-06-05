import StarRating from '../StarRating/StarRating';
import './ApartmentHeader.css';

function ApartmentHeader({ apartment, reviewCount }) {
  return (
    <div className="apt-header-card">
      <div className="apt-header-left">
        <h1 className="apt-header-name">{apartment.name}</h1>
        <p className="apt-header-address">
          <span className="apt-header-pin">📍</span>
          {apartment.address} · {apartment.neighborhood}
        </p>
        {apartment.description && (
          <p className="apt-header-desc">{apartment.description}</p>
        )}
      </div>
      <div className="apt-header-right">
        <span className="apt-header-rating-number">{apartment.rating.toFixed(1)}</span>
        <StarRating rating={apartment.rating} />
        <span className="apt-header-review-count">
          {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
        </span>
      </div>
    </div>
  );
}

export default ApartmentHeader;
