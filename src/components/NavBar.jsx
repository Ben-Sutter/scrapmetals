import React, { useState } from "react";
import NavItem from "./NavItem";

const NavBar = ({ isOpen, closeNav }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "Minis", href: "/minis" },
    { label: "About", href: "/about" },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-64
        bg-black/70 backdrop-blur-md border-r border-white/20
        shadow-2xl z-[950]
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* push items below the hamburger */}
      <nav className="flex flex-col gap-3 pt-24 px-4">
        {navItems.map((item, idx) => (
          <NavItem
            key={idx}
            {...item}
            isActive={idx === activeIndex}
            onClick={() => {
              setActiveIndex(idx);
              closeNav();
            }}
          />
        ))}
      </nav>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <button
          className="w-12 h-12 bg-[#660033] text-white text-lg font-bold rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          onClick={() => {
            const audio = document.getElementById("audio-player");
            if (audio) {
              audio.play();
            }
          }}
        >
          ▶
        </button>
        <audio id="audio-player" src="/PaintingWithFire.m4a" />
      </div>
    </aside>
  );
};

export default NavBar;
