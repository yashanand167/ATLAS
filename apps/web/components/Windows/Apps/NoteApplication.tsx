'use client'
import { motion, useDragControls, AnimatePresence } from 'motion/react'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useWindowStore } from '../../../stores/useWindowStore'
import { Maximize, Minimize } from 'lucide-react'

const MIN_WIDTH = 320
const MIN_HEIGHT = 240
const DEFAULT_WIDTH = 520
const DEFAULT_HEIGHT = 400

type ResizeDirection =
  | 'right' | 'bottom' | 'left' | 'top'
  | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'

export const NoteApplication = () => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore()
  const dragControls = useDragControls()

  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [noteContent, setNoteContent] = useState('')

  const [size, setSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })
  const [position, setPosition] = useState({ x: 100, y: 80 })

  const preMaxState = useRef({ size: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }, position: { x: 100, y: 80 } })

  const resizing = useRef<ResizeDirection | null>(null)
  const startPointer = useRef({ x: 0, y: 0 })
  const startSize = useRef({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })
  const startPos = useRef({ x: 100, y: 80 })
  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingWindow = useRef(false)

  const handleMaximizeWindow = useCallback(() => {
    if (isMaximized) {
      setSize(preMaxState.current.size)
      setPosition(preMaxState.current.position)
      setIsMaximized(false)
    } else {
      preMaxState.current = { size, position }
      setSize({ width: window.innerWidth, height: window.innerHeight })
      setPosition({ x: 0, y: 0 })
      setIsMaximized(true)
      maximizeWindow('notes')
    }
  }, [isMaximized, size, position, maximizeWindow])

  const handleMinimizeWindow = useCallback(() => {
    setIsMinimized(true)
    minimizeWindow('notes')
  }, [minimizeWindow])

  const handleCloseWindow = useCallback(() => {
    closeWindow('notes')
  }, [closeWindow])

  const onResizePointerDown = useCallback(
    (e: React.PointerEvent, direction: ResizeDirection) => {
      if (isMaximized) return
      e.preventDefault()
      e.stopPropagation()
      resizing.current = direction
      startPointer.current = { x: e.clientX, y: e.clientY }
      startSize.current = { ...size }
      startPos.current = { ...position }
        ; (e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [isMaximized, size, position]
  )

  const onResizePointerMove = useCallback((e: PointerEvent) => {
    if (!resizing.current) return
    const dx = e.clientX - startPointer.current.x
    const dy = e.clientY - startPointer.current.y
    const dir = resizing.current

    let newW = startSize.current.width
    let newH = startSize.current.height
    let newX = startPos.current.x
    let newY = startPos.current.y

    if (dir.includes('right')) newW = Math.max(MIN_WIDTH, startSize.current.width + dx)
    if (dir.includes('bottom')) newH = Math.max(MIN_HEIGHT, startSize.current.height + dy)
    if (dir.includes('left')) {
      newW = Math.max(MIN_WIDTH, startSize.current.width - dx)
      newX = startPos.current.x + (startSize.current.width - newW)
    }
    if (dir.includes('top')) {
      newH = Math.max(MIN_HEIGHT, startSize.current.height - dy)
      newY = startPos.current.y + (startSize.current.height - newH)
    }

    setSize({ width: newW, height: newH })
    setPosition({ x: newX, y: newY })
  }, [])

  const onResizePointerUp = useCallback(() => {
    resizing.current = null
  }, [])

  useEffect(() => {
    window.addEventListener('pointermove', onResizePointerMove)
    window.addEventListener('pointerup', onResizePointerUp)
    return () => {
      window.removeEventListener('pointermove', onResizePointerMove)
      window.removeEventListener('pointerup', onResizePointerUp)
    }
  }, [onResizePointerMove, onResizePointerUp])

  const handleDragEnd = useCallback(
    (_: any, info: any) => {
      if (isMaximized) return
      setPosition(prev => ({
        x: prev.x + info.offset.x,
        y: prev.y + info.offset.y,
      }))
    },
    [isMaximized]
  )

  const handleTitlebarDoubleClick = useCallback(() => {
    handleMaximizeWindow()
  }, [handleMaximizeWindow])

  const borderRadius = isMaximized ? '0' : '1.5rem'

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
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            x: position.x,
            // only animate position when maximizing/restoring, not during drag
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
            zIndex: 50,
            overflow: 'hidden',
            userSelect: 'none',
          }}
          className="bg-[#1e1e1e]/95 backdrop-blur-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] flex flex-col"
        >
          {/* ── Resize handles ──────────────────────────────────────────────── */}
          {!isMaximized && (
            <>
              {/* Edges */}
              <div onPointerDown={e => onResizePointerDown(e, 'right')} style={{ position: 'absolute', top: 8, right: 0, bottom: 8, width: 6, cursor: 'ew-resize', zIndex: 10 }} />
              <div onPointerDown={e => onResizePointerDown(e, 'left')} style={{ position: 'absolute', top: 8, left: 0, bottom: 8, width: 6, cursor: 'ew-resize', zIndex: 10 }} />
              <div onPointerDown={e => onResizePointerDown(e, 'bottom')} style={{ position: 'absolute', left: 8, right: 8, bottom: 0, height: 6, cursor: 'ns-resize', zIndex: 10 }} />
              <div onPointerDown={e => onResizePointerDown(e, 'top')} style={{ position: 'absolute', left: 8, right: 8, top: 0, height: 6, cursor: 'ns-resize', zIndex: 10 }} />
              {/* Corners */}
              <div onPointerDown={e => onResizePointerDown(e, 'bottom-right')} style={{ position: 'absolute', right: 0, bottom: 0, width: 12, height: 12, cursor: 'nwse-resize', zIndex: 11 }} />
              <div onPointerDown={e => onResizePointerDown(e, 'bottom-left')} style={{ position: 'absolute', left: 0, bottom: 0, width: 12, height: 12, cursor: 'nesw-resize', zIndex: 11 }} />
              <div onPointerDown={e => onResizePointerDown(e, 'top-right')} style={{ position: 'absolute', right: 0, top: 0, width: 12, height: 12, cursor: 'nesw-resize', zIndex: 11 }} />
              <div onPointerDown={e => onResizePointerDown(e, 'top-left')} style={{ position: 'absolute', left: 0, top: 0, width: 12, height: 12, cursor: 'nwse-resize', zIndex: 11 }} />
            </>
          )}

          <div
            onPointerDown={e => {
              if (isMaximized) return
              isDraggingWindow.current = true
              dragControls.start(e)
            }}
            onDoubleClick={handleTitlebarDoubleClick}
            style={{ cursor: isMaximized ? 'default' : 'grab' }}
            className="flex items-center justify-between px-4 py-3 select-none shrink-0"
          >

            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.15 }}
                onClick={handleCloseWindow}
                className="w-3 h-3 bg-[#ff5f57] rounded-full flex items-center justify-center group"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[#800000] text-[7px] leading-none font-bold">✕</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.15 }}
                onClick={handleMinimizeWindow}
                className="w-3 h-3 bg-[#febc2e] rounded-full flex items-center justify-center group"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[#7a5800] text-[8px] leading-none font-bold">–</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.15 }}
                onClick={handleMaximizeWindow}
                className="w-3 h-3 bg-[#28c840] rounded-full flex items-center justify-center group"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[#0a4000] text-[7px] leading-none font-bold">
                  {isMaximized ? '⊙' : '⤢'}
                </span>
              </motion.button>
            </div>

            {/* Title */}
            <span className="text-white/60 text-xs font-medium tracking-widest uppercase absolute left-1/2 -translate-x-1/2">
              Notes
            </span>

            {/* Right side placeholder for balance */}
            <div className="w-16" />
          </div>

          {/* ── Divider ─────────────────────────────────────────────────────── */}
          <div className="h-px bg-white/5 shrink-0 mx-4" />

          {/* ── Note content area ───────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col overflow-hidden p-4 gap-2">
            <input
              placeholder="Title"
              className="bg-transparent text-white/90 text-lg font-semibold placeholder:text-white/20 outline-none w-full shrink-0"
              style={{ fontFamily: 'Georgia, serif' }}
            />
            <div className="h-px bg-white/5 shrink-0" />
            <textarea
              value={noteContent}
              onChange={e => setNoteContent(e.target.value)}
              placeholder="Start writing…"
              className="flex-1 bg-transparent text-white/70 text-sm placeholder:text-white/20 outline-none resize-none w-full leading-relaxed"
              style={{ fontFamily: 'Georgia, serif' }}
            />
          </div>

          {/* ── Status bar ──────────────────────────────────────────────────── */}
          <div className="shrink-0 px-4 py-2 flex items-center justify-between border-t border-white/5">
            <span className="text-white/25 text-[10px] tracking-wider">
              {noteContent.length > 0
                ? `${noteContent.split(/\s+/).filter(Boolean).length} words · ${noteContent.length} chars`
                : 'Empty note'}
            </span>
            <span className="text-white/20 text-[10px] tracking-wider">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}