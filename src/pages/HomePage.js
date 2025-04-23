import React from "react";

const HomePage = () => {
  return (
    <div className="HomePage-Container">
      <style>
        {`
          @font-face {
            font-family: 'CustomFont';
            src: url('/fonts/CloisterBlack.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }

          @keyframes driftBackground {
            0% {
              transform: scale(1.1);
            }
            50% {
              transform: scale(2) rotate(22.5deg);
            }
            100% {
              transform: scale(1.1);
            }
          }

          @keyframes rotateBackground {
            0% {
              transform: scale(1.1);
            }
            50% {
              transform: scale(2.5) rotate(45deg);
            }
            100% {
              transform: scale(1.1);
            }
          }

          @media (max-width: 768px) {
            .background-image {
              animation: rotateBackground 40s infinite linear !important;
            }
          }
        `}
      </style>

      {/* Background Image */}
      <img
        className="background-image"
        src= "images/greenBG.jpg"
        alt="Background"
        style={styles.backgroundImage}
      ></img>

      {/* Title */}
      <h1 className="HomePage-Title" style={styles.titleFont}>Scrap Metals</h1>
    </div>
  );
};

const styles = {
  titleFont: {
    position: 'absolute', // Allows positioning relative to the container
    top: '50%', // Center vertically
    right: '10px', // Align to the right with a 10px margin
    transform: 'translateY(-50%)', // Adjust for vertical centering
    fontSize: '10rem',
    margin: 0,
    fontFamily: 'CustomFont, serif', // Use the custom font
    fontWeight: 800,
    fontStyle: 'normal',
    textAlign: 'right', // Align text to the right
    color: 'white', // Ensure the text is visible on the background
    textShadow: '10px 10px 5px rgba(0, 0, 0, 0.7)', // Add a shadow for better readability
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Ensure the image is behind other content
    
    objectFit: 'cover',
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Prevent the image from repeating
    animation: 'driftBackground 40s infinite ease-in-out', // Apply the animation
  },
};

export default HomePage;