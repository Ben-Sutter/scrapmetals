import React from "react";
import { Link } from "react-router-dom";
import "../styles/GalleryPageStyles.css";

const GalleryItem = ({ item }) => {
  return (
    <div className="gallery-item-container">
      <Link to={`/gallery/${item.title}`}>
        <img src={item.picture.url} alt={item.title} className="gallery-item-image" />
        <h3 className="gallery-item-title">{item.title}</h3>
      </Link>
    </div>
  );
};

export default GalleryItem;