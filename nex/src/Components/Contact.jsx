import React, { useState } from "react";

function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContactClick = () => {
    if (email.trim() === "") {
      setError("Please enter an email.");
    } else {
      // Here, you can send the email using your preferred method (e.g., API call).
      // For simplicity, we'll just display an alert.
      alert(`Email sent to: ${email}`);
      setSubmitted(true);
      setEmail(""); // Clear the email input
      setError(""); // Clear any previous error message
    }
  };

  return (
    <div id="contact">
      <h1 style={{ fontSize: "2rem", color: "#000266", textAlign: "center" }}>
        Contact Us
      </h1>
      {submitted ? (
        <p>Email sent! Thank you.</p>
      ) : (
        <div className="contact-input">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleInputChange}
          />
          <a href="#" onClick={handleContactClick}>
            Contact
          </a>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default Contact;
