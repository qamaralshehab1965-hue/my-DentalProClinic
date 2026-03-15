import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./doctor.css";

function Doctor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const doctor_id = id;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [services, setServices] = useState([]);
  const [service_id, setServiceId] = useState("");

  const [statusMessage, setStatusMessage] = useState("");
  const [bookingSent, setBookingSent] = useState(false);

  const doctorImages = {
    1: "/d.jpeg",
    2: "/di.jpeg",
    3: "/do.jpeg",
  };

  const doctorNames = {
    1: "Dr Ali Ahmed",
    2: "Dr Sara Mohamad",
    3: "Dr Omar Khaled",
  };

  const doctorSpecialties = {
    1: "Oral Surgery",
    2: "Orthodontics",
    3: "Cosmetic Dentistry",
  };

  const doctorImage = doctorImages[doctor_id];

  useEffect(() => {
    fetchServices();
    checkMyAppointment();
    checkLocalStatus();

    const interval = setInterval(() => {
      checkMyAppointment();
    }, 5000);

    return () => clearInterval(interval);
  }, [doctor_id]);

  async function fetchServices() {
    const res = await fetch(
      `http://localhost:3000/api/doctors/services/doctor/${doctor_id}`,
    );

    const data = await res.json();
    setServices(data);
  }

  function checkLocalStatus() {
    const saved = localStorage.getItem("myBookingStatus");

    if (!saved) return;

    const data = JSON.parse(saved);

    const now = Date.now();

    if (data.doctor != doctor_id) return;

    if (now - data.time < 120000) {
      setStatusMessage("⏳ Waiting for doctor approval");
      setBookingSent(true);
    } else {
      localStorage.removeItem("myBookingStatus");
    }
  }

  async function checkMyAppointment() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(
      `http://localhost:3000/api/appointments/my/${doctor_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (!data) {
      localStorage.removeItem("myBookingStatus");
      setStatusMessage("");
      setBookingSent(false);
      return;
    }

    if (data.status === "booked") {
      setStatusMessage("⏳ Waiting for doctor approval");
    }

    if (data.status === "completed") {
      setStatusMessage("✅ Appointment confirmed");
      localStorage.removeItem("myBookingStatus");
    }

    if (data.status === "cancelled") {
      setStatusMessage("❌ Appointment cancelled");
      localStorage.removeItem("myBookingStatus");
    }

    if (data.status === "deleted") {
      setStatusMessage("🗑️ Your appointment was deleted");
      localStorage.removeItem("myBookingStatus");
    }
  }

  async function handleConfirm() {
    const token = localStorage.getItem("token");

    if (!token) {
      setStatusMessage("You must login first");
      navigate("/login");
      return;
    }

    if (bookingSent) return;

    if (!date || !time || !service_id) {
      setStatusMessage("Please select date, time and service");
      return;
    }

    const fullDateTime = new Date(`${date} ${time}`).toISOString();

    const res = await fetch(
      "http://localhost:3000/api/appointments/addFromUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctor_id,
          appointment_datetime: fullDateTime,
          service_id: service_id,
        }),
      },
    );

    if (res.ok) {
      setStatusMessage("⏳ Waiting for doctor approval");
      setBookingSent(true);

      const statusData = {
        doctor: doctor_id,
        time: Date.now(),
      };

      localStorage.setItem("myBookingStatus", JSON.stringify(statusData));
    }
  }

  return (
    <div className="doctor-container">
      <video autoPlay loop muted className="doctor-video">
        <source src="/clinc.MP4" type="video/mp4" />
      </video>

      <div className="doctor-card">
        <img src={doctorImage} alt="Doctor" className="doctor-image" />

        <h2>{doctorNames[doctor_id]}</h2>

        <p className="specialty">{doctorSpecialties[doctor_id]}</p>

        <div className="booking-box">
          <label>Select Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />

          <label>Select Time</label>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input-field"
          />

          <label>Select Service</label>

          <select
            value={service_id}
            onChange={(e) => setServiceId(e.target.value)}
            className="input-field"
          >
            <option value="">Select Service</option>

            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.service_name}
              </option>
            ))}
          </select>

          <button
            className="confirm-btn"
            onClick={handleConfirm}
            disabled={bookingSent}
          >
            Send Booking Request
          </button>
        </div>

        {statusMessage && <div className="booking-status">{statusMessage}</div>}
      </div>
    </div>
  );
}

export default Doctor;
