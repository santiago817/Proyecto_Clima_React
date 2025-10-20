import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CardHome({ selectedPlace }) {
  const [forecast, setForecast] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  const defaultCoords = { lat: -34.8316, lon: -58.439 };

  const convertToF = (celsius) => Math.round((celsius * 9) / 5 + 32);

  const getShortWeekDay = (date) =>
    new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);

  useEffect(() => {
    const fetchForecast = async (coords) => {
      const apiKey = import.meta.env.VITE_API_WEATHER_KEY;

      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast",
          {
            params: {
              lat: coords.lat,
              lon: coords.lon,
              appid: apiKey,
              units: "metric",
            },
          }
        );

        const dailyData = {};

        response.data.list.forEach((entry) => {
          const dateStr = entry.dt_txt.split(" ")[0];

          if (!dailyData[dateStr]) {
            dailyData[dateStr] = {
              temps: [],
              icons: [],
              date: new Date(entry.dt_txt),
            };
          }

          dailyData[dateStr].temps.push(entry.main.temp);
          dailyData[dateStr].icons.push(entry.weather[0].icon);
        });

        const forecastArr = Object.values(dailyData)
          .slice(0, 6)
          .map((dayData) => {
            const maxTemp = Math.max(...dayData.temps);
            const minTemp = Math.min(...dayData.temps);

            const iconCount = {};
            dayData.icons.forEach((icon) => {
              iconCount[icon] = (iconCount[icon] || 0) + 1;
            });
            const mostCommonIcon = Object.entries(iconCount).sort(
              (a, b) => b[1] - a[1]
            )[0][0];

            return {
              date: dayData.date,
              max: Math.round(maxTemp),
              min: Math.round(minTemp),
              icon: `/${mostCommonIcon}.png`,
            };
          });

        setForecast(forecastArr);
      } catch (error) {
        console.error("Error fetching forecast:", error);
        setForecast([]);
      }
    };

    if (selectedPlace?.coord) {
      fetchForecast(selectedPlace.coord);
    } else {
      fetchForecast(defaultCoords);
    }
  }, [selectedPlace]);

  return (
    <div className="w-full bg-[#100e1d] text-white flex flex-col items-center px-4 pt-8">
      <div className="relative w-full max-w-[260px] md:max-w-fit mx-auto">
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

        <div className="mt-14 grid grid-cols-2 gap-5 justify-center md:flex md:flex-row md:gap-5 md:justify-center">
          {forecast.length > 1
            ? forecast.slice(1, 6).map((item, index) => {
                const dayLabel =
                  index === 0 ? "Tomorrow" : getShortWeekDay(item.date);
                const max = isCelsius ? item.max : convertToF(item.max);
                const min = isCelsius ? item.min : convertToF(item.min);
                const unit = isCelsius ? "°C" : "°F";

                return (
                  <div
                    key={item.date.toISOString()}
                    className="w-[120px] h-[160px] bg-[#1f213b] px-3 py-3 flex flex-col items-center justify-center rounded-lg shadow-md"
                  >
                    <h3 className="text-sm mb-1 text-center">{dayLabel}</h3>
                    <img
                      src={item.icon}
                      alt="weather icon"
                      className="w-[56px] h-[64px] object-contain mb-2"
                    />
                    <div className="flex gap-2 text-sm">
                      <span className="text-white">
                        {max}
                        {unit}
                      </span>
                      <span className="text-gray-400">
                        {min}
                        {unit}
                      </span>
                    </div>
                  </div>
                );
              })
            : Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-[120px] h-[160px] bg-[#1f213b] px-3 py-3 flex flex-col items-center justify-center rounded-lg shadow-md opacity-50"
                  >
                    <h3 className="text-sm mb-1 text-center">Loading...</h3>
                    <div className="w-[56px] h-[64px] bg-gray-500 mb-2 rounded" />
                    <div className="flex gap-2 text-sm">
                      <span className="text-white">--°</span>
                      <span className="text-gray-400">--°</span>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
}
