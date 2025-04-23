import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GalleryItemPage from "./pages/GalleryItemPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import AboutPage from "./pages/AboutPage";
import MainGalleryPage from "./pages/MainGalleryPage";
import MiniGalleryPage from "./pages/MiniGalleryPage";

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // State to toggle the navbar

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen); // Toggle the navbar state
  };

  const closeNav = () => {
    setIsNavOpen(false); // Close the navbar
  };

  return (
    <Router>
      <div style={styles.appContainer}>
        {/* Hamburger Button */}
        <button style={styles.hamburgerButton} onClick={toggleNav}>
          {/* Three-line icon */}
          <div style={styles.line}></div>
          <div style={styles.line}></div>
          <div style={styles.line}></div>
        </button>

        {/* Sidebar */}
        <NavBar isOpen={isNavOpen} closeNav={closeNav} />

        {/* Main Content */}
        <div style={styles.contentContainer}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<MainGalleryPage />} />
            <Route path="/minis" element={<MiniGalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery/:title" element={<GalleryItemPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh', // Full height of the viewport
  },
  hamburgerButton: {
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 998, // Ensure the button is above other elements
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  line: {
    width: '30px',
    height: '3px',
    backgroundColor: '#333',
    borderRadius: '2px',
  },
  contentContainer: {
    flex: 1, // Take up the remaining space
    overflowY: 'auto', // Enable scrolling if content overflows
    padding: '20px', // Add padding around the content
  },
};

export default App;