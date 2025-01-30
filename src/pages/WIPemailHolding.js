import React, { useState } from "react";
import "../styles.css";

const EmailHolding = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="App">
      <div className="homepage-container">
        <img
          className="background-image"
          src="/media/red-painting.jpeg"
          alt="Background"
        />

        <div className="title-container">
          <h1 className="title">Scrap Metals</h1>
          <h2 className="subtitle">
            Please excuse me as I set up my gallery. In the meantime, please
            follow me on Instagram for updates!
          </h2>

          {/* Instagram Icon */}
          <a
            href="https://www.instagram.com/scrap_metals_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="row">
              <img
                className="instagram-icon"
                src="/icons/instagram-white-icon.webp"
                alt="Instagram"
              />
            </div>
          </a>

          {/* Email Signup Form */}
          {!submitted ? (
            <form
              name="email-signup"
              method="POST"
              data-netlify="true"
              className="email-form"
              onSubmit={() => setSubmitted(true)} // No preventDefault()
            >
              <input type="hidden" name="form-name" value="email-signup" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Join Email List</button>
            </form>
          ) : (
            <p>Thank you for signing up!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailHolding;
