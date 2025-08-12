import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("New York");
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "47b7ead28bef336c084023fc3f3a29df";

  const getWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(res.data);
      setError(null);
    } catch (err) {
      setError("City not found. Try again.");
      setWeather(null);
    }
  };

  useEffect(() => {
    getWeather();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setCity(search.trim());
      setSearch("");
    }
  };

  const formatTime = (unix) => new Date(unix * 1000).toLocaleTimeString();

  return (
    <div className="weather-container">
      <header>
        <h1>🌎 Global Weather</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for a city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {error && <p className="error">{error}</p>}
      </header>

      {weather && (
        <div className="weather-card">
          <div className="top-section">
            <div>
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <p>{new Date().toLocaleString()}</p>
              <p className="description">{weather.weather[0].description}</p>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="icon"
            />
          </div>

          <div className="bottom-section">
            <h1>{Math.round(weather.main.temp)}°C</h1>
            <div className="grid">
              <div><strong>Feels Like:</strong> {Math.round(weather.main.feels_like)}°C</div>
              <div><strong>Humidity:</strong> {weather.main.humidity}%</div>
              <div><strong>Wind:</strong> {weather.wind.speed} m/s</div>
              <div><strong>Sunrise:</strong> {formatTime(weather.sys.sunrise)}</div>
              <div><strong>Sunset:</strong> {formatTime(weather.sys.sunset)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
