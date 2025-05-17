import { useState } from 'react';
import axios from 'axios';
import './Weather.css';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

const API_KEY = '86ce7fbb66a75dee459c588500b3de65'; // Remplacez par votre clé OpenWeatherMap
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`);
      setWeather(response.data);
    } catch (err) {
      setError("Ville non trouvée ou erreur de connexion");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <form onSubmit={getWeather} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Entrez une ville..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button 
            className="btn btn-primary" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Rechercher'}
          </button>
        </div>
      </form>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {weather && (
        <div className="weather-card">
          <div className="weather-header">
            <h2>{weather.name}</h2>
            <img 
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
          
          <div className="weather-info">
            <div className="temperature">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="description">
              {weather.weather[0].description}
            </div>
          </div>

          <div className="weather-details">
            <div className="detail">
              <i className="bi bi-thermometer-half"></i>
              Ressenti: {Math.round(weather.main.feels_like)}°C
            </div>
            <div className="detail">
              <i className="bi bi-droplet"></i>
              Humidité: {weather.main.humidity}%
            </div>
            <div className="detail">
              <i className="bi bi-wind"></i>
              Vent: {Math.round(weather.wind.speed * 3.6)} km/h
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;