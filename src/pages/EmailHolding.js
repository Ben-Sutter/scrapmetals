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
          @font-face {
            font-family: 'CustomFont';
            src: url('/fonts/CloisterBlack.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
  
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

        {/* Single Title Container */}
        <div style={styles.titleContainer}>
          <h1 style={styles.titleFont}>{page.title}</h1>
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

          {/* Align Play Button, Instagram Logo, and S Signature */}
          <div style={styles.iconContainer}>
            <button
              style={styles.playButtonInTitle}
              onClick={() => {
                const audio = document.getElementById('audio-player');
                if (audio) {
                  audio.play();
                }
              }}
            >
              ▶
            </button>

            <a
              href={page.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.logoLink}
            >
              <img
                style={styles.instagramIcon}
                src={page.instagramLinkImage.url}
                alt="Instagram"
              />
            </a>
            <img
              src="/SImage.png"
              alt="S"
              style={styles.signatureInTitle}
            />

            <audio id="audio-player" src="/PaintingWithFire.m4a" />
          </div>
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
  iconContainer: {
    display: 'flex', // Use flexbox for alignment
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    gap: '20px', // Add spacing between elements
    marginTop: '20px', // Add spacing from the title/subtitle
  },

  playButtonInTitle: {
    width: '30px',
    height: '30px',
    backgroundColor: '#660033', // Button background color
    color: 'white', // Text color
    fontSize: '15px', // Font size for the play icon
    border: 'none', // Remove border
    borderRadius: '50%', // Make it circular
    cursor: 'pointer', // Pointer cursor on hover
    display: 'flex', // Center the icon
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', // Add shadow
    transition: 'transform 0.2s', // Add hover effect
  },


  titleFont: {
    fontSize: '5rem',
    margin: 0,
    fontFamily: 'CustomFont, serif', // Use the custom font
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
  logoContainer: {
    position: 'absolute',
    bottom: '20px', // Position at the bottom of the page
    left: '50%',
    transform: 'translateX(-50%)', // Center horizontally
    display: 'flex',
    gap: '20px', // Space between logos
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },

  signatureInTitle: {
    width: '60px', // Adjust size to fit nicely
    height: 'auto',
    filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))', // Add shadow
  },

  instagramIcon: {
    width: '40px',
    height: '40px',
    filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))', // Add shadow
    transition: 'transform 0.2s', // Add hover effect
  },

  logoLink: {
    display: 'inline-block',
    transition: 'transform 0.2s', // Add hover effect
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
    color: 'white',
  },
  emailButton: {
    width: '100%',
    padding: '10px',
    background: '#660033',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};

export default EmailHolding;