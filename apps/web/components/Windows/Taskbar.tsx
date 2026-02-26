'use client'

import Image from "next/image"
import { Settings } from "@deemlol/next-icons";

export const Taskbar = () => {
    return (
        <div className="flex flex-row gap-5 fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#2d2d2d]/50 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2rem] p-6 z-50">
            <div className="flex items-center p-2 bg-gradient-to-b from-[#e5e5e5] to-[#c7c7c7] rounded-lg shadow-inner">
                <div className="p-2 aspect-square bg-black rounded-full shadow-md flex items-center justify-center">
                    <Settings className="text-white" />
                </div>
            </div>

            <div className="flex items-center p-2 bg-gradient-to-b from-[#e5e5e5] to-[#c7c7c7] rounded-lg shadow-inner">
                <div className="p-2 aspect-square bg-black rounded-full shadow-md flex items-center justify-center">
                    <Settings className="text-white" />
                </div>
            </div>

            <div className="flex items-center p-2 bg-gradient-to-b from-[#e5e5e5] to-[#c7c7c7] rounded-lg shadow-inner">
                <div className="p-2 aspect-square bg-black rounded-full shadow-md flex items-center justify-center">
                    <Settings className="text-white" />
                </div>
            </div>

            <div className="flex items-center p-2 bg-gradient-to-b from-[#e5e5e5] to-[#c7c7c7] rounded-lg shadow-inner">
                <div className="p-2 aspect-square bg-black rounded-full shadow-md flex items-center justify-center">
                    <Settings className="text-white" />
                </div>
            </div>
        </div>
    )
}
