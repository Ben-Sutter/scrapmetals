import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ label, href, isActive, onClick }) => (
  <Link
    to={href}
    onClick={onClick}
    className={`
      block rounded-md px-4 py-2 text-lg font-semibold tracking-wide
      transition-all duration-200
      ${isActive
        ? "bg-[#660033] text-white shadow-inner"
        : "text-white/80 hover:text-white hover:bg-[rgba(170,0,102,0.5)]"}
    `}
  >
    {label}
  </Link>
);

export default NavItem;
