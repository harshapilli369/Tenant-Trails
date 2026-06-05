import { Link } from 'react-router-dom';
import StarRating from '../../components/StarRating/StarRating';
import './ApartmentCard.css';

function ApartmentCard({ id, name, address, neighborhood, rating, reviewCount, tags, image }) {
  return (
    <Link to={`/apartment/${id}`} className="apt-card-link">
    <div className="apt-card">
      <div className="apt-card-image">
        <img src={image} alt={name} className="apt-card-img" />
        <div className="apt-rating-badge">
          <span className="apt-rating-star">⭐</span>
          <span className="apt-rating-value">{rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="apt-card-body">
        <h3 className="apt-name">{name}</h3>
        <p className="apt-address">
          <span className="apt-pin">📍</span>
          {address} · {neighborhood}
        </p>

        <div className="apt-tags">
          {tags.map((tag) => (
            <span key={tag} className="apt-tag">{tag}</span>
          ))}
        </div>

        <div className="apt-card-footer">
          <span className="apt-review-count">{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
          <StarRating rating={rating} />
        </div>
      </div>
    </div>
    </Link>
  );
}

export default ApartmentCard;
