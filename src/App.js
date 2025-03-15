import './App.css';
import React, { useState, useEffect } from "react";
import WeatherTable from './weatherTable'

function App() {
  const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
  const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
  const [city, setCity] = useState("Austin");
  const [weatherData, setWeatherData] = useState([]);
  const [cityButtons, setCityButtons] = useState(["Austin", "Dallas", "Houston"]);
  const [newCity, setNewCity] = useState("");
  const getWeather = (city, addCity=false) => {
    fetch(`${GEO_API_URL}?name=${city}&count=1&language=en`)
    .then((geoData) => {return geoData.json()})
    .then((geoJson) => {
      if (!geoJson || !geoJson.results || geoJson.results.length === 0) {
        alert('Could not find city');
        return false;
      }
      const { latitude, longitude } = geoJson.results[0];
      fetch(`${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)
      .then((weatherData) => {return weatherData.json()})
      .then((weatherRes) => {
        setWeatherData(weatherRes.hourly.temperature_2m.slice(12,24));
        if (addCity) {
          setCityButtons([...cityButtons, city]);
          setCity(city);
        } 
      })
    })
  }
  
  useEffect(() => {
    getWeather(city);
  }, [city]);
  

  const handleAddCity = () => {
    if (!newCity) return;
    if (cityButtons.includes(newCity)) {
      alert("City added already");
      return;
    }
    getWeather(newCity, true)
    setNewCity("");
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        {cityButtons.map((c) => (
          <button key={c} className={'city-button'} onClick={() => setCity(c)}>
            {c}
          </button>
        ))}
        <div className="city-input">
          <input
            type="text"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
          />
          <button onClick={handleAddCity}>+</button>
        </div>
      </div>
      <div className="weather-container">
        <h2>{city} Weather</h2>
        <WeatherTable data={weatherData} />
      </div>
    </div>
  );
}

export default App;
