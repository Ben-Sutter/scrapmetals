import React from "react";
import Gallery from "../components/Gallery";

const MainGalleryPage = () => {
  return (
    <div>
      <h1 style={styles.title}>Main Gallery</h1>
      <Gallery galleryName="main gallery" />
    </div>
  );
};

const styles = {
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '20px 0',
  },
};

export default MainGalleryPage;