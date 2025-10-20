import React from "react";

export default function ButtonCF({ isCelsius, setIsCelsius }) {
  return (
    <div className="absolute -top-3 right-0 flex gap-4 z-10">
      <button
        onClick={() => setIsCelsius(true)}
        className={`w-11 h-11 rounded-full font-bold text-lg transition ${
          isCelsius
            ? "bg-gray-200 text-[#1e213a]"
            : "bg-[#585676] text-white hover:bg-white hover:text-[#585676]"
        }`}
      >
        °C
      </button>
      <button
        onClick={() => setIsCelsius(false)}
        className={`w-11 h-11 rounded-full font-bold text-lg transition ${
          !isCelsius
            ? "bg-gray-200 text-[#1e213a]"
            : "bg-[#585676] text-white hover:bg-white hover:text-[#585676]"
        }`}
      >
        °F
      </button>
    </div>
  );
}
