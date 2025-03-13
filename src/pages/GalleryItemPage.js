import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../styles/GalleryStyles.css";

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
    <Container style={styles.galleryItemPageContainer}>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={6}>
          <Image src={item.picture.url} alt={item.title} fluid style={styles.galleryItemPageImage} />
        </Col>
        <Col xs={12} md={6}>
          <h1 style={styles.galleryItemPageTitle}>{item.title}</h1>
          <p style={styles.galleryItemPageDescription}>{item.description}</p>
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  galleryItemPageContainer: {
    padding: '20px',
  },
  galleryItemPageImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '800px',
    objectFit: 'contain',
    marginBottom: '20px',
  },
  galleryItemPageTitle: {
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
  galleryItemPageDescription: {
    fontSize: '1.2em',
    lineHeight: '1.6',
    color: '#666',
    textAlign: 'justify',
    marginTop: '20px',
    padding: '10px',
    borderLeft: '4px solid #ff7e5f',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default GalleryItemPage;