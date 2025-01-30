import React from "react";
import "../styles.css";

const HoldingPage = () => {
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
              <p className="instagram-text">Follow me on Insta</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HoldingPage;
