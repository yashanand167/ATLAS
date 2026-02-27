import { Moon } from "@deemlol/next-icons";
import { Sun } from "@deemlol/next-icons";

export const WeatherView = () => {
  return (
    <div className="p-5 flex flex-col justify-between rounded-[2rem] w-56 min-h-[14rem]  ml-5 border border-blue-200/50 bg-gradient-to-br from-sky-400 to-blue-700 text-white shadow-xl">
      <div className="flex flex-col">
        <h1 className="text-xl font-medium tracking-wide">New Delhi</h1>
        <h2 className="text-5xl font-light mt-1">25°</h2>
      </div>
      <div>
        <Sun size={24} className="fill-yellow-400 text-yellow-400 mb-1" />
        <div>
          <h2 className="text-base font-semibold">Clear</h2>
          <h3 className="text-sm opacity-90">H: 30° L: 20°</h3>
        </div>
      </div>
    </div>
  );
};