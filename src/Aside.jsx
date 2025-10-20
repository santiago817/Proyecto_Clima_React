import React from "react";

export default function Aside({ children }) {
  return (
    <div className="relative bg-[#1e213a] w-full h-screen flex items-center justify-center overflow-hidden">
      <img
        src="/Cloud-background.png"
        alt="Clouds"
        className="absolute top-[25%] left-1/2 w-[155%] max-w-none opacity-35 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(15%) sepia(12%) saturate(800%) hue-rotate(210deg) brightness(90%) contrast(90%)",
          mixBlendMode: "screen",
        }}
      />

      {children}
    </div>
  );
}
