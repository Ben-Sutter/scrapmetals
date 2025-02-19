// filepath: /Users/bensutter/SOF_WEBSITE/scrapmetals/src/pages/GalleryItemPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/GalleryPageStyles.css";

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
        setItem(data.galleryItemCollection.items[0]);
      });
  }, [title]);

  if (!item) {
    return "Loading...";
  }

  return (
    <div className="gallery-item-page-container">
      <img src={item.picture.url} alt={item.title} className="gallery-item-page-image" />
      <h1 className="gallery-item-page-title">{item.title}</h1>
      <p className="gallery-item-page-description">{item.description}</p>
    </div>
  );
};

export default GalleryItemPage;