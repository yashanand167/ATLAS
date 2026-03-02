'use client'

import { motion, useDragControls } from 'motion/react'
import { useState, useRef, useCallback } from 'react'
import { useWindowStore } from '../../../stores/useWindowStore'
import { Maximize, Minimize } from '@deemlol/next-icons'


const MIN_WIDTH = 320
const MIN_HEIGHT = 240
const DEFAULT_WIDTH = 520
const DEFAULT_HEIGHT = 400

export const NoteApplication = () => {
    const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();
    const dragControls = useDragControls();

    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [size, setSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })
    const [preMaxSize, setPreMaxSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })
    const [position, setPosition] = useState({ x: 100, y: 80 })
    const [preMaxPos, setPreMaxPos] = useState({ x: 100, y: 80 })

    const resizing = useRef(null)
    const startPos = useRef(null)
    const startSize = useRef(null)
    const containerRef = useRef(null)

    const handleMaximizeWindow = () => {
       if (isMaximized) {
      setSize(preMaxSize)
      setPosition(preMaxPos)
      setIsMaximized(false)
    } else {
      setPreMaxSize(size)
      setPreMaxPos(position)
      setSize({ width: window.innerWidth, height: window.innerHeight })
      setPosition({ x: 0, y: 0 })
      setIsMaximized(true)
      maximizeWindow('notes')
    }
    }

    const handleMinimizeWindow = () => {
        setIsMaximized(false);
        minimizeWindow('notes');
    }

    const handleCloseWindow = () => {
        closeWindow('notes');
    }

    return (
        <motion.div drag dragControls={dragControls} className="bg-[#2d2d2d] backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2rem] p-4 z-50">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} onClick={handleCloseWindow}
                        className='bg-red-500 rounded-full p-1.5'>
                        {/* <Close size={24} /> */}
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} onClick={handleMinimizeWindow}
                        className='bg-yellow-400 rounded-full p-1.5'
                    >
                        <Minimize size={8} className='text-black' />
                    </motion.div>

                    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} onClick={handleMaximizeWindow}
                        className='bg-green-500 rounded-full p-1.5'
                    >
                        <Maximize size={8} className='text-black' />
                    </motion.div>

                </div>

                <div>
                    <p>Hello World</p>
                </div>
            </div>
        </motion.div>
    )
}