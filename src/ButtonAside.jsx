import React from "react";

export default function ButtonAside({ onSearchClick }) {
  return (
    <>
      <button
        onClick={onSearchClick}
        className="absolute top-7 left-1/3 transform -translate-x-1/2 bg-[#6e707a] text-[#e7e7eb] px-7 py-1.5"
      >
        Search for Places
      </button>

      <button className="absolute top-7 right-10 bg-[#4b4d61] p-2 rounded-full  border-gray-500 text-xl">
        <img src="/location.svg" alt="Location" className="w-5 h-5" />
      </button>
    </>
  );
}
