import "./services.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      const res = await fetch("http://localhost:3000/api/services");
      const data = await res.json();
      setServices(data);
    };

    getServices();
  }, []);

  const handleServiceClick = (doctorPage) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      navigate(doctorPage);
    }
  };

  return (
    <section className="services-section">
      <h2 className="section-title">Services</h2>

      <div className="services-grid">
        <div
          className="service-card"
          onClick={() => handleServiceClick("/doctor/1")}
        >
          <div className="icon">
            <img src="/faf.jpg" alt="Oral Surgery" />
          </div>
          <h3>Oral Surgery</h3>
          <p className="service-price">$200</p>
        </div>

        <div
          className="service-card"
          onClick={() => handleServiceClick("/doctor/2")}
        >
          <div className="icon">
            <img src="/ta.jpeg" alt="Orthodontics" />
          </div>
          <h3>Orthodontics 🦷</h3>
          <p className="service-price">$1200</p>
        </div>

        <div
          className="service-card"
          onClick={() => handleServiceClick("/doctor/3")}
        >
          <div className="icon">
            <img src="/ib.jpeg" alt="Teeth Whitening" />
          </div>
          <h3>Teeth Whitening</h3>
          <p className="service-price">$150</p>
        </div>

        {services.map((service) => (
          <div
            key={service.id}
            className="service-card"
            onClick={() => handleServiceClick(`/doctor/${service.doctor_id}`)}
          >
            <div className="icon">
              <img
                src={`http://localhost:3000/uploads/${service.image}`}
                alt={service.service_name}
              />
            </div>

            <h3>{service.service_name}</h3>

            <p className="service-price">${service.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
