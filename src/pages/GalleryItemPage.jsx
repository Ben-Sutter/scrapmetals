import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GalleryItemPage = () => {
  const { title } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Fetch the specific gallery item by title
    const query = `
    {
      galleryItemCollection(where: { title: "${title}" }) {
        items {
          title
          picture {
            url
          }
          description
        }
      }
    }
    `;

    window
      .fetch(
        `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.VITE_CMS_SPACE_ID}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_CMS_API_TOKEN}`,
          },
          body: JSON.stringify({ query }),
        }
      )
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        setItem(data.galleryItemCollection.items[0]);
      });
  }, [title]);

  if (!item) {
    return "Loading...";
  }

  return (
    <div
      style={{
        ...styles.container,
        backgroundImage: `url(${item.picture.url})`, // Set the background image
      }}
    >
      <div style={styles.overlay}></div> {/* Add an overlay for better readability */}
      <div style={styles.content}>
        <img
          src={item.picture.url}
          alt={item.title}
          style={styles.image}
        />
        <div style={styles.textContainer}>
          <h1 style={styles.title}>{item.title}</h1>
          <p style={styles.description}>{item.description}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative', // Position relative for overlay
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
    backgroundSize: '200%', // Zoom in the background image
    backgroundPosition: 'center', // Center the background image
    minHeight: '100vh', // Full viewport height
    backgroundRepeat: 'no-repeat', // Prevent background repetition
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    zIndex: 1, // Place the overlay above the background
  },
  content: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    zIndex: 2, // Place the content above the overlay
  },
  image: {
    width: '300px',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  textContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#fff', // White text for better contrast
    margin: 0,
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#ddd', // Light gray text for readability
  },
};

export default GalleryItemPage;