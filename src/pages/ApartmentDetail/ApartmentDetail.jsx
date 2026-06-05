import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import ApartmentHeader from '../../components/ApartmentHeader/ApartmentHeader';
import AISummary from '../../components/AISummary/AISummary';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import ReviewDialog from '../../components/ReviewDialog/ReviewDialog';
import { useAuth } from '../../context/AuthContext';
import { apartments, reviews as seedReviews } from '../../data/mockData';
import './ApartmentDetail.css';

function ApartmentDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const apt = apartments.find((a) => a.id === Number(id));

  const [reviews, setReviews] = useState(
    seedReviews.filter((r) => r.aptId === Number(id))
  );
  const [showModal, setShowModal] = useState(false);

  if (!apt) {
    return (
      <div className="detail-page">
        <AppNavbar />
        <main className="detail-main">
          <p>Apartment not found.</p>
        </main>
      </div>
    );
  }

  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  function handleSubmitReview({ rating, body }) {
    const newReview = {
      id: Date.now(),
      aptId: apt.id,
      userId: user.id,
      author: user.name,
      initials: user.initials,
      rating,
      body,
      date: new Date().toISOString().split('T')[0],
      comments: [],
    };
    setReviews((prev) => [newReview, ...prev]);
  }

  return (
    <div className="detail-page">
      <AppNavbar />

      <main className="detail-main">
        <Link to="/apartments" className="back-link">← Back to all apartments</Link>

        <ApartmentHeader apartment={apt} reviewCount={reviews.length} />

        {apt.aiSummary && (
          <AISummary summary={apt.aiSummary} issues={apt.aiIssues} />
        )}

        <div className="detail-body">
          <div className="detail-reviews">
            <div className="reviews-header">
              <h2 className="reviews-title">Reviews ({reviews.length})</h2>
              <button className="write-review-btn" onClick={() => setShowModal(true)}>
                + Write a Review
              </button>
            </div>

            {reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to write one.</p>
            ) : (
              reviews.map((r) => <ReviewCard key={r.id} {...r} />)
            )}
          </div>

          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Property Info</h3>
              <div className="info-row">
                <span className="info-label">Landlord</span>
                <span className="info-value">{apt.landlord}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Units</span>
                <span className="info-value">{apt.units}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Year built</span>
                <span className="info-value">{apt.yearBuilt}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Neighbourhood</span>
                <span className="info-value">{apt.neighborhood}</span>
              </div>
            </div>

            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Rating Breakdown</h3>
              {breakdown.map(({ star, count }) => (
                <div key={star} className="breakdown-row">
                  <span className="breakdown-star">{star}</span>
                  <div className="breakdown-track">
                    <div
                      className="breakdown-fill"
                      style={{
                        width: reviews.length
                          ? `${(count / reviews.length) * 100}%`
                          : '0%',
                      }}
                    />
                  </div>
                  <span className="breakdown-count">{count}</span>
                </div>
              ))}
            </div>

            <button className="sidebar-write-btn" onClick={() => setShowModal(true)}>
              Write a Review
            </button>
          </aside>
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ReviewDialog
              onClose={() => setShowModal(false)}
              onSubmit={handleSubmitReview}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ApartmentDetail;
