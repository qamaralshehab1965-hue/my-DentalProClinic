import React, { useEffect, useState } from "react";
import "./patientReview.css";

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("http://localhost:3000/api/reviews/public");

        const data = await res.json();

        setReviews(data);
      } catch (err) {
        console.log("Error fetching reviews:", err);
      }
    }

    fetchReviews();
  }, []);

  return (
    <div className="reviews-page">
      <div className="reviews-container">
        <h1 className="comments-title">Patient Reviews</h1>

        {reviews.length === 0 ? (
          <p className="no-comments">No reviews yet</p>
        ) : (
          <div className="comments-grid">
            {reviews.map((r) => (
              <div key={r.id} className="comment-card">
                <div className="comment-header">
                  <h3>
                    Dr. {r.doctor_firstname} {r.doctor_lastname}
                  </h3>

                  <span className="rating">{r.rating} ⭐</span>
                </div>

                <div className="service-name">Service: {r.service_name}</div>

                <p className="comment-text">{r.comment}</p>

                <span className="comment-date">
                  {new Date(r.created_at).toLocaleDateString("en-US")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewsPage;
