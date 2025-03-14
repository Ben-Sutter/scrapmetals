import React, { useState, useEffect } from "react";

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
    <div style={styles.app}>
      <style>
        {`
          @keyframes driftBackground {
            0% {
              transform: scale(1) translate(0, 0);
            }
            50% {
              transform: scale(1.1) translate(-2%, 2%);
            }
            100% {
              transform: scale(1) translate(0, 0);
            }
          }

          @keyframes rotateBackground {
            0% {
              transform: scale(1);
            }
            50% {
             transform: scale(2);
            }
            100% {
              transform: scale(1);
            }
          }

          @media (max-width: 768px) {
            .background-image {
              animation: rotateBackground 40s infinite linear !important;
            }
          }
        `}
      </style>
      <div style={styles.homepageContainer}>
        <img
          className="background-image"
          style={styles.backgroundImage}
          src={page.backgroundImage.url}
          alt="Background"
        />

        <div style={styles.titleContainer}>
          <h1 style={styles.titleFont}>
            <img src="/SImage.png" alt="S" style={styles.titleImage} />
            {page.title.slice(1)}
          </h1>
          <h2 style={styles.subtitleFont}>{page.subtitle}</h2>
          <h2 style={styles.subtitleFont}>{page.message}</h2>
          {!submitted ? (
            <form
              name="email-signup"
              method="POST"
              data-netlify="true"
              style={styles.emailForm}
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
                style={styles.emailInput}
              />

              <button type="submit" style={styles.emailButton}>
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
  app: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  homepageContainer: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    animation: 'driftBackground 20s infinite ease-in-out',
    zIndex: 1,
  },
  titleContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
    color: 'white',
    textAlign: 'center',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '30px',
    borderRadius: '10px',
  },
  titleImage: {
    width: '120px',
    height: 'auto',
    marginRight: '-35px',
    marginBottom: '-20px',
    marginLeft: '-10px',
  },
  titleFont: {
    fontSize: '5rem',
    margin: 0,
    fontFamily: '"UnifrakturMaguntia", serif',
    fontWeight: 400,
    fontStyle: 'normal',
    textAlign: 'center',
  },
  subtitleFont: {
    fontSize: '1rem',
    margin: 0,
    fontFamily: '"New Rocker", serif',
    fontWeight: 200,
    fontStyle: 'normal',
  },
  instagramIcon: {
    width: '40px',
    height: '40px',
  },
  emailForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
  },
  emailInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border 0.2s',
  },
  emailButton: {
    width: '100%',
    padding: '10px',
    background: '#67151c',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};

export default EmailHolding;