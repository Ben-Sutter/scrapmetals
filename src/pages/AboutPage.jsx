import React from 'react';

const AboutPage = () => {
  return (
    <div style={styles.container}>
      <style>
        {`
          @font-face {
            font-family: 'CustomFont';
            src: url('/fonts/CloisterBlack.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
        `}
      </style>
      <img
        className="background-image"
        src="images/redBG.jpg"
        alt="Background"
        style={styles.backgroundImage}
      ></img>
      <div className="text-container" style={styles.textContainer}>
        <h1 style={styles.title}>About Me</h1>
        <div style={styles.contentRow}>
          <p style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <br/>
            <br/>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <img
            className="about-image"
            src="images/sofPic.png" // Replace with your image path
            alt="About Us"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    height: '100%', // Ensure it takes up the full height of the parent
    display: 'flex', // Use flexbox for centering
    flexDirection: 'column', // Stack content vertically
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center', // Center content horizontally
  },
  textContainer: {
    position: 'relative',
    zIndex: 2, // Ensure text is above the background image
    color: 'white',
    textAlign: 'center',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '30px',
    borderRadius: '10px',
    marginTop: '50px', // Add spacing from the top of the container
    display: 'flex',
    flexDirection: 'column', // Stack title and content row vertically
    alignItems: 'center',
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row', // Arrange text and image side by side
    justifyContent: 'space-between',
    gap: '20px', // Add spacing between the text and the image
    marginTop: '20px',
  },
  title: {
    fontFamily: 'CustomFont, serif', // Use the custom font
    fontSize: '5rem', // Adjust font size if needed
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#fff',
    flex: 1, // Allow the text to take up available space
  },
  image: {
    width: '400px', // Set a fixed width for the image
    height: 'auto', // Maintain aspect ratio
    borderRadius: '10px', // Add rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%',
    height: '200%',
    zIndex: -1, // Ensure the image is behind other content
    objectFit: 'cover',
  },
};

export default AboutPage;