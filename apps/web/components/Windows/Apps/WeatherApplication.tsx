'use client'
import { useState, useRef, useCallback, useEffect } from "react";
import { Search, CloudRain, Sidebar } from "lucide-react";
import { motion, useDragControls, AnimatePresence } from "motion/react";
import { useWindowStore } from "../../../stores/useWindowStore";

const MIN_WIDTH = 450;
const MIN_HEIGHT = 350;
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 500;

type ResizeDirection =
    | 'right' | 'bottom' | 'left' | 'top'
    | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export const Weather = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const { closeWindow, minimizeWindow, maximizeWindow, windows, focusWindow } = useWindowStore();
    const windowState = windows.find(w => w.appId === 'weather');
    const dragControls = useDragControls();

    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const [size, setSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
    const [position, setPosition] = useState({ x: 200, y: 150 });

    const preMaxState = useRef({ size: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }, position: { x: 200, y: 150 } });

    const resizing = useRef<ResizeDirection | null>(null);
    const startPointer = useRef({ x: 0, y: 0 });
    const startSize = useRef({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
    const startPos = useRef({ x: 200, y: 150 });
    const containerRef = useRef<HTMLDivElement>(null);
    const isDraggingWindow = useRef(false);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current && typeof window !== 'undefined') {
            setPosition({
                x: window.innerWidth / 2 - DEFAULT_WIDTH / 2,
                y: window.innerHeight / 2 - DEFAULT_HEIGHT / 2,
            });
            isFirstRender.current = false;
        }
    }, []);

    const handleMaximizeWindow = useCallback(() => {
        if (isMaximized) {
            setSize(preMaxState.current.size);
            setPosition(preMaxState.current.position);
            setIsMaximized(false);
        } else {
            preMaxState.current = { size, position };
            setSize({ width: window.innerWidth, height: window.innerHeight });
            setPosition({ x: 0, y: 0 });
            setIsMaximized(true);
            maximizeWindow('weather');
        }
    }, [isMaximized, size, position, maximizeWindow]);

    const handleMinimizeWindow = useCallback(() => {
        setIsMinimized(true);
        minimizeWindow('weather');
    }, [minimizeWindow]);

    const handleCloseWindow = useCallback(() => {
        closeWindow('weather');
    }, [closeWindow]);

    const onResizePointerDown = useCallback(
        (e: React.PointerEvent, direction: ResizeDirection) => {
            if (isMaximized) return;
            e.preventDefault();
            e.stopPropagation();
            resizing.current = direction;
            startPointer.current = { x: e.clientX, y: e.clientY };
            startSize.current = { ...size };
            startPos.current = { ...position };
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
        },
        [isMaximized, size, position]
    );

    const onResizePointerMove = useCallback((e: PointerEvent) => {
        if (!resizing.current) return;
        const dx = e.clientX - startPointer.current.x;
        const dy = e.clientY - startPointer.current.y;
        const dir = resizing.current;

        let newW = startSize.current.width;
        let newH = startSize.current.height;
        let newX = startPos.current.x;
        let newY = startPos.current.y;

        if (dir.includes('right')) newW = Math.max(MIN_WIDTH, startSize.current.width + dx);
        if (dir.includes('bottom')) newH = Math.max(MIN_HEIGHT, startSize.current.height + dy);
        if (dir.includes('left')) {
            newW = Math.max(MIN_WIDTH, startSize.current.width - dx);
            newX = startPos.current.x + (startSize.current.width - newW);
        }
        if (dir.includes('top')) {
            newH = Math.max(MIN_HEIGHT, startSize.current.height - dy);
            newY = startPos.current.y + (startSize.current.height - newH);
        }

        setSize({ width: newW, height: newH });
        setPosition({ x: newX, y: newY });
    }, []);

    const onResizePointerUp = useCallback(() => {
        resizing.current = null;
    }, []);

    useEffect(() => {
        window.addEventListener('pointermove', onResizePointerMove);
        window.addEventListener('pointerup', onResizePointerUp);
        return () => {
            window.removeEventListener('pointermove', onResizePointerMove);
            window.removeEventListener('pointerup', onResizePointerUp);
        };
    }, [onResizePointerMove, onResizePointerUp]);

    const handleDragEnd = useCallback(
        (_: any, info: any) => {
            if (isMaximized) return;
            setPosition(prev => ({
                x: prev.x + info.offset.x,
                y: prev.y + info.offset.y,
            }));
        },
        [isMaximized]
    );

    const handleTitlebarDoubleClick = useCallback(() => {
        handleMaximizeWindow();
    }, [handleMaximizeWindow]);

    const borderRadius = isMaximized ? '0' : '1rem';

    return (
        <AnimatePresence>
            {!isMinimized && (
                <motion.div
                    ref={containerRef}
                    drag={!isMaximized && resizing.current === null}
                    dragControls={dragControls}
                    dragMomentum={false}
                    dragElastic={0}
                    onDragEnd={handleDragEnd}
                    onPointerDown={() => focusWindow('weather')}
                    initial={{ opacity: 0, scale: 0.92, y: 16 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: position.y,
                        x: position.x,
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: size.width,
                        height: size.height,
                        borderRadius,
                        zIndex: windowState?.zIndex || 40,
                        overflow: 'hidden',
                        userSelect: 'none',
                    }}
                    className="bg-slate-900 text-white backdrop-blur-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] flex"
                >
                    {/* ── Resize handles ──────────────────────────────────────────────── */}
                    {!isMaximized && (
                        <>
                            <div onPointerDown={e => onResizePointerDown(e, 'right')} style={{ position: 'absolute', top: 8, right: 0, bottom: 8, width: 6, cursor: 'ew-resize', zIndex: 10 }} />
                            <div onPointerDown={e => onResizePointerDown(e, 'left')} style={{ position: 'absolute', top: 8, left: 0, bottom: 8, width: 6, cursor: 'ew-resize', zIndex: 10 }} />
                            <div onPointerDown={e => onResizePointerDown(e, 'bottom')} style={{ position: 'absolute', left: 8, right: 8, bottom: 0, height: 6, cursor: 'ns-resize', zIndex: 10 }} />
                            <div onPointerDown={e => onResizePointerDown(e, 'top')} style={{ position: 'absolute', left: 8, right: 8, top: 0, height: 6, cursor: 'ns-resize', zIndex: 10 }} />
                            <div onPointerDown={e => onResizePointerDown(e, 'bottom-right')} style={{ position: 'absolute', right: 0, bottom: 0, width: 12, height: 12, cursor: 'nwse-resize', zIndex: 11 }} />
                            <div onPointerDown={e => onResizePointerDown(e, 'bottom-left')} style={{ position: 'absolute', left: 0, bottom: 0, width: 12, height: 12, cursor: 'nesw-resize', zIndex: 11 }} />
                            <div onPointerDown={e => onResizePointerDown(e, 'top-right')} style={{ position: 'absolute', right: 0, top: 0, width: 12, height: 12, cursor: 'nesw-resize', zIndex: 11 }} />
                            <div onPointerDown={e => onResizePointerDown(e, 'top-left')} style={{ position: 'absolute', left: 0, top: 0, width: 12, height: 12, cursor: 'nwse-resize', zIndex: 11 }} />
                        </>
                    )}

                    {isSidebarOpen && (
                        <div className="w-64 h-full bg-slate-800 border-r border-slate-700/50 bg-black/50 shrink-0 flex flex-col">
                            <div 
                                className="flex items-center justify-between p-4"
                                onPointerDown={e => {
                                    if (isMaximized) return;
                                    isDraggingWindow.current = true;
                                    dragControls.start(e);
                                }}
                                onDoubleClick={handleTitlebarDoubleClick}
                                style={{ cursor: isMaximized ? 'default' : 'grab' }}
                            >
                                <div className="flex items-center gap-2">
                                    <motion.button
                                        whileTap={{ scale: 0.85 }}
                                        whileHover={{ scale: 1.15 }}
                                        onClick={handleCloseWindow}
                                        className="w-3 h-3 bg-[#ff5f57] rounded-full flex items-center justify-center group relative z-50"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 text-[#800000] text-[7px] leading-none font-bold">✕</span>
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.85 }}
                                        whileHover={{ scale: 1.15 }}
                                        onClick={handleMinimizeWindow}
                                        className="w-3 h-3 bg-[#febc2e] rounded-full flex items-center justify-center group relative z-50"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 text-[#7a5800] text-[8px] leading-none font-bold">–</span>
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.85 }}
                                        whileHover={{ scale: 1.15 }}
                                        onClick={handleMaximizeWindow}
                                        className="w-3 h-3 bg-[#28c840] rounded-full flex items-center justify-center group relative z-50"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 text-[#0a4000] text-[7px] leading-none font-bold">
                                            {isMaximized ? '⊙' : '⤢'}
                                        </span>
                                    </motion.button>
                                </div>

                                <div className="flex items-center" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <button className="hover:bg-white/10 p-1 rounded transition-colors relative z-50">
                                        <Sidebar size={18} className="text-white/80" />
                                    </button>
                                </div>
                            </div>

                            <div className="px-4 mt-2">
                                <div className="relative z-50 cursor-text">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                                    <input 
                                        type="text" 
                                        placeholder="Search location" 
                                        value={searchQuery} 
                                        onChange={(e) => setSearchQuery(e.target.value)} 
                                        className="w-full bg-white/10 border border-white/5 rounded-md py-1.5 pl-9 pr-3 text-sm outline-none focus:bg-white/20 transition-colors placeholder:text-white/40"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 flex flex-col relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-800">
                        <div 
                            className="absolute top-0 left-0 w-full h-12 flex items-center px-4"
                            onPointerDown={e => {
                                if (isMaximized) return;
                                isDraggingWindow.current = true;
                                dragControls.start(e);
                            }}
                            onDoubleClick={handleTitlebarDoubleClick}
                            style={{ cursor: isMaximized ? 'default' : 'grab' }}
                        >
                            {!isSidebarOpen && (
                                <div className="flex items-center gap-4 z-10 w-full">
                                    <div className="flex items-center gap-2 pr-4 border-r border-slate-700">
                                        <motion.button whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.15 }} onClick={handleCloseWindow} className="w-3 h-3 bg-[#ff5f57] rounded-full flex items-center justify-center group relative z-50">
                                            <span className="opacity-0 group-hover:opacity-100 text-[#800000] text-[7px] leading-none font-bold">✕</span>
                                        </motion.button>
                                        <motion.button whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.15 }} onClick={handleMinimizeWindow} className="w-3 h-3 bg-[#febc2e] rounded-full flex items-center justify-center group relative z-50">
                                            <span className="opacity-0 group-hover:opacity-100 text-[#7a5800] text-[8px] leading-none font-bold">–</span>
                                        </motion.button>
                                        <motion.button whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.15 }} onClick={handleMaximizeWindow} className="w-3 h-3 bg-[#28c840] rounded-full flex items-center justify-center group relative z-50">
                                            <span className="opacity-0 group-hover:opacity-100 text-[#0a4000] text-[7px] leading-none font-bold">{isMaximized ? '⊙' : '⤢'}</span>
                                        </motion.button>
                                    </div>
                                    <button onClick={() => setIsSidebarOpen(true)} className="hover:bg-white/10 p-1 rounded transition-colors shrink-0 relative z-50">
                                        <Sidebar size={18} className="text-white/80" />
                                    </button>
                                    <div className="flex-1 h-full" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center p-8">
                            <CloudRain size={72} className="text-blue-400 mb-6 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                            <h2 className="text-4xl font-light mb-2 tracking-wide">San Francisco</h2>
                            <p className="text-7xl font-bold mb-4 tracking-tighter">18°</p>
                            <p className="text-lg text-blue-200/80">Mostly clear • H: 21° L: 13°</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};