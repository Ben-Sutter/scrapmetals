import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../styles/GalleryStyles.css";

const GalleryItem = ({ item }) => {
  return (
    <Link to={`/gallery/${item.title}`} className="text-decoration-none">
      <Card style={styles.galleryItemContainer}>
        <Card.Img
          variant="top"
          src={item.picture.url}
          alt={item.title}
          style={styles.galleryItemImage}
        />
        <Card.Body>
          <Card.Title style={styles.galleryItemTitle}>{item.title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

const styles = {
  galleryItemContainer: {
    margin: '16px',
    width: '100%',
    maxWidth: '600px',
  },
  galleryItemImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '800px',
    objectFit: 'cover',
  },
  galleryItemTitle: {
    fontSize: '1.5em',
    margin: '8px 0',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    color: '#333',
  },
};

export default GalleryItem;