import { Link, useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/register");
  }

  return (
    <header className="header">
      <div className="nav-wrapper">
        <div className="logo-box">
          <img src="/شعار.png" alt="logo" />
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>

          <div className="review-menu">
            <span className="review-title">Reviews ▼</span>

            <div className="review-dropdown">
              <Link to="Doctor" className="dropdown-item">
                Leave Review
              </Link>

              <Link to="/reviews" className="dropdown-item">
                Ratings
              </Link>
            </div>
          </div>
        </nav>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <button className="login-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
