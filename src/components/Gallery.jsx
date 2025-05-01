import React from "react";
import { Link } from "react-router-dom";

const GalleryItem = ({ item }) => (
  <Link
    to={`/gallery/${encodeURIComponent(item.title)}`}
    className="block no-underline"
  >
    <div
      className="
        relative z-10 cursor-pointer overflow-hidden
        /* mobile: edge-to-edge, no border/shadow */
        rounded-none bg-transparent border-0 shadow-none

        /* ≥ 640 px: bring back the card look */
        sm:rounded-lg sm:bg-white sm:border sm:border-gray-200
        sm:shadow-md sm:transition sm:duration-300 sm:ease-in-out
        sm:hover:-translate-y-1 sm:hover:shadow-lg
      "
    >
      <img
        src={item.picture.url}
        alt={item.title}
        className="
          block w-full h-auto
          border-0             /* kill img border on phones */
          sm:border-b sm:border-gray-300
        "
      />
    </div>
  </Link>
);

export default GalleryItem;
