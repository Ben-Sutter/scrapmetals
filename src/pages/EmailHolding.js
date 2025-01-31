import React, { useState, useEffect } from "react";
import "../styles.css";

const query = `
{
  holdingPageCollection {
    items {
      title
      subtitle
      message
      backgroundImage {
        url
      }
      instagramLinkImage {
        url
      }
      instagramLink
      song {
        url
      }
    }
  }
}
`;

const EmailHolding = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
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
    <div className="App">
      <div className="homepage-container">
        <img
          className="background-image"
          src={page.backgroundImage.url}
          alt="Background"
        />

        <div className="title-container">
          <h1 className="title-font">{page.title}</h1>
          <h2 className="subtitle-font">{page.subtitle}</h2>
          <h2 className="subtitle-font">{page.message}</h2>
          {/* Email Signup Form */}
          {!submitted ? (
            <form
              name="email-signup"
              method="POST"
              data-netlify="true"
              className="email-form"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="email-signup" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
              />

              <button type="submit" className="email-button">
                Join Email List
              </button>
            </form>
          ) : (
            <p>Thank you for signing up!</p>
          )}
          {/* Instagram Icon */}
          <a
            href={page.instagramLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <img
                className="instagram-icon"
                src={page.instagramLinkImage.url}
                alt="Instagram"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailHolding;
