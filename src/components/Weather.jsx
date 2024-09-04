import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    try {

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
        icon: data.weather[0].icon,
      });

    } catch (error) {

    }
  }

  useEffect(() => {
    search('Queen Creek');
  }, [])

  const handleSearch = () => {
    const city = inputRef.current.value;
    search(city);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search' onKeyPress={handleKeyPress}/>
        <img src={search_icon} alt="search" onClick={handleSearch} />
      </div>
      <img src={`https://openweathermap.org/img/wn/${weatherData?.icon}@2x.png`} alt="weather icon" className='weather-icon'/>
      <p className='temperature'>{weatherData?.temperature}°F</p>
      <p className='location'>{weatherData?.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity" />
          <div className="">
            <p>{weatherData?.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="wind" />
          <div className="">
            <p>{weatherData?.windSpeed} MPH</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
