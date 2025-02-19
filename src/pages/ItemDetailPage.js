import React, { useState, useEffect } from "react";
import "../styles/styles.css";

const query = ``;

const GalleryItem = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    window
      .fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CMS_SPACE_ID}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authenticate the request
            Authorization: `Bearer ${process.env.REACT_APP_CMS_API_TOKEN}`,
          },
          // send the GraphQL query
          body: JSON.stringify({ query }),
        }
      )
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

          // rerender the entire component with new data
          // I am guessing i gotta use a state w the name index or something
        setPage(data.holdingPageCollection.items[0]);
      });
  }, []);

  if (!page) {
    return "Loading...";
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert(error));
  };

  return (
      <div className="item-detail-container">
        
      </div>
  );
};

export default GalleryItem;
