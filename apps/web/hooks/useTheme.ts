import { create } from "zustand";
import { Theme, ThemeStore } from "../types/Theme.type";

export const useTheme = create<ThemeStore>((set) => ({
    theme: "Nova",
    setTheme: (theme: Theme) => set({ theme })
}))