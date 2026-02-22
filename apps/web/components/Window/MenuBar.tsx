"use client";

import { useWindowStore } from "../../hooks/useWindowStore";
import { useEffect, useState } from "react";

export default function MenuBar() {
    const windows = useWindowStore((state) => state.windows);
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const activeWindows = windows.filter(w => !w.inBackground && !w.isMinimized);
    const activeApp = activeWindows.sort((a, b) => b.zIndex - a.zIndex)[0];

    return (
        <div className="flex items-center justify-between w-full h-7 px-4 bg-white/10 dark:bg-black/20 backdrop-blur-md text-black dark:text-white text-xs fixed top-0 left-0 z-[9999] border-b border-black/10 dark:border-white/10 select-none">
            <div className="flex items-center space-x-4">
                <span className="font-bold">ATLAS</span>
                {activeApp && (
                    <span className="font-medium cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 px-2 py-0.5 rounded">{activeApp.title}</span>
                )}
            </div>

            <div className="flex items-center space-x-4">
                {windows.filter(w => w.inBackground).map(w => (
                    <span key={w.id} className="opacity-50 text-[10px] hidden sm:inline-block">
                        {w.title} (bg)
                    </span>
                ))}
                <span className="font-medium">{time}</span>
            </div>
        </div>
    )
}