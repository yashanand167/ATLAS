import { create } from "zustand";
import { WindowState, WindowStore } from "../types/Windows.type";

export const useWindowStore = create<WindowStore>((set) => ({
    windows: [],
    topZIndex: 1000,
    addWindow: (appId: string, title: string) => {
        set((state) => {
            if (state.windows.some(w => w.appId === appId)) return state;
            return {
                windows: [...state.windows, { id: appId, appId, title, position: { x: 100, y: 100 }, size: { width: 400, height: 300 }, isMinimized: false, isMaximized: false, zIndex: state.topZIndex + 1, inBackground: true }],
                topZIndex: state.topZIndex + 1
            };
        })
    },
    updateWindow: (id: string, updates: Partial<WindowState>) => {
        set((state) => ({
            windows: state.windows.map((window) => window.id === id ? { ...window, ...updates } : window)
        }))
    },
    setBackgroundApp: (id: string, inBackground: boolean) => {
        set((state) => ({
            windows: state.windows.map((window) => window.id === id ? { ...window, inBackground } : window)
        }))
    },
    focusWindow: (id: string) => {
        set((state) => ({
            windows: state.windows.map((window) => window.id === id ? { ...window, zIndex: state.topZIndex + 1 } : window),
            topZIndex: state.topZIndex + 1
        }))
    },
    minimizeWindow: (id: string) => {
        set((state) => ({
            windows: state.windows.map((window) => window.id === id ? { ...window, isMinimized: true } : window)
        }))
    },
    maximizeWindow: (id: string) => {
        set((state) => ({
            windows: state.windows.map((window) => window.id === id ? { ...window, isMaximized: true } : window)
        }))
    },
    restoreWindow: (id: string) => {
        set((state) => ({
            windows: state.windows.map((window) => window.id === id ? { ...window, isMinimized: false, isMaximized: false } : window)
        }))
    },
    closeWindow: (id: string) => {
        set((state) => ({
            windows: state.windows.filter((window) => window.id !== id)
        }))
    }
}))