import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    currentYear: "",
    branch: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsRegistered(true);
      } else {
        const result = await response.json();
        alert(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <video autoPlay muted loop playsInline id="bg-video">
        <source src="/vid121.mp4" type="video/mp4" />
      </video>

      <div className="container-wrapper">
        <div className="form-container">
          <div className="banner">
            <img src="/newban.png" alt="Event Banner" className="event-banner" />
          </div>
          {isRegistered ? (
            <div className="success-page">
              <h2> You have successfully registered!</h2>
              <p>Thank you for registering. See you at the event! 🎉</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-grid">
                <div className="input-group">
                  <label htmlFor="full-name">Full Name * </label>
                  <input
                    type="text"
                    id="full-name"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">Email Address * </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="contact-no">Contact Number* </label>
                  <input
                    type="tel"
                    id="contact-no"
                    name="contactNumber"
                    placeholder="+91 98765 43210"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group-row">
                  <div className="input-group">
                    <label htmlFor="year">Current Year *</label>
                    <select
                      id="year"
                      name="currentYear"
                      value={formData.currentYear}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select year</option>
                      <option value="First Year">First Year</option>
                      <option value="Second Year">Second Year</option>
                      <option value="Third Year">Third Year</option>
                      <option value="Fourth Year">Fourth Year</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label htmlFor="branch">Branch *</label>
                    <select
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select branch</option>
                      <option value="COMPS">COMPS</option>
                      <option value="CSBS">CSBS</option>
                      <option value="AIDS">AIDS</option>
                      <option value="IT">IT</option>
                      <option value="CCE">CCE</option>
                      <option value="EXTC">EXTC</option>
                      <option value="VLSI">VLSI</option>
                      <option value="MECH">MECH</option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="submit">Register for the Event</button>
            </form>
          )}

          <div className="contact-section">
            <p>If you have any doubts, please contact:</p>

            <div className="contact-persons">
              <div>
                <strong>Sanjeevani</strong>
                <br />
                <a href="tel:+917977249924">+91 79 7724 9924</a>
              </div>
              <div>
                <strong>Janice</strong>
                <br />
                <a href="tel:+919820532319">+91 98205 32319</a>
              </div>
            </div>

            <div className="connect">
              <p>Connect With Us</p>
              <div className="social-icons">
                <a href="https://www.instagram.com/alumnicell_kjsce/">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/alumnicellkjsce/">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="mailto:alumni.engg@somaiya.edu">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}