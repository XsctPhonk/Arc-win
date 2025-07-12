"use client";

import React from "react";

type Note = {
  id: string;
  machineName: string;
  payoutInfo: string;
};

export default function NoteList({
  notes,
  onDelete,
}: {
  notes: Note[];
  onDelete: (id: string) => void;
}) {
  if (notes.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No notes yet.</p>;
  }

  return (
    <ul className="max-w-md mx-auto mt-6 space-y-4">
      {notes.map((note) => (
        <li
          key={note.id}
          className="border rounded p-4 bg-white shadow relative"
        >
          <h3 className="font-bold text-lg mb-1">{note.machineName}</h3>
          <p className="whitespace-pre-wrap">{note.payoutInfo}</p>
          <button
            onClick={() => onDelete(note.id)}
            className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-semibold"
            aria-label={`Delete note for ${note.machineName}`}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
