'use client'

import { Settings } from "@deemlol/next-icons";
import { Heart } from "@deemlol/next-icons";
import { Notes } from "../customs/Notes";
import { Music } from "../customs/Music";
import { useWindowStore } from "../../stores/useWindowStore";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NoteApplication } from "./Apps/NoteApplication";


export const Taskbar = () => {
    const { windows, addWindow, closeWindow } = useWindowStore();

    const isAppInBackground = (appId: string) => {
        return windows.some(window => window.appId === appId && window.inBackground);
    }

    const isAppOpen = (appId: string) => {
        return windows.some(window => window.appId === appId);
    }

    const handleNoteWindowBehaviour = () => {
        if (!isAppOpen('notes')) {
            addWindow('notes', 'Notes');
        } else {
            // For now, toggle visibility or close
            const noteWindow = windows.find(w => w.appId === 'notes');
            if (noteWindow) {
                if (noteWindow.isMinimized) {
                    // Would restore, but since App manages own state, closing is safer for restart toggle
                    closeWindow('notes');
                } else {
                    closeWindow('notes');
                }
            }
        }
    }

    const handleHealthWindowBehaviour = () => {

    }

    const handleSettingsWindowBehaviour = () => {

    }

    return (
        <div className="flex flex-row gap-5 fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#2d2d2d]/50 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2rem] p-4 z-50">
            <div className="relative flex flex-col items-center">
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex flex-shrink-0 items-center justify-center w-[60px] h-[60px] bg-gradient-to-b from-[#FF476C] to-[#FF0015] rounded-2xl shadow-inner border border-[#FFAAAA]">
                    <Music className="text-white w-[42px] h-[42px] " />
                </motion.div>
                {isAppInBackground('music') && <div className="absolute -bottom-2 w-1.5 h-1.5 bg-gray-400 rounded-full shadow-sm" />}
            </div>

            <div className="relative flex flex-col items-center">
                <AnimatePresence>
                    {isAppOpen('notes') && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            className="absolute bottom-20 z-50 min-w-[300px]"
                        >
                            <NoteApplication />
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex flex-shrink-0 items-center justify-center w-[60px] h-[60px]" onClick={handleNoteWindowBehaviour}>
                    <Notes className="w-[56px] h-[56px] object-contain drop-shadow-sm" />
                </motion.div>
                {isAppInBackground('notes') && <div className="absolute -bottom-2 w-1.5 h-1.5 bg-gray-400 rounded-full shadow-sm" />}
            </div>

            <div className="relative flex flex-col items-center">
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex flex-shrink-0 items-center justify-center w-[60px] h-[60px] bg-gradient-to-b from-[#F0F3F4] to-[#FFE3E4] rounded-2xl shadow-inner border border-[#FFFFFF]" onClick={handleHealthWindowBehaviour}>
                    <Heart size={32} className="text-red-500 fill-red-500" />
                </motion.div>
                {isAppInBackground('health') && <div className="absolute -bottom-2 w-1.5 h-1.5 bg-gray-400 rounded-full shadow-sm" />}
            </div>

            <div className="relative flex flex-col items-center">
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex flex-shrink-0 items-center justify-center w-[60px] h-[60px] bg-gradient-to-b from-[#C6C6C6] to-[#737373] rounded-2xl shadow-inner border border-[#D7D7D7]" onClick={handleSettingsWindowBehaviour}>
                    <Settings size={32} className="text-white" />
                </motion.div>
                {isAppInBackground('settings') && <div className="absolute -bottom-2 w-1.5 h-1.5 bg-gray-400 rounded-full shadow-sm" />}
            </div>
        </div>
    )
}
