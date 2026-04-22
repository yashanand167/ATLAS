import { Moon, Sun, CloudRain, Cloud } from "lucide-react";
import { useWindowStore } from "../../stores/useWindowStore";
import { useEffect, useState } from "react";
import Image from "next/image";

export const WeatherView = () => {
  const addWindow = useWindowStore((state) => state.addWindow);
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.json())
      .then(data => setWeatherData(data))
      .catch(console.error);
  }, []);

  if (!weatherData) {
    return (
      <div 
        className="p-5 flex flex-col justify-between rounded-[2rem] w-56 min-h-[14rem]  ml-5 border border-blue-200/50 bg-gradient-to-br from-sky-400 to-blue-700 text-white shadow-xl opacity-80"
      >
        <div className="animate-pulse flex flex-col h-full justify-between">
          <div className="h-4 bg-white/30 rounded w-1/2 mb-2"></div>
          <div className="h-10 bg-white/30 rounded w-3/4"></div>
          <div className="mt-auto h-4 bg-white/30 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  const temp = Math.round((weatherData.main?.temp || 298.15) > 200 ? weatherData.main?.temp - 273.15 : weatherData.main?.temp);
  const tempMax = Math.round((weatherData.main?.temp_max || 298.15) > 200 ? weatherData.main?.temp_max - 273.15 : weatherData.main?.temp_max);
  const tempMin = Math.round((weatherData.main?.temp_min || 298.15) > 200 ? weatherData.main?.temp_min - 273.15 : weatherData.main?.temp_min);
  const condition = weatherData.weather?.[0]?.main || 'Clear';
  const name = weatherData.name || 'New York';

  return (
    <div 
      onClick={() => addWindow('weather', 'Weather')}
      className="p-5 flex flex-col justify-between rounded-[2rem] w-56 min-h-[14rem]  ml-5 border border-blue-200/50 bg-gradient-to-br from-sky-400 to-blue-700 text-white shadow-xl cursor-pointer hover:scale-105 transition-transform"
    >
      <div className="flex flex-col">
        <h1 className="text-xl font-medium tracking-wide">{name}</h1>
        <h2 className="text-5xl font-light mt-1">{temp}°</h2>
      </div>
      <div>
        {condition.toLowerCase().includes('rain') ? (
          <CloudRain size={24} className="text-blue-100 mb-1" />
        ) : condition.toLowerCase().includes('cloud') ? (
          <Cloud size={24} className="text-white mb-1" />
        ) : (
          <Sun size={24} className="fill-yellow-400 text-yellow-400 mb-1" />
        )}
        <div>
          <h2 className="text-base font-semibold">{condition}</h2>
          <h3 className="text-sm opacity-90">H: {tempMax}° L: {tempMin}°</h3>
        </div>
      </div>
    </div>
  );
};