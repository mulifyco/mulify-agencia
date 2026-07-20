'use client'

import { createElement, useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

type RevealElement = 'div' | 'p' | 'h2'
type RevealDirection = 'up' | 'left' | 'right' | 'scale' | 'fade'

const revealCallbacks = new WeakMap<Element, () => void>()
let revealObserver: IntersectionObserver | null = null

function getRevealObserver() {
  if (typeof window === 'undefined') return null
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          revealCallbacks.get(entry.target)?.()
          revealObserver?.unobserve(entry.target)
          revealCallbacks.delete(entry.target)
        })
      },
      { rootMargin: '0px 0px -80px', threshold: 0.01 }
    )
  }
  return revealObserver
}

function observeReveal(element: Element, onReveal: () => void) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    onReveal()
    return () => undefined
  }

  revealCallbacks.set(element, onReveal)
  getRevealObserver()?.observe(element)

  return () => {
    revealObserver?.unobserve(element)
    revealCallbacks.delete(element)
  }
}

export function useHomeInView<T extends HTMLElement>() {
  const [isInView, setIsInView] = useState(false)
  const elementRef = useRef<T | null>(null)

  const ref = useCallback((element: T | null) => {
    elementRef.current = element
  }, [])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    return observeReveal(element, () => setIsInView(true))
  }, [])

  return { ref, isInView }
}

export function HomeReveal({
  as = 'div',
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 600,
  style,
}: {
  as?: RevealElement
  children: ReactNode
  className?: string
  direction?: RevealDirection
  delay?: number
  duration?: number
  style?: CSSProperties
}) {
  const cleanupRef = useRef<(() => void) | null>(null)
  const ref = useCallback((element: HTMLElement | null) => {
    cleanupRef.current?.()
    cleanupRef.current = null
    if (!element) return

    cleanupRef.current = observeReveal(element, () => element.classList.add('home-reveal-visible'))
  }, [])

  useEffect(() => () => cleanupRef.current?.(), [])

  return createElement(
    as,
    {
      ref,
      className: `home-reveal home-reveal-${direction} ${className}`,
      style: {
        '--home-reveal-delay': `${delay}ms`,
        '--home-reveal-duration': `${duration}ms`,
        ...style,
      } as CSSProperties,
    },
    children
  )
}
