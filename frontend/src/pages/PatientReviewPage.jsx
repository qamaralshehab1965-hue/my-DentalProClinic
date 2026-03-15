import { useEffect, useState } from "react";
import "./patientReviewPage.css";

function PatientReviewPage() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [services, setServices] = useState([]);
  const [service_id, setServiceId] = useState("");
  const [warning, setWarning] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("http://localhost:3000/api/reviews/services");

        const data = await res.json();

        setServices(data);
      } catch (error) {
        console.log("Error loading services", error);
      }
    }

    loadServices();
  }, []);

  async function submitReview() {
    try {
      const res = await fetch("http://localhost:3000/api/reviews/add", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          service_id: service_id,
          rating,
          comment,
        }),
      });

      await res.json();

      if (!res.ok) {
        setWarning(
          "⚠️ You cannot add a review unless you have a completed appointment with the doctor",
        );
        return;
      }

      alert("Review submitted");

      setRating(0);
      setComment("");
      setWarning("");
    } catch (error) {
      console.log("Error submitting review", error);
    }
  }

  return (
    <div className="review-page">
      <div className="review-container">
        <h2>Leave a Review</h2>

        {warning && <p className="review-warning">{warning}</p>}

        <select
          value={service_id}
          onChange={(e) => setServiceId(e.target.value)}
          className="service-select"
        >
          <option value="">Select Service</option>

          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.service_name}
            </option>
          ))}
        </select>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={rating >= star ? "star active" : "star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="....Write your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="review-btn" onClick={submitReview}>
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default PatientReviewPage;
