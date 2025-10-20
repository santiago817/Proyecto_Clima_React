import React from "react";
import CardHome from "./CardHome";
import WeatherCards from "./WeatherCards";

export default function Home({ selectedPlace, className }) {
  return (
    <div
      className={`${
        className ? className : ""
      } w-full h-full bg-[#100e1d] text-white flex flex-col items-center gap-6 px-4 py-6`}
    >
      <CardHome selectedPlace={selectedPlace} />

      <WeatherCards selectedPlace={selectedPlace} />
    </div>
  );
}
