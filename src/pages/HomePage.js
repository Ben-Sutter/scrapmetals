import React, { useState, useEffect } from "react";
import GalleryItem from "../components/GalleryItem";
import "../styles/styles.css";

const query = `
{
  galleryCollection {
    items {
      title
      description
      image {
        url
      }
    }
  }
}
`;

const HomePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    window
      .fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CMS_SPACE_ID}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_CMS_API_TOKEN}`,
          },
          body: JSON.stringify({ query }),
        }
      )
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        setItems(data.galleryCollection.items);
      });
  }, []);

  if (items.length === 0) {
    return "Loading...";
  }

  return (
    <div className="gallery-page-container">
      {items.map((item, index) => (
        <GalleryItem key={index} item={item} />
      ))}
    </div>
  );
};

export default HomePage;