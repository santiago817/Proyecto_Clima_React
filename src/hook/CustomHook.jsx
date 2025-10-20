import { useState, useEffect } from "react";
import axios from "axios";

export function useWeatherData({ lat, lon, type = "onecall" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_API_WEATHER_KEY;

  useEffect(() => {
    if (!lat || !lon) return;

    setLoading(true);

    let url = "";
    if (type === "onecall") {
      url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
    } else if (type === "forecast") {
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lat, lon, type, apiKey]);

  return { data, loading };
}
