import React, { useState, useEffect } from "react";
import GalleryItem from "./GalleryItem";

const Gallery = ({ galleryName }) => {
  const [items, setItems] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(""); // State for the background image

  useEffect(() => {
    const query = `
    {
      galleryCollection(where: { name: "${galleryName}" }, limit: 1) {
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

          // Select a random item's image as the background
          const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
          setBackgroundImage(randomItem.picture.url);
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
    <div
      style={{
        ...styles.galleryPageContainer,
        backgroundImage: `url(${backgroundImage})`, // Set the background image
        backgroundSize: "300%", // Ensure the image covers the entire container
        backgroundPosition: "center", // Center the image
      }}
    >
      <div style={styles.itemsContainer}>
        {items.map((item, index) => (
          <GalleryItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  galleryPageContainer: {
    position: 'absolute', // Make the container span the entire viewport
    top: 0,
    left: 0,
    width: '100vw', // Full width of the viewport
    zIndex: -1, // Push the container behind other elements
  },
  itemsContainer: {
    position: 'relative', // Position relative to the page
    margin: '50px auto', // Center the box horizontally and add vertical spacing
    width: '80%', // Set the width of the box
    maxWidth: '1200px', // Limit the maximum width
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Add a semi-transparent white background
    borderRadius: '10px', // Add rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
    padding: '20px', // Add padding inside the box
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Two items per row
    gap: '20px', // Space between items
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