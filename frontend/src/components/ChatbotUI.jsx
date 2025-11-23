import React, { useRef, useState } from "react";
import Header from "./Header";
import MessageList from "./MessageList";
import Composer from "./Composer";

export default function ChatbotUI({ onSend }) {
  const welcomeMessage = {
    id: 'welcome-bot',
    from: "bot",
    text: "What can I help with?",
    ts: Date.now() - 60000,
  };

  const [chatMessages, setChatMessages] = useState([welcomeMessage]);
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const containerRef = useRef(null);
  const isSendingRef = useRef(false);

  const handleSend = async () => {
    const trimmed = messageText.trim();
    if (!trimmed) return;
    if (isSendingRef.current) return;

    // user message
    const userMessage = { id: Date.now(), from: "me", text: trimmed, ts: Date.now() };
    setChatMessages((prev) => [...prev, userMessage]);
    setMessageText("");
    setErrorMessage(null);

    // typing indicator
    const typingId = `typing-${Date.now()}`;
    setChatMessages((prev) => [...prev, { id: typingId, from: "bot", text: "...", ts: Date.now(), typing: true }]);

    isSendingRef.current = true;
    setIsSending(true);

    try {
      // Call the /ask endpoint
      const response = await onSend(trimmed);
      const { answer, sources } = response;
      
      // Remove typing indicator
      setChatMessages((prev) => prev.filter((x) => !String(x.id).startsWith("typing-")));

      // Add bot response with answer and sources
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "bot",
          text: answer,
          sources: sources || [],
          ts: Date.now(),
        },
      ]);
    } catch (err) {
      // Remove typing indicator
      setChatMessages((prev) => prev.filter((x) => !String(x.id).startsWith("typing-")));
      setErrorMessage(err?.message ?? String(err));
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          from: "bot",
          text: "Error: Could not fetch response. Please try again.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setIsSending(false);
      isSendingRef.current = false;
    }
  };

  const handleClear = () => {
    setChatMessages([welcomeMessage]);
    setErrorMessage(null);
    setMessageText("");
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header onClear={handleClear} />
      <MessageList messages={chatMessages} containerRef={containerRef} />
      {errorMessage && (
        <div className="px-4 py-2 text-xs text-red-600 border-t border-red-100 bg-red-50">
          {errorMessage}
        </div>
      )}
      <Composer
        messageText={messageText}
        setMessageText={setMessageText}
        handleSend={handleSend}
        isSending={isSending}
      />
    </div>
  );
}
