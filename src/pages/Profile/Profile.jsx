import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import ReviewDialog from '../../components/ReviewDialog/ReviewDialog';
import StarRating from '../../components/StarRating/StarRating';
import { useAuth } from '../../context/AuthContext';
import { reviews as seedReviews, apartments } from '../../data/mockData';
import './Profile.css';

function Profile() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState(
    seedReviews.filter((r) => r.userId === user.id)
  );
  const [editingReview, setEditingReview] = useState(null);

  function handleDelete(reviewId) {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  }

  function handleEdit(updated) {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === editingReview.id ? { ...r, rating: updated.rating, body: updated.body } : r
      )
    );
    setEditingReview(null);
  }

  function getApartmentName(aptId) {
    const apt = apartments.find((a) => a.id === aptId);
    return apt ? apt.name : 'Unknown';
  }

  const commentCount = seedReviews
    .flatMap((r) => r.comments || [])
    .filter((c) => c.userId === user.id).length;

  return (
    <div className="profile-page">
      <AppNavbar />

      <main className="profile-main">
        <Link to="/apartments" className="back-link">← Back to apartments</Link>

        <div className="profile-header-card">
          <div className="profile-avatar-lg">{user.initials}</div>
          <div className="profile-user-info">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-number">{reviews.length}</span>
              <span className="profile-stat-label">REVIEWS</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-number">{commentCount}</span>
              <span className="profile-stat-label">COMMENTS</span>
            </div>
          </div>
        </div>

        <h2 className="profile-section-title">Your Reviews</h2>

        {reviews.length === 0 ? (
          <p className="profile-empty">You have not written any reviews yet.</p>
        ) : (
          <div className="profile-reviews-list">
            {reviews.map((r) => (
              <div key={r.id} className="profile-review-row">
                <div className="profile-review-content">
                  <div className="profile-review-apt">
                    <span className="profile-review-apt-name">{getApartmentName(r.aptId)}</span>
                    <StarRating rating={r.rating} />
                  </div>
                  <p className="profile-review-body">
                    {r.body.length > 140 ? r.body.slice(0, 140) + '…' : r.body}
                  </p>
                </div>
                <div className="profile-review-actions">
                  <Link
                    to={`/apartment/${r.aptId}`}
                    className="action-btn action-view"
                  >
                    View
                  </Link>
                  <button
                    className="action-btn action-edit"
                    onClick={() => setEditingReview(r)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn action-delete"
                    onClick={() => handleDelete(r.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {editingReview && (
        <div className="modal-overlay" onClick={() => setEditingReview(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ReviewDialog
              mode="edit"
              initialRating={editingReview.rating}
              initialBody={editingReview.body}
              onClose={() => setEditingReview(null)}
              onSubmit={handleEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
