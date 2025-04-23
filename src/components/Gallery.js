import React, { useState, useEffect } from "react";
import GalleryItem from "./GalleryItem";

const Gallery = ({ galleryName }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const query = `
    {
      galleryCollection(where: { tabName: "${galleryName}" }, limit: 1) {
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
        if (data.galleryCollection.items.length > 0) {
          const allItems = data.galleryCollection.items.flatMap(
            (galleryItem) => galleryItem.itemsCollection.items
          );
          setItems(allItems);
        } else {
          console.warn("No items found for the specified galleryName.");
          setItems([]);
        }
      });
  }, [galleryName]);

  if (items.length === 0) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.galleryPageContainer}>
      {items.map((item, index) => (
        <GalleryItem key={index} item={item} />
      ))}
    </div>
  );
};

const styles = {
  galleryPageContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Two items per row
    gap: '20px', // Space between items
    padding: '20px', // Add padding around the container
    backgroundColor: '#f4f4f4', // Light gray background
    minHeight: '100vh', // Ensure the container takes up the full viewport height
  },
  loading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '50px',
    color: '#333',
  },
};

export default Gallery;