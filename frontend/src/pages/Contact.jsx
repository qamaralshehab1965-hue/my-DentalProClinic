import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [branch, setBranch] = useState("Main Branch");
  const [details, setDetails] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (email !== confirmEmail) {
      alert("Emails do not match");
      return;
    }

    alert("Form submitted successfully");
  }

  return (
    <div className="contact-container">
      <div className="contact-box">
        {/* Left Side - Info */}
        <div className="contact-info">
          <h2>Contact Information</h2>

          <p>
            <strong>Phone:</strong> +49 123 456 7890
          </p>
          <p>
            <strong>Email:</strong> info@dentalclinic.com
          </p>
          <p>
            <strong>Address:</strong> Hauptstraße 25, Dortmund
          </p>
        </div>

        {/* Right Side - Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Contact Form</h2>

          <label>Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Phone *</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Confirm Email *</label>
          <input
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
          />

          <label>Branch *</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option>Main Branch</option>
            <option>West Branch</option>
            <option>City Branch</option>
          </select>

          <label>Additional Details *</label>
          <textarea
            rows="4"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
