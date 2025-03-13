import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="position-relative w-100 h-100 overflow-hidden">
        <img
          className="position-absolute w-100 h-100"
          style={styles.backgroundImage}
          src={page.backgroundImage.url}
          alt="Background"
        />

        <div className="position-relative z-1 p-4 bg-white bg-opacity-75 rounded text-center" style={styles.titleContainer}>
          <h1 className="mb-4" style={styles.titleFont}>
            <img src="/SImage.png" alt="S" style={styles.titleImage} />
            {page.title.slice(1)}
          </h1>
          <h2 className="mb-2" style={styles.subtitleFont}>{page.subtitle}</h2>
          <h2 className="mb-4" style={styles.subtitleFont}>{page.message}</h2>
          {!submitted ? (
            <form
              name="email-signup"
              method="POST"
              data-netlify="true"
              className="mb-4"
              style={styles.emailForm}
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="email-signup" />

              <div className="mb-3" style={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  style={styles.emailInput}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={styles.emailButton}>
                Join Email List
              </button>
            </form>
          ) : (
            <p>Thank you for signing up!</p>
          )}
          <a
            href={page.instagramLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <img
                className="rounded-circle"
                style={styles.instagramIcon}
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

const styles = {
  backgroundImage: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    position: 'relative',
    zIndex: 1,
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    display: 'inline-block',
    maxWidth: '600px',
    width: '100%',
  },
  titleFont: {
    fontSize: '2.5em',
    margin: '16px 0',
    fontWeight: 'bold',
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
    color: '#444',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  titleImage: {
    width: '30px',
    height: '30px',
    verticalAlign: 'middle',
    marginRight: '10px',
  },
  subtitleFont: {
    fontSize: '1.5em',
    color: '#666',
  },
  emailForm: {
    marginTop: '20px',
  },
  emailButton: {
    backgroundColor: '#ff7e5f',
    borderColor: '#ff7e5f',
  },
  instagramIcon: {
    width: '50px',
    height: '50px',
    marginTop: '20px',
  },
};

export default EmailHolding;