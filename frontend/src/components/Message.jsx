import React from 'react'
import Avatar from './Avatar'
import Timestamp from './Timestamp'
import TypingBubble from './TypingBubble'

export default function Message({ message, onContentLoad }) {
  // Display typing bubble until the bot sends its response
  if (message.typing) {
    return (
      <div className="flex justify-start">
        <Avatar onLoad={onContentLoad} />
        <TypingBubble />
      </div>
    )
  }

  // Regular message display from user or bot
  return (
    <div className={`flex ${message.from === "me" ? "justify-end" : "justify-start"}`}>
      {message.from !== "me" && (
        <Avatar onLoad={onContentLoad} />
      )}

      <div className={`max-w-[78%] break-words p-3 rounded-2xl ${message.from === "me" ? "bg-ub-blue text-white rounded-br-none" : "bg-ub-light border border-ub-accent/10 text-gray-800 rounded-bl-none shadow-sm"}`}>
        <div className="text-sm whitespace-pre-wrap">{message.text}</div>
        
        {/* Display sources if they exist */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 pt-2 border-t border-ub-accent/20 text-xs text-gray-600">
            <div className="font-semibold mb-1">Sources:</div>
            <ul className="list-disc list-inside space-y-1">
              {message.sources.map((source, idx) => (
                <li key={idx} className="truncate hover:whitespace-normal cursor-help">
                  {source}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <Timestamp ts={message.ts} />
      </div>

      {message.from === "me" && <div className="w-6" />}
    </div>
  )
}