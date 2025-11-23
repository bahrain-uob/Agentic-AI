import React from 'react'
export default function Timestamp({ ts }) {
  return (
    <div className="text-[10px] text-gray-400 mt-1 text-right">
      {new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  )
}