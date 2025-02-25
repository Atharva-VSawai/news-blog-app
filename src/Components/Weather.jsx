import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      const defaultLocation = "Pune";
      const url = `https://api.openweatmap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=f135399d50dc931f3c60eae740d30b76`;
      const response = await axios.get(url);
      setData(response.data);
    };
    fetchDefaultLocation();
  }, []);

  const search = async () => {
    if (!location) return;

    const url = `https://api.openwearmap.org/data/2.5/weather?q=${location}&units=metric&appid=f135399d50dc931f3c60eae740d30b76`;

    try {
      const response = await axios.get(url);
      if (response.data.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(response.data);
        setLocation("");
      }
      console.log("Updated Data:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setData({ notFound: true });
      } else {
        console.log("Unexpected error: ", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  }

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clouds":
        return <i className="bx bxs-cloud"></i>;
      case "Rain":
        return <i className="bx bxs-cloud-rain"></i>;
      case "Clear":
        return <i className="bx bxs-sun"></i>;
      case "Thunderstorm":
        return <i className="bx bxs-cloud-lightning"></i>;
      case "Snow":
        return <i className="bx bxs-snow"></i>;
      case "Haze":
      case "Mist":
        return <i className="bx bxs-cloud"></i>;
      default:
        return <i className="bx bxs-cloud"></i>;
    }
  };

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name || "Enter a city"}</div>
        </div>
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>

      {data.notFound ? (
        <div className="not-found">Not Found 😌</div>
      ) : (
        data.weather && data.main && (
          <div className="weather-data">
            {getWeatherIcon(data.weather[0].main)}
            <div className="weather-type">{data.weather[0].main}</div>
            <div className="temp">{`${Math.floor(data.main.temp)}°C`}</div>
          </div>
        )
      )}
    </div>
  );
};

export default Weather;
