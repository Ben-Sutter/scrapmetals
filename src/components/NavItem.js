import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ label, href, isActive, onClick }) => {
  return (
    <Link
      to={href} // Use the `to` prop for routing
      style={{
        ...styles.link,
        color: isActive ? styles.active.color : styles.inactive.color,
        backgroundColor: isActive
          ? styles.active.backgroundColor
          : styles.inactive.backgroundColor,
      }}
      onClick={onClick} // Call the onClick handler passed from NavBar
      onMouseEnter={(e) => {
        if (!isActive) e.target.style.backgroundColor = styles.hover.backgroundColor;
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.target.style.backgroundColor = styles.inactive.backgroundColor;
      }}
    >
      {label}
    </Link>
  );
};

const styles = {
  link: {
    display: 'block',
    padding: '10px 15px',
    borderRadius: '5px',
    fontSize: '20px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'background-color 0.3s, color 0.3s', // Smooth hover effect
  },
  active: {
    color: 'white',
    backgroundColor: '#660033', // Active background color
  },
  inactive: {
    color: 'white', // Inactive text color
    backgroundColor: 'transparent', // Transparent background for inactive
  },
  hover: {
    backgroundColor: 'rgba(170, 0, 102, 0.5)', // Mostly transparent hover background
  },
};

export default NavItem;