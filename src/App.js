import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import GalleryItemPage from "./pages/GalleryItemPage";
import EmailHolding from "./pages/EmailHoldingPage";
import GalleryPage from "./pages/GalleryPage";


const App = () => {
  return (
    <Router>
        <Container>
          <Routes>
            <Route path="/" element={<EmailHolding />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/:title" element={<GalleryItemPage />} />
          </Routes>
        </Container>
    </Router>
  );
};


export default App;