import { useLayoutEffect } from 'react'
export default function useAutoScroll(containerRef, messages) {
  useLayoutEffect(() => {
    if (!containerRef?.current) return
    const last = containerRef.current.querySelector('[data-last-message]')
    if (last && last.scrollIntoView) {
      const rafId = requestAnimationFrame(() => last.scrollIntoView({ behavior: 'smooth', block: 'end' }))
      return () => cancelAnimationFrame(rafId)
    }
    try {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
    } catch (e) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, containerRef])
}