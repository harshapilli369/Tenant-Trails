import { useState } from 'react';
import './ReviewDialog.css';

function ReviewDialog({ onClose, onSubmit, initialRating = 0, initialBody = '', mode = 'create' }) {
  const [rating, setRating] = useState(initialRating);
  const [hovered, setHovered] = useState(0);
  const [body, setBody] = useState(initialBody);

  function handleSubmit() {
    if (rating === 0 || !body.trim()) return;
    onSubmit({ rating, body });
    onClose();
  }

  const title = mode === 'edit' ? 'Edit Review' : 'Write a Review';
  const submitLabel = mode === 'edit' ? 'Save Changes' : 'Submit Review';
  const displayRating = hovered || rating;

  return (
    <div className="review-dialog">
      <div className="dialog-header">
        <h2 className="dialog-title">{title}</h2>
        <button className="dialog-close" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <div className="dialog-field">
        <label className="dialog-label">Your rating</label>
        <div className="star-input">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`star-btn ${n <= displayRating ? 'star-btn-filled' : ''}`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              role="button"
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
            >
              {n <= displayRating ? '★' : '☆'}
            </span>
          ))}
        </div>
        {rating > 0 && (
          <span className="star-label">{rating} of 5</span>
        )}
      </div>

      <div className="dialog-field">
        <label className="dialog-label">Your review</label>
        <textarea
          className="dialog-textarea"
          placeholder="What was your experience living here? Cover maintenance, responsiveness, noise, pests, deposit handling, and anything future tenants should know."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
        />
      </div>

      {mode === 'create' && (
        <div className="dialog-field">
          <label className="dialog-label">Attach photos or videos (optional)</label>
          <div className="dialog-upload">
            <span className="upload-icon">📎</span>
            <span className="upload-text">Click to upload</span>
            <span className="upload-hint">JPG, PNG, MP4 up to 10MB</span>
          </div>
        </div>
      )}

      <div className="dialog-actions">
        <button className="dialog-cancel" onClick={onClose}>Cancel</button>
        <button
          className="dialog-submit"
          onClick={handleSubmit}
          disabled={rating === 0 || !body.trim()}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}

export default ReviewDialog;
