// src/pages/ShowCreators.jsx
import React from "react";
import { FaYoutube, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FaInfoCircle, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ShowCreators({ creators = [], loading = false }) {
  const navigate = useNavigate();
  if (loading) {
    return (
      <p className="text-gray-300 text-center mt-4">Loading creators...</p>
    );
  }

  if (!loading && creators.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        {" "}
        {/*inherits text color and black bg from HomePage*/}
        <p className="text-2xl sm:text-xl text-center font-bold py-10">
          NO CREATORS YET{" "}
          <span role="img" aria-label="sad face">
            😞
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {creators.map((creator) => (
        <div
          key={creator.id}
          className="rounded-lg p-[2px] bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600"
        >
          <div
            className="relative rounded-sm overflow-hidden shadow-lg h-80 bg-cover bg-center"
            style={{ backgroundImage: `url(${creator.image})` }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 z-0" />

            {/* Foreground content */}
            <div className="absolute top-1/3 left-0 w-full px-4 flex flex-col justify-start z-10">
              {/* Name and action icons */}
              <div className="flex justify-between items-center w-full mb-2">
                <h2 className="text-xl font-bold text-sky-400 tracking-wide">
                  {creator.name.toUpperCase()}
                </h2>
                <div className="flex gap-2">
                  <FaInfoCircle
                    className="text-white cursor-pointer hover:text-sky-300"
                    size={20}
                    onClick={() => navigate(`/creators/view/${creator.id}`)}
                  />
                  {/* <FaEdit
                    className="text-white cursor-pointer hover:text-sky-300"
                    size={20}
                  /> */}
                  <FaEdit
                    className="text-white cursor-pointer hover:text-sky-300"
                    size={20}
                    onClick={() => navigate(`/creators/edit/${creator.id}`)}
                  />
                </div>
              </div>

              {/* Social media icons */}
              <div className="flex gap-3 mb-2">
                {creator.youtube && (
                  <a
                    href={creator.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-500"
                  >
                    <FaYoutube size={20} />
                  </a>
                )}
                {creator.x && (
                  <a
                    href={creator.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400"
                  >
                    <FaXTwitter size={20} />
                  </a>
                )}
                {creator.instagram && (
                  <a
                    href={creator.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-pink-500"
                  >
                    <FaInstagram size={20} />
                  </a>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-200 text-sm line-clamp-3">
                {creator.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowCreators;
