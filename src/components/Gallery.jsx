import React, { useState, useEffect } from "react";
import GalleryItem from "./GalleryItem";

const Gallery = ({ galleryName }) => {
  const [items, setItems] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const query = `
      {
        galleryCollection(where: { name: "${galleryName}" }, limit: 1) {
          items {
            itemsCollection {
              items {
                title
                picture { url }
                description
              }
            }
          }
        }
      }
    `;

    fetch(
      `https://graphql.contentful.com/content/v1/spaces/${
        import.meta.env.VITE_CMS_SPACE_ID
      }/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_CMS_API_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      }
    )
      .then((res) => res.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
          return;
        }
        if (data.galleryCollection.items.length) {
          const allItems = data.galleryCollection.items.flatMap(
            (g) => g.itemsCollection.items
          );
          setItems(allItems);

          const randomItem =
            allItems[Math.floor(Math.random() * allItems.length)];
          setBackgroundImage(randomItem.picture.url);
        }
      });
  }, [galleryName]);

  if (items.length === 0) {
    return (
      <div className="mt-12 text-center text-2xl font-bold text-gray-800">
        Loading…
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 -z-10 bg-center bg-cover after:absolute after:inset-0"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "300%" }}
      />

      <div className="relative mx-auto my-12 w-4/5 max-w-[1200px] columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {items.map((item, idx) => (
          <div key={idx} className="break-inside-avoid">
            <GalleryItem item={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;