'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw } from 'lucide-react'

const THRESHOLD = 70

export default function PullToRefresh({
  onRefresh,
  children,
}: {
  onRefresh: () => Promise<void>
  children: React.ReactNode
}) {
  const [pull, setPull] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const startY = useRef(0)
  const pulling = useRef(false)
  const scrollEl = useRef<HTMLDivElement>(null)

  const onTouchStart = useCallback((e: TouchEvent) => {
    if ((scrollEl.current?.scrollTop ?? 0) <= 0) {
      startY.current = e.touches[0].clientY
      pulling.current = true
    }
  }, [])

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!pulling.current || refreshing) return
      const delta = e.touches[0].clientY - startY.current
      if (delta > 0) {
        e.preventDefault()
        setPull(Math.min(delta * 0.45, THRESHOLD * 1.4))
      } else {
        pulling.current = false
        setPull(0)
      }
    },
    [refreshing]
  )

  const onTouchEnd = useCallback(async () => {
    if (!pulling.current) return
    pulling.current = false
    if (pull >= THRESHOLD) {
      setRefreshing(true)
      setPull(0)
      await onRefresh()
      setRefreshing(false)
    } else {
      setPull(0)
    }
  }, [pull, onRefresh])

  useEffect(() => {
    const el = scrollEl.current
    if (!el) return
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [onTouchStart, onTouchMove, onTouchEnd])

  const progress = Math.min(pull / THRESHOLD, 1)

  return (
    <div ref={scrollEl} className="h-full overflow-y-auto overscroll-y-contain">
      <AnimatePresence>
        {(pull > 0 || refreshing) && (
          <motion.div
            key="ptr"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: refreshing ? 52 : pull, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="flex items-center justify-center overflow-hidden"
          >
            <motion.div
              animate={{ rotate: refreshing ? 360 : progress * 180 }}
              transition={
                refreshing
                  ? { repeat: Infinity, duration: 0.7, ease: 'linear' }
                  : { duration: 0 }
              }
            >
              <RefreshCw
                className={`w-5 h-5 transition-colors ${progress >= 1 || refreshing ? 'text-[#F5A623]' : 'text-white/30'}`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  )
}
