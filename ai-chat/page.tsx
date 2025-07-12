"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

export default function AIChatPage() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  async function handleSend(message: string) {
    if (!message.trim()) return;

    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setLoading(true);

    const response = await fetch("/ai-chat/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    if (!response.ok) {
      setLoading(false);
      alert("Error: Failed to get response from AI");
      return;
    }

    const data = response.body;
    if (!data) return;

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let assistantReply = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        const chunk = decoder.decode(value);
        assistantReply += chunk;
        setMessages((prev) => {
          const msgs = [...prev];
          if (msgs[msgs.length - 1]?.role === "assistant") {
            msgs[msgs.length - 1].content = assistantReply;
          } else {
            msgs.push({ role: "assistant", content: assistantReply });
          }
          return msgs;
        });
      }
    }
    setLoading(false);
  }

  return (
    <main className="max-w-3xl mx-auto p-4 flex flex-col h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Talk to Arc</h1>
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} loading={loading} />
    </main>
  );
}
