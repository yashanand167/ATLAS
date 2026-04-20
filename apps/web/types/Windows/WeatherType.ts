import { Sun, Cloud, Moon } from "lucide-react";

const WeatherIcons: Record<string, any> = [
    { sunny: Sun},
    { partlyCloudy: ""},
    { cloudy: ""},
    { rain: ""},
    { snow: ""},
    { storm: ""},
    { fog: ""},
    { windy: ""}
]

const WeatherBackgroundGradients: Record<string, string> = {
    sunny: "bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500",
    partlyCloudy: "bg-gradient-to-br from-blue-400 via-sky-400 to-blue-500",
    cloudy: "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600",
    rain: "bg-gradient-to-br from-slate-600 via-blue-700 to-slate-800",
    snow: "bg-gradient-to-br from-sky-200 via-blue-200 to-sky-300",
    storm: "bg-gradient-to-br from-gray-700 via-purple-700 to-gray-900",
    fog: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500",
    windy: "bg-gradient-to-br from-teal-400 via-blue-400 to-indigo-500"
};