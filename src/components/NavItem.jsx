import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ label, href, isActive, onClick }) => (
  <Link
    to={href}
    onClick={onClick}
    className={`
      block px-4 py-2 rounded-md text-lg font-semibold transition-colors
      ${isActive
        ? "bg-[#660033] text-white"
        : "text-white hover:bg-[rgba(170,0,102,0.5)]"}
    `}
  >
    {label}
  </Link>
);

export default NavItem;
