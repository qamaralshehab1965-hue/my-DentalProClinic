import React, { useEffect, useState } from "react";
import "./doctorReviews.css";

function DoctorReviews() {
  const [reviews, setReviews] = useState([]);

  const doctorId = localStorage.getItem("doctorId");
  console.log("doctorId:", doctorId);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (role !== "doctor") {
    return (
      <div className="not-allowed">
        <h2>❌ Access Denied</h2>
        <p>Only doctors can view this page.</p>
      </div>
    );
  }

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/reviews/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.log("Error fetching reviews:", err);
      }
    }

    fetchReviews();
  }, [doctorId, token]);

  return (
    <div className="doctor-comments-container">
      <h1 className="comments-title">Patient Reviews</h1>

      {reviews.length === 0 ? (
        <p className="no-comments">No reviews yet</p>
      ) : (
        <div className="comments-grid">
          {reviews.map((r) => (
            <div key={r.id} className="comment-card">
              <div className="comment-header">
                <h3>
                  {r.patient_firstname} {r.patient_lastname}
                </h3>
                <span className="rating">{r.rating} ⭐</span>
              </div>

              <p className="comment-text">{r.comment}</p>

              <span className="comment-date">
                {new Date(r.created_at).toLocaleDateString("en-US")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorReviews;
