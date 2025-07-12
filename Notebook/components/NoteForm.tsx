"use client";

import React, { useState } from "react";

type Note = {
  id: string;
  machineName: string;
  payoutInfo: string;
};

export default function NoteForm({ onAddNote }: { onAddNote: (note: Note) => void }) {
  const [machineName, setMachineName] = useState("");
  const [payoutInfo, setPayoutInfo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!machineName.trim() || !payoutInfo.trim()) return;

    onAddNote({
      id: crypto.randomUUID(),
      machineName: machineName.trim(),
      payoutInfo: payoutInfo.trim(),
    });

    setMachineName("");
    setPayoutInfo("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded-md shadow-md bg-white">
      <div>
        <label className="block font-semibold mb-1" htmlFor="machineName">
          Machine Name
        </label>
        <input
          id="machineName"
          type="text"
          value={machineName}
          onChange={(e) => setMachineName(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="e.g. Claw Machine - Magic Castle"
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1" htmlFor="payoutInfo">
          Payout Info / Notes
        </label>
        <textarea
          id="payoutInfo"
          value={payoutInfo}
          onChange={(e) => setPayoutInfo(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="e.g. Paid out 150 tickets on last jackpot, payout every ~10 tries"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Note
      </button>
    </form>
  );
}
