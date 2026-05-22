'use client'

import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import { useState } from 'react'

interface SwipeableItemProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  leftBg?: string
  rightBg?: string
  threshold?: number
  disabled?: boolean
}

export default function SwipeableItem({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftIcon,
  rightIcon,
  leftBg = 'bg-red-500/80',
  rightBg = 'bg-green-500/80',
  threshold = 72,
  disabled = false,
}: SwipeableItemProps) {
  const x = useMotionValue(0)
  const [flying, setFlying] = useState(false)
  const [flyDir, setFlyDir] = useState(0)

  const leftOpacity = useTransform(x, [0, threshold], [0, 1])
  const rightOpacity = useTransform(x, [-threshold, 0], [1, 0])
  const leftScale = useTransform(x, [0, threshold], [0.7, 1])
  const rightScale = useTransform(x, [-threshold, 0], [1, 0.7])

  const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
    if (disabled) return
    if (info.offset.x > threshold && onSwipeRight) {
      setFlyDir(1); setFlying(true)
      setTimeout(() => { onSwipeRight(); setFlying(false) }, 230)
    } else if (info.offset.x < -threshold && onSwipeLeft) {
      setFlyDir(-1); setFlying(true)
      setTimeout(() => { onSwipeLeft(); setFlying(false) }, 230)
    }
  }

  if (disabled) return <>{children}</>

  return (
    <div className="relative overflow-hidden">
      {onSwipeRight && (
        <motion.div
          style={{ opacity: leftOpacity, scale: leftScale }}
          className={`absolute inset-y-0 left-0 w-20 ${rightBg} flex items-center justify-center z-0`}
        >
          {rightIcon}
        </motion.div>
      )}
      {onSwipeLeft && (
        <motion.div
          style={{ opacity: rightOpacity, scale: rightScale }}
          className={`absolute inset-y-0 right-0 w-20 ${leftBg} flex items-center justify-center z-0`}
        >
          {leftIcon}
        </motion.div>
      )}
      <motion.div
        style={{ x }}
        drag={disabled ? false : 'x'}
        dragConstraints={{
          left: onSwipeLeft ? -140 : 0,
          right: onSwipeRight ? 140 : 0,
        }}
        dragElastic={{ left: 0.15, right: 0.15 }}
        onDragEnd={handleDragEnd}
        animate={flying ? { x: flyDir * 420, opacity: 0 } : { x: 0 }}
        transition={
          flying
            ? { duration: 0.22, ease: 'easeIn' }
            : { type: 'spring', stiffness: 600, damping: 45 }
        }
        className="relative z-10 touch-pan-y cursor-grab active:cursor-grabbing"
      >
        {children}
      </motion.div>
    </div>
  )
}
