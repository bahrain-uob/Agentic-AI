import React from 'react'
export default function Header({ onClear }) {
  return (
    <div className="px-4 py-3 border-b border-ub-accent flex items-center justify-between bg-ub-dark text-white">
      <div>
        <div className="font-semibold">UOB Agentic AI</div>
        <div className="text-xs text-ub-gold">Ask me</div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onClear} className="text-sm text-ub-gold hover:underline">Clear</button>
      </div>
    </div>
  )
}