import React from "react";
import { Link } from "react-router-dom";

const GalleryItem = ({ item }) => {
  return (
    <Link to={`/gallery/${encodeURIComponent(item.title)}`} style={styles.link}>
      <div style={styles.container}>
        <img
          src={item.picture.url}
          alt={item.title}
          style={styles.image}
        />
        <h3 style={styles.title}>{item.title}</h3>
      </div>
    </Link>
  );
};

const styles = {
  link: {
    textDecoration: 'none', // Remove underline from links
  },
  container: {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    textAlign: 'center',
  },
  containerHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderBottom: '1px solid #ddd',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '10px',
    color: '#333',
  },
};

export default GalleryItem;