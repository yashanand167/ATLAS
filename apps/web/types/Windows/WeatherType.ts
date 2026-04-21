type WeatherType =
  | "sunny"
  | "partlyCloudy"
  | "cloudy"
  | "rain"
  | "snow"
  | "storm"
  | "fog"
  | "windy";

export function mapWeatherCondition(data: any): WeatherType {
  const main = data.weather[0].main.toLowerCase();
  const description = data.weather[0].description.toLowerCase();
  const windSpeed = data.wind?.speed || 0;

  if (main.includes("clear")) return "sunny";

  if (main.includes("clouds")) {
    if (description.includes("few") || description.includes("scattered")) {
      return "partlyCloudy";
    }
    return "cloudy";
  }

  if (main.includes("rain") || main.includes("drizzle")) return "rain";

  if (main.includes("snow")) return "snow";

  if (main.includes("thunderstorm")) return "storm";

  if (main.includes("mist") || main.includes("fog") || main.includes("haze")) {
    return "fog";
  }

  if (windSpeed > 8) return "windy";

  return "sunny";
}