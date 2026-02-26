import { create } from "zustand";
import { WALLPAPERS, Wallpaper } from "../constants/Wallpapers";

type WallpaperStore = {
    wallpaper: Wallpaper;
    setWallpaper: (wallpaper: Wallpaper) => void;
};

export const useWallpapers = create<WallpaperStore>((set) => ({
    wallpaper: WALLPAPERS[0] as Wallpaper,
    setWallpaper: (wallpaper: Wallpaper) => set({ wallpaper }),
}));