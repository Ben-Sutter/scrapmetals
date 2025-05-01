import React, { useState } from 'react';
import NavItem from './NavItem';

const NavBar = ({ isOpen, closeNav }) => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active item by index

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Minis', href: '/minis' },
    { label: 'About', href: '/about' },
  ];

  return (
    <div
      style={{
        ...styles.navBar,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', // Slide in/out
      }}
    >
      <nav style={styles.nav}>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            label={item.label}
            href={item.href}
            isActive={index === activeIndex} // Check if this item is active
            onClick={() => {
              setActiveIndex(index); // Update the active index
              closeNav(); // Close the navbar
            }}
          />
        ))}
      </nav>
    </div>
  );
};

const styles = {
  navBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '250px', // Set the width of the sidebar
    height: '100vh', // Full height of the viewport
    backgroundColor: 'rgba(0, 0, 0, 1)', // Light gray with 80% opacity
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    padding: '20px', // Add padding around the content
    transform: 'translateX(-100%)', // Initially hidden
    transition: 'transform 0.3s ease-in-out', // Smooth slide-in/out animation
    zIndex: 999, // Ensure it appears above other elements
  },
  nav: {
    display: 'flex',
    flexDirection: 'column', // Stack items vertically
    gap: '10px', // Add spacing between items
  },
};

export default NavBar;