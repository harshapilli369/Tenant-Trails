import StarRating from '../StarRating/StarRating';
import './ReviewCard.css';

function ReviewCard({ author, initials, rating, body, date, comments = [] }) {
  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-author-info">
          <div className="review-avatar">{initials}</div>
          <div>
            <span className="review-author-name">{author}</span>
            <span className="review-date">{date}</span>
          </div>
        </div>
        <StarRating rating={rating} />
      </div>

      <p className="review-body">{body}</p>

      {comments.length > 0 && (
        <div className="review-comments">
          {comments.map((c) => (
            <div key={c.id} className="review-comment">
              <div className="comment-header">
                <div className="comment-avatar">{c.initials}</div>
                <span className="comment-author">{c.author}</span>
                <span className="comment-date">{c.date}</span>
              </div>
              <p className="comment-body">{c.body}</p>
            </div>
          ))}
        </div>
      )}

      {comments.length > 0 && (
        <span className="review-comment-count">
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </span>
      )}
    </div>
  );
}

export default ReviewCard;
