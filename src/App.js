import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GalleryItemPage from "./pages/GalleryItemPage";
import EmailHolding from "./pages/EmailHolding";
import GalleryPage from "./pages/GalleryPage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<EmailHolding />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/gallery/:title" element={<GalleryItemPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
