import "./about.css";
import { Link, useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  function handleDoctorClick(e) {
    const token = localStorage.getItem("token");

    if (!token) {
      e.preventDefault();
      navigate("/register");
    }
  }

  return (
    <div>
      <div className="doctors-section">
        <Link
          to="/doctor/1"
          onClick={handleDoctorClick}
          className="doctor-link"
        >
          <div className="doctor-card">
            <img src="/d.jpeg" alt="Doctor" />
            <h3>Dr. Ahmad Ali</h3>
            <p className="doctor-specialty">Oral Surgery</p>

            <p className="doctor-desc">
              Specialist in advanced oral surgery procedures. Experienced in
              dental implants and complex treatments. Provides precise surgical
              care with modern techniques. Dedicated to safe and comfortable
              patient experiences.
            </p>

            <div className="stetho">🩺</div>
          </div>
        </Link>

        <Link
          to="/doctor/2"
          onClick={handleDoctorClick}
          className="doctor-link"
        >
          <div className="doctor-card">
            <img src="/di.jpeg" alt="Doctor" />
            <h3>Dr. Sara Mohammed</h3>
            <p className="doctor-specialty">Orthodontics</p>

            <p className="doctor-desc">
              Expert in orthodontic treatments and teeth alignment. Uses modern
              braces and clear aligner technology. Focused on improving both
              smile and bite function. Known for gentle care and detailed
              treatment plans.
            </p>

            <div className="stetho">🩺</div>
          </div>
        </Link>

        <Link
          to="/doctor/3"
          onClick={handleDoctorClick}
          className="doctor-link"
        >
          <div className="doctor-card">
            <img src="/do.jpeg" alt="Doctor" />
            <h3>Dr. Omar Khaled</h3>
            <p className="doctor-specialty">Cosmetic Dentistry</p>

            <p className="doctor-desc">
              Specialist in cosmetic smile transformations. Provides veneers,
              whitening, and aesthetic treatments. Focused on creating natural
              and beautiful smiles. Combines artistry with modern dental
              technology.
            </p>

            <div className="stetho">🩺</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default About;
