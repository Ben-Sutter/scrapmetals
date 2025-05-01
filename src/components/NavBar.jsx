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
    <div
      className="
        fixed top-0 left-0 h-screen w-64
        bg-black p-5 shadow-md z-[999]
        transition-transform duration-300 ease-in-out
      "
      style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
    >
      <nav className="flex flex-col gap-2">
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
    </div>
  );
};

export default NavBar;
