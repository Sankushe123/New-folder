import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface WeatherData {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
    feels_like: string;
    pressure: number;
  };
  wind: {
    speed: number;
  }
  sys: {
    sunrise: number;
    sunset: number;
  }

}

const Weatherpage = () => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const { ascii_name } = useParams();
  const API_KEY = '9947bbb6f670a56fa43eef48a1ca473a';
  const API_URL = '//api.openweathermap.org/data/2.5/weather';

  useEffect(() => {

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            q: ascii_name,
            appid: API_KEY,
            units: 'metric', // Change to 'imperial' for Fahrenheit
          },
        });
        setWeatherData(response.data);
        console.log(response.data);

        
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [])
  return (
    <div className='pt-20'>
      <div className='w-[80%] p-5 mx-auto bg-slate-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-2xl mb-5 font-semibold text-blue-300'>Current Weather</h1>

        <div className='lg:flex md:block'>
          <div className='w-full'>
            {weatherData && (
              <>
                <div className='lg:w-full md:w-1/2 bg-gray-400 py-2 mt-1 mb-1 text-left ps-4 rounded-md'>
                  <h1>City : {weatherData.name}</h1>
                </div>

                <div>

                  <div className='lg:w-full md:w-1/2 bg-gray-400  py-3 rounded-md text-center'>
                    <div className=''>
                      {weatherData.weather[0].icon && (
                        <img
                          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                          alt="Weather Icon"
                          className='w-40 mx-auto'
                        />
                      )}
                    </div>
                    <div className=''>
                      <h1>Temprature : {weatherData.main.temp}°C</h1>
                      <p>Description: {weatherData.weather[0].description}</p>
                    </div>
                  </div>
                  <div className='flex lg:w-full md:w-1/2 mt-3 '>
                    <div className='w-1/2 bg-gray-400 py-3 text-center rounded-md me-1'>
                      <p>Humidity: {weatherData.main.humidity}%</p>
                    </div>
                    <div className='w-1/2 bg-gray-400 py-3 text-center rounded-md'>
                      <p>Pressure: {weatherData.main.pressure} hPa</p>
                    </div>
                  </div>
                  <div className='lg:w-full md:w-1/2 bg-gray-400 py-3 mt-3 text-center rounded-md'>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                  </div>
                  <div className='flex lg:w-full md:w-1/2 mt-3 '>
                    <div className='w-1/2 md:w-full bg-gray-400 py-3 text-center rounded-md me-1'>
                      <p>Sunrise:<br /> {weatherData.sys.sunrise}</p>
                    </div>
                    <div className='w-1/2 md:w-full bg-gray-400 py-3 text-center rounded-md'>
                      <p>Sunset:<br /> {weatherData.sys.sunset}</p>
                    </div>
                  </div>
                  <div className='lg:w-full md:w-1/2 bg-gray-400 py-3 mt-3 text-center rounded-md'>
                    <p>feels like : {weatherData.main.feels_like} m/s</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className='w-full'>
            {/* {weatherData && (
              <div>

                <div className='lg:w-full md:w-1/2 bg-gray-400  py-3 rounded-md text-center'>
                  <div className=''>
                    {weatherData.weather[0].icon && (
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                        alt="Weather Icon"
                        className='w-40 mx-auto'
                      />
                    )}
                  </div>
                  <div className=''>
                    <h1>Temprature : {weatherData.main.temp}°C</h1>
                    <p>Description: {weatherData.weather[0].description}</p>
                  </div>
                </div>
                <div className='flex lg:w-1/2 md:w-1/2 mt-3 '>
                  <div className='w-1/2 bg-gray-400 py-3 text-center rounded-md me-1'>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                  </div>
                  <div className='w-1/2 bg-gray-400 py-3 text-center rounded-md'>
                    <p>Pressure: {weatherData.main.pressure} hPa</p>
                  </div>
                </div>
                <div className='lg:w-1/2 md:w-1/2 bg-gray-400 py-3 mt-3 text-center rounded-md'>
                  <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
                <div className='flex lg:w-1/2 md:w-1/2 mt-3 '>
                  <div className='w-1/2 md:w-full bg-gray-400 py-3 text-center rounded-md me-1'>
                    <p>Sunrise:<br /> {weatherData.sys.sunrise}</p>
                  </div>
                  <div className='w-1/2 md:w-full bg-gray-400 py-3 text-center rounded-md'>
                    <p>Sunset:<br /> {weatherData.sys.sunset}</p>
                  </div>
                </div>
                <div className='lg:w-1/2 md:w-1/2 bg-gray-400 py-3 mt-3 text-center rounded-md'>
                  <p>feels like : {weatherData.main.feels_like} m/s</p>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Weatherpage


