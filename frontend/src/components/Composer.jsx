import React from 'react'
export default function Composer({ messageText, setMessageText, handleSend, isSending }) {
  // prevent input when waiting for bot response
  const handleKeyDown = (e) => {
    if (isSending) return
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSend()
      }}
      className="px-4 py-3 bg-white border-t border-gray-100 sticky bottom-0 z-20 shadow-md"
      style={{ backdropFilter: 'blur(4px)' }}
    >
      <div className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Message"
            disabled={isSending}
            className={`w-full resize-none overflow-hidden rounded-xl border border-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 ${isSending ? 'opacity-60 cursor-not-allowed' : ''}`}
            aria-label="Message input"
          />
        </div>
        <button
          type="submit"
          disabled={isSending}
          className={`flex items-center justify-center rounded-full p-2 ${isSending ? 'bg-gray-200 text-gray-500' : 'bg-ub-blue text-white shadow-md'}`}
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5l7.5 1.5L21 3l-9 18-2-7.5L3 10.5z" />
          </svg>
        </button>
      </div>
    </form>
  )
}