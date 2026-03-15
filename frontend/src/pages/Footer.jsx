import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Opening Hours</h3>

          <p>Monday - Friday</p>
          <p>09:00 AM – 06:00 PM</p>

          <p>Saturday</p>
          <p>10:00 AM – 03:00 PM</p>

          <p>Sunday</p>
          <p>Closed</p>

          <div className="emergency">
            <h4>Dental Emergency</h4>
            <p>Call us immediately</p>
            <a href="tel:+49123456789">+49 123 456 789</a>
          </div>
        </div>

        <div className="footer-center">
          <h2>🦷 Perfect Smile Dental Clinic</h2>

          <p>
            We provide premium dental services including cosmetic dentistry,
            orthodontics, implants, and preventive care using the latest medical
            technology.
          </p>

          <iframe
            className="map"
            src="https://www.google.com/maps?q=Berlin%20Dental%20Clinic&output=embed"
            loading="lazy"
          ></iframe>

          <div className="social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-x-twitter"></i>
            </a>

            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-youtube"></i>
            </a>

            <a href="https://tiktok.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>

          <div className="newsletter">
            <h4>Subscribe to our Newsletter</h4>

            <p>Get dental tips and clinic updates.</p>

            <div className="newsletter-box">
              <input placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/services">Services</a>
          <a href="/doctors">Our Doctors</a>
          <a href="/reviews">Patient Reviews</a>
          <a href="/contact">Contact</a>

          <h3>Dental Services</h3>

          <a href="#">Teeth Whitening</a>
          <a href="#">Dental Implants</a>
          <a href="#">Orthodontics</a>
          <a href="#">Cosmetic Dentistry</a>
          <a href="#">Root Canal</a>
          <a href="#">Pediatric Dentistry</a>

          <h3>Patient Resources</h3>

          <a href="#">Insurance Information</a>
          <a href="#">Patient Forms</a>
          <a href="#">FAQs</a>
          <a href="#">Dental Tips</a>
          <a href="#">Blog & News</a>

          <h3>Legal</h3>

          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Perfect Smile Dental Clinic</p>

        <p>All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
