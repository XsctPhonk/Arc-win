"use client";

import React, { useState } from "react";

export default function ChatInput({
  onSend,
  loading,
}: {
  onSend: (msg: string) => void;
  loading: boolean;
}) {
  const [input, setInput] = useState("");

  function submit() {
    if (!input.trim() || loading) return;
    onSend(input);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="flex gap-2">
      <textarea
        className="flex-grow border border-gray-400 rounded-md p-2 resize-none focus:outline-blue-500"
        rows={2}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask Arc a strategy question..."
        disabled={loading}
      />
      <button
        onClick={submit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 rounded-md disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}
