import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import MainGalleryPage from "./pages/MainGalleryPage";
import MiniGalleryPage from "./pages/MiniGalleryPage";
import AboutPage from "./pages/AboutPage";
import GalleryItemPage from "./pages/GalleryItemPage";
import ContactPage from "./pages/ContactPage";

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* hamburger */}
        <button
          onClick={() => setIsNavOpen((prev) => !prev)}
          className="fixed top-5 left-5 z-[999] flex flex-col gap-1.5 p-2 rounded-md bg-black/20 backdrop-blur-sm transition hover:bg-black/30"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="block h-0.5 w-8 rounded bg-white shadow-[0_0_6px_rgba(0,0,0,0.95)]"
            />
          ))}
        </button>

        {/* side-nav */}
        <NavBar isOpen={isNavOpen} closeNav={() => setIsNavOpen(false)} />

        {/* routed pages */}
        <main className="flex-1 overflow-y-auto p-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<MainGalleryPage />} />
            <Route path="/minis" element={<MiniGalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery/:title" element={<GalleryItemPage />} />
            <Route path="/contact" element={<ContactPage/>}/>;
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
