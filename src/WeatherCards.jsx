import React from "react";

export default function WeatherCards({ selectedPlace }) {
  const placeholder = {
    wind: { speed: 3.09, deg: 150 },
    main: { humidity: 80, pressure: 1023 },
    visibility: 10000,
  };

  const data = selectedPlace || placeholder;

  const getCardinalDirection = (deg) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round((deg % 360) / 22.5) % 16;
    return directions[index];
  };

  const windSpeed = data.wind?.speed?.toFixed(1) || 0;
  const windDirection = data.wind?.deg || 0;
  const windCardinal = getCardinalDirection(windDirection);
  const humidity = data.main?.humidity || 0;
  const visibility = ((data.visibility || 10000) / 1000).toFixed(1);
  const pressure = data.main?.pressure || 0;

  return (
    <div className="w-full flex flex-col items-center px-4 md:px-0 md:h-screen md:overflow-hidden 2xl:mt-[30px]">
      <div className="w-full max-w-[700px] flex flex-col items-start 2xl:pt-10">
        <h2 className="text-[#E7E7EB] text-2xl font-bold my-5 text-left md:px-3">
          Today's Highlights
        </h2>

        <div
          className="w-full overflow-x-auto md:overflow-visible flex justify-start md:justify-center px-0"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          <div className="min-w-[328px] md:min-w-0 grid grid-cols-1 md:grid-cols-2 gap-5 justify-start md:justify-center">
            <div className="w-[328px] h-[192px] bg-[#1E213A] flex flex-col items-center justify-center rounded-lg p-4">
              <h2 className="text-base text-[#E7E7EB] text-center mb-2">
                Wind Status
              </h2>
              <div className="flex items-end h-16 mb-2">
                <h3 className="text-5xl font-bold text-[#E7E7EB]">
                  {windSpeed}
                </h3>
                <h4 className="text-3xl mb-1 ml-1 text-[#E7E7EB]">m/s</h4>
              </div>
              <div className="flex items-center text-[#E7E7EB] text-sm">
                <span
                  className="flex justify-center items-center w-8 h-8 m-3 rounded-full bg-[#ffffff4d]"
                  style={{
                    transform: `rotate(${windDirection + 180}deg)`,
                    transition: "transform 0.5s ease",
                  }}
                >
                  <img
                    alt="Navigation Icon"
                    width="18"
                    height="18"
                    src="/navigation.svg"
                  />
                </span>
                {windCardinal}
              </div>
            </div>

            <div className="w-[328px] h-[192px] bg-[#1E213A] flex flex-col items-center justify-center rounded-lg p-4">
              <h2 className="text-base text-[#E7E7EB] text-center mb-2">
                Humidity
              </h2>
              <div className="flex items-end h-16 mb-2">
                <h3 className="text-5xl font-bold text-[#E7E7EB]">
                  {humidity}
                </h3>
                <h4 className="text-3xl mb-1 ml-1 text-[#E7E7EB]">%</h4>
              </div>
              <div className="w-[70%] flex justify-between text-[#A09FB1] text-xs mb-1">
                <p>0</p>
                <p>50</p>
                <p>100</p>
              </div>
              <div className="w-[70%] h-2 bg-[#E7E7EB] rounded-3xl mb-1">
                <div
                  className="h-2 bg-[#FFEC65] rounded-3xl"
                  style={{ width: `${humidity}%` }}
                ></div>
              </div>
              <div className="w-[70%] text-right font-bold text-[#A09FB1]">
                %
              </div>
            </div>

            <div className="w-[328px] h-[192px] bg-[#1E213A] flex flex-col items-center justify-center rounded-lg p-4">
              <h2 className="text-base text-[#E7E7EB] text-center mb-2">
                Visibility
              </h2>
              <div className="flex items-end h-16 mb-2">
                <h3 className="text-5xl font-bold text-[#E7E7EB]">
                  {visibility}
                </h3>
                <h4 className="text-3xl mb-1 ml-1 text-[#E7E7EB]">km</h4>
              </div>
            </div>

            <div className="w-[328px] h-[192px] bg-[#1E213A] flex flex-col items-center justify-center rounded-lg p-4">
              <h2 className="text-base text-[#E7E7EB] text-center mb-2">
                Air Pressure
              </h2>
              <div className="flex items-end h-16 mb-2">
                <h3 className="text-5xl font-bold text-[#E7E7EB]">
                  {pressure}
                </h3>
                <h4 className="text-3xl mb-1 ml-1 text-[#E7E7EB]">hPa</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-5 w-full flex flex-row justify-center items-center text-[#A09FB1] text-sm">
        <h4 className="font-medium text-center">Created by</h4>
        <h2 className="font-bold text-center mx-1">Santiago Copa</h2>
      </footer>
    </div>
  );
}
