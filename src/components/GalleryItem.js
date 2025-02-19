import React from "react";
import { Link } from "react-router-dom";
import "../styles/GalleryPageStyles.css";

const GalleryItem = ({ item }) => {
  return (
    <Link to={`/gallery/${item.title}`}>
      <div className="gallery-item-container">
        <img
          src={item.picture.url}
          alt={item.title}
          className="gallery-item-image"
        />
        <h3 className="gallery-item-title">{item.title}</h3>
      </div>
    </Link>
  );
};

export default GalleryItem;