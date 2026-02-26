export type WindowState = {
    id: string;
    appId: string;
    title: string;
    position: { x: number; y: number }
    size: { width: number; height: number }
    isMinimized: boolean
    isMaximized: boolean
    zIndex: number
    inBackground?: boolean
}

export type WindowStore = {
    windows: WindowState[];
    topZIndex: number;
    addWindow: (appId: string, title: string) => void;
    updateWindow: (id: string, updates: Partial<WindowState>) => void;
    setBackgroundApp: (id: string, inBackground: boolean) => void;
    focusWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    restoreWindow: (id: string) => void;
    closeWindow: (id: string) => void;
}