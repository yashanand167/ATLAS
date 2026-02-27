import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import { Taskbar } from "../components/Windows/Taskbar";
import { WeatherView } from "../components/mini-interfaces/WeatherView";

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
  return (
    <div
      className="w-screen h-screen overflow-hidden relative bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564')" }}
    >
      <main className="w-full h-full bg-black/20">
        <div className="pt-2">
          <WeatherView />
        </div>
        <Taskbar />
      </main>
    </div>
  );
}
