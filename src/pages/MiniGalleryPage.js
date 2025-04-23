import React from "react";
import Gallery from "../components/Gallery";

const MiniGalleryPage = () => {
  return (
    <div>
      <h1 style={styles.title}>Mini Gallery</h1>
      <Gallery galleryName="mini gallery" />
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

export default MiniGalleryPage;