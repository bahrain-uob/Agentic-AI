import React from 'react'
import Message from './Message'
import useAutoScroll from './useAutoScroll'
export default function MessageList({ messages, containerRef }) {
  useAutoScroll(containerRef, messages)
  const handleContentLoad = () => {
    const last = containerRef.current?.querySelector('[data-last-message]')
    if (last && last.scrollIntoView) last.scrollIntoView({ behavior: 'smooth', block: 'end' })
    else if (containerRef?.current) containerRef.current.scrollTop = containerRef.current.scrollHeight
  }
  return (
    <div ref={containerRef} className="flex-1 p-4 overflow-auto space-y-3 pb-28" role="log" aria-live="polite">
      {messages.length === 0 && (
        <div className="text-center text-sm text-gray-400 mt-8">No messages yet — say hi</div>
      )}

      {messages.map((messageObj, idx) => (
        <div key={messageObj.id} data-last-message={idx === messages.length - 1 ? 'true' : undefined}>
          <Message message={messageObj} onContentLoad={handleContentLoad} />
        </div>
      ))}
    </div>
  )
}