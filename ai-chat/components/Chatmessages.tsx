"use client";

import React from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatMessages({ messages }: { messages: Message[] }) {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-3 px-2">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-[70%] p-3 rounded-lg ${
            msg.role === "user"
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-300 text-gray-900 self-start"
          }`}
          style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start" }}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}
