'use client'

import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import { Taskbar } from "../components/Windows/Taskbar";
import { WeatherView } from "../components/mini-interfaces/WeatherView";
import { useWallpapers } from "../stores/useWallpapers";
import { useWindowStore } from "../stores/useWindowStore";
import { Weather } from "../components/Windows/Apps/WeatherApplication";
import { AnimatePresence } from "motion/react";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {

  const { wallpaper } = useWallpapers();
  const windows = useWindowStore((state) => state.windows);
  const isWeatherOpen = windows.some(w => w.appId === 'weather');

  return (
    <div
      className="w-screen h-screen overflow-hidden relative bg-cover bg-center aspect-auto"
      style={{ backgroundImage: `url('${wallpaper?.src}')` }}
    >
      <main className="w-full h-full bg-black/20">
        <div className="pt-2">
          <WeatherView />
        </div>
        
        <AnimatePresence>
          {isWeatherOpen && <Weather />}
        </AnimatePresence>

        <Taskbar />
      </main>
    </div>
  );
}
