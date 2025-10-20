import React from "react";

export default function CardAside({ selectedPlace }) {
  const placeholder = {
    main: { temp: 19 },
    weather: [{ description: "clear sky", icon: "01d" }],
    name: "Ezeiza",
    dt: Date.now() / 1000,
  };

  const data = selectedPlace || placeholder;

  const temperature = Math.round(data.main.temp);
  const condition = data.weather[0].description;
  const icon = `/${data.weather[0].icon}.png`;
  const location = data.name;

  const today = new Date(data.dt * 1000);
  const options = { weekday: "short", day: "numeric", month: "short" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <div className="flex flex-col items-center text-white">
      <img
        src={icon}
        alt={condition}
        className="w-40 h-40 m-20 md:w-50 md:h-50 lg:w-60 lg:h-60"
      />

      <div className="mt-14 flex flex-col items-center space-y-10">
        <h2 className="text-9xl tracking-tight flex items-start">
          {temperature}
          <span className="text-8xl text-gray-500 ml-1 mt-2">°C</span>
        </h2>

        <p className="text-3xl text-[#9e9daf] capitalize">{condition}</p>

        <div className="flex items-center gap-2 text-[#81819a] text-base">
          <span>Today</span>
          <span className="text-gray-500">,</span>
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2 text-[#9e9daf] text-base">
          <img src="/location_on.svg" alt="Ubicación" className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
