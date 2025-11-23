import React from "react";
import ChatbotUI from "./components/ChatbotUI";

function App() {
  // Configure your backend URL here
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const handleSend = async (question) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          metadata: {},
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error?.message || `API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        answer: data.answer || "No answer provided",
        sources: data.sources || [],
        trace: data.trace || null,
      };
    } catch (error) {
      console.error("Error fetching from /ask endpoint:", error);
      throw error;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <ChatbotUI onSend={handleSend} />
    </div>
  );
}

export default App;
