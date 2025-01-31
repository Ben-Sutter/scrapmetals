import React from "react";
import "../styles.css";
import { useState, useEffect } from "react";

const query = `
{
  holdingPageCollection {
    items {
      title
      subtitle
      backgroundImage {
        url
      }
      instagramLinkText
      instagramLink
      song {
        url
      }
    }
  }
}
`;

const WorkInProgress = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/CMS_SPACE_ID/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer CONTENTFUL_API_TOKEN",
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        setPage(data.holdingPageCollection.items[0]);
      });
  }, []);

  if (!page) {
    return "Loading...";
  }

  return (
    <div className="App">
      <div className="homepage-container">
        <img
          className="background-image"
          src={page.backgroundImage.url}
          alt="Background"
        />

        <div className="title-container">
          <h1 className="title">{page.title}</h1>
          <h2 className="subtitle">{page.subtitle}</h2>
          <a
            href={page.instagramLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="row">
              <img
                className="instagram-icon"
                src="/icons/instagram-white-icon.webp"
                alt="Instagram"
              />
              <p className="instagram-text">{page.instagramLinkText}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WorkInProgress;
