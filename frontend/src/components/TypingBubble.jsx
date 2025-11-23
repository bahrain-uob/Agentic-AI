import React from 'react'
export default function TypingBubble() {
  return (
    <div className="max-w-[20%] p-3 rounded-2xl bg-ub-light border border-ub-accent/10 text-gray-400 shadow-sm">
      <div className="w-10 h-3 flex items-center gap-1">
        <span className="block w-2 h-2 bg-gray-300 rounded-full animate-pulse" />
        <span className="block w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-100" />
        <span className="block w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-200" />
      </div>
    </div>
  )
}