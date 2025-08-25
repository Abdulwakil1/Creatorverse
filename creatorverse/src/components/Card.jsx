// src/components/Card.jsx
// import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Card({ creator, socials, onEdit, onDelete, onBack }) {
  return (
    <div className="bg-[rgb(0,6,13)] min-h-screen text-white px-6 sm:px-10 md:px-16 lg:px-20 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
          {/* Creator Image */}
          <div className="w-full md:w-auto">
            <div className="rounded-lg p-[2px] bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-black/40">
              <div className="relative">
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="w-full h-72 sm:h-80 object-cover rounded-sm md:w-60 md:h-80"
                />
                <div className="absolute inset-0 bg-black/20 rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl font-bold text-blue-400 tracking-wide">
              {creator.name.toUpperCase()}
            </h1>

            {creator.description && (
              <p className="text-gray-300 leading-relaxed">
                {creator.description}
              </p>
            )}

            {/* Social Links */}
            <div className="space-y-3">
              {Object.values(socials).map(
                (s, idx) =>
                  s?.handle && (
                    <p key={idx} className="flex items-center gap-3">
                      <s.Icon size={22} className="text-white" />
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline break-all"
                      >
                        @{s.handle}
                      </a>
                    </p>
                  )
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
              <button
                onClick={onEdit}
                className="w-full text-center text-lg font-semibold
                           bg-blue-400 text-white rounded-lg py-3
                           border-2 border-transparent hover:border-white hover:bg-blue-500
                           transition-colors duration-200 cursor-pointer
                           flex items-center justify-center gap-2"
              >
                <FaEdit /> Edit
              </button>

              <button
                onClick={onBack}
                className="w-full text-center text-lg font-semibold
                           bg-gray-800 text-white rounded-lg py-3
                           border-2 border-transparent hover:border-gray-500 hover:bg-gray-700
                           transition-colors duration-200 cursor-pointer"
              >
                Back to Home
              </button>

              <button
                onClick={onDelete}
                className="w-full text-center text-lg font-semibold
                           bg-red-500 text-white rounded-lg py-3
                           border-2 border-transparent hover:border-red-300 hover:bg-red-600
                           transition-colors duration-200 cursor-pointer
                           flex items-center justify-center gap-2"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
