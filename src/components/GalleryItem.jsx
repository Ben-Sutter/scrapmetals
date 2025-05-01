import React from "react";
import { Link } from "react-router-dom";

const GalleryItem = ({ item }) => (
  <Link
    to={`/gallery/${encodeURIComponent(item.title)}`}
    className="block no-underline"
  >
    <div
      className="
        relative z-10 cursor-pointer bg-white border border-gray-200
        rounded-lg shadow-md overflow-hidden text-center
        transition-transform duration-300 ease-in-out
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      <img
        src={item.picture.url}
        alt={item.title}
        className="w-full h-auto block border-b border-gray-300"
      />
    </div>
  </Link>
);

export default GalleryItem;
