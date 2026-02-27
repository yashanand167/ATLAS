'use client'

import Image from "next/image"
import { Settings } from "@deemlol/next-icons";
import { Heart } from "@deemlol/next-icons";
import { Notes } from "../customs/Notes";
import { Music } from "@deemlol/next-icons";


export const Taskbar = () => {
    const handleNoteWindowBehaviour = () => {

    }

    const handleHealthWindowBehaviour = () => {

    }

    const handleSettingsWindowBehaviour = () => {

    }

    return (
        <div className="flex flex-row gap-5 fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#2d2d2d]/50 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2rem] p-4 z-50">
            <div className="flex flex-shrink-0 items-center justify-center w-[60px] h-[60px] bg-gradient-to-b from-[#FF476C] to-[#FF0015] rounded-2xl shadow-inner border border-[#FFAAAA]">
                <Music size={32} className="text-white " />
            </div>

            <div className="flex flex-shrink-0 items-center justify-center w-[60px] h-[60px]" onClick={handleNoteWindowBehaviour}>
                <Notes className="w-[56px] h-[56px] object-contain drop-shadow-sm" />
            </div>

            <div className="flex flex-shrink-0 items-center justify-center w-[60px] h-[60px] bg-gradient-to-b from-[#F0F3F4] to-[#FFE3E4] rounded-2xl shadow-inner border border-[#FFFFFF]">
                <Heart size={32} className="text-red-500 fill-red-500" />
            </div>

            <div className="flex flex-shrink-0 items-center justify-center w-[60px] h-[60px] bg-gradient-to-b from-[#C6C6C6] to-[#737373] rounded-2xl shadow-inner border border-[#D7D7D7]">
                <Settings size={32} className="text-white" />
            </div>
        </div>
    )
}
