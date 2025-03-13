import React, { useState, useEffect } from "react";
import GalleryItem from "../components/GalleryItem";
import "../styles/GalleryStyles.css";

const query = `
{
  galleryCollection(limit: 1) {
    items {
      itemsCollection {
        items {
          title
          picture {
            url
          }
          description
        }
      }
    }
  }
}
`;

const GalleryPage = () => {
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
        // Flatten the nested itemsCollection.items arrays
        const allItems = data.galleryCollection.items.flatMap(
          (galleryItem) => galleryItem.itemsCollection.items
        );
        setItems(allItems);
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

export default GalleryPage;