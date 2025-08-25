import React from "react";

function DeleteDialog({ creator, onCancel, onConfirm, error }) {
  if (!creator) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Translucent backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onCancel}
      ></div>

      {/* Dialog box */}
      <div
        className="relative bg-[rgb(0,6,13)]/60 border-1 border-blue-400 rounded-md text-center shadow-2xl
                      w-full max-w-3xl mx-4 sm:mx-6 lg:mx-auto
                      min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]
                      flex flex-col justify-center items-center
                      p-6 sm:p-12 lg:p-16"
      >
        {/* Heading */}
        <h2 className="text-blue-400 text-3xl sm:text-4xl font-bold mb-6">
          ⚠️ WAIT!!! ⚠️
        </h2>

        {/* Body */}
        <p className="text-gray-300 text-lg sm:text-xl mb-8">
          Are you sure you want to delete{" "}
          <span className="font-bold text-white">{creator.name}</span>?
        </p>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-blue-400 text-blue-400 font-semibold hover:bg-blue-500 hover:text-white transition cursor-pointer"
          >
            NAH NEVER MIND
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-400 text-white font-semibold hover:bg-blue-500 transition cursor-pointer"
          >
            YES! TOTALLY SURE
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteDialog;
