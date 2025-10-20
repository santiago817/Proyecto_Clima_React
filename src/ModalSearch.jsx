import React, { useState } from "react";
import axios from "axios";

export default function ModalSearch({ closeModal, onSelectCity }) {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [error, setError] = useState(null);

  const fetchSuggestions = async (query) => {
    const apiKey = import.meta.env.VITE_API_WEATHER_KEY;
    if (!query) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/find`,
        {
          params: {
            q: query,
            appid: apiKey,
            units: "metric",
          },
        }
      );

      
      setSuggestions(response.data.list);
      setError(null);
    } catch (err) {
      setError("Error al obtener las ciudades.");
      console.error(err);
    }
  };

  const fetchCityWeather = async (city) => {
    const apiKey = import.meta.env.VITE_API_WEATHER_KEY;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: `${city.name},${city.sys.country}`,
            appid: apiKey,
            units: "metric",
          },
        }
      );

      /* console.log("Clima completo de la ciudad seleccionada:", response.data); */ // VER RESULTADO EN CONSOLA

      if (onSelectCity) onSelectCity(response.data);
    } catch (err) {
      console.error("Error al obtener clima completo:", err);
    }
  };

  const handleSearchClick = () => {
    fetchSuggestions(searchValue);
  };

  const handleCitySelect = (city) => {
    /* console.log("Ciudad seleccionada:", city); */ // VER RESULTADO EN CONSOLA

    setSelectedCity(city);
    setSearchValue(`${city.name}, ${city.sys.country}`);
    setSuggestions([]);
    closeModal();

    fetchCityWeather(city);
  };

  return (
    <div className="fixed inset-0 z-50 md:w-[30%] bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-[#1E213A] w-full h-full flex flex-col items-center justify-start relative p-6">
        <button
          className="absolute top-6 right-9 text-white text-3xl"
          onClick={closeModal}
        >
          <img src="/public/close.svg" alt="Cerrar" className="h-6.5" />
        </button>

        <div className="w-full max-w-md flex items-center gap-10 mt-8 2xl:gap-30">
          <div className="flex items-center w-full border border-white px-3 py-1.5 bg-transparent">
            <img
              src="/public/search.svg"
              alt="Search icon"
              className="w-6 h-6 mr-2"
            />
            <input
              type="text"
              placeholder="Search location"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-transparent text-white placeholder-[#888e9c] focus:outline-none"
            />
          </div>

          <button
            className="w-20 h-9 bg-[#3C47E9] px-5 font-semibold text-base text-[#E7E7EB] 
             hover:text-[#def341] flex items-center justify-center 
             active:bg-[#2a34b5] transition-colors duration-150 py-1.5"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>

        {suggestions.length > 0 && (
          <ul className="absolute bg-[#1E213A] w-full max-w-[58%] mr-30 2xl:max-w-[43%] mt-20 py-1 text-white 2xl:mr-50">
            {suggestions.map((city) => (
              <li
                key={city.id}
                className="p-2 text-lg cursor-pointer hover:border hover:border-[#888e9c] hover:border-solid"
                onClick={() => handleCitySelect(city)}
              >
                {city.name}, {city.sys.country}
              </li>
            ))}
          </ul>
        )}

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
}
