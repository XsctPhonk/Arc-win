"use client";

import React, { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

type Note = {
  id: string;
  machineName: string;
  payoutInfo: string;
};

const STORAGE_KEY = "arcwin-notes";

export default function NotebookPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function addNote(note: Note) {
    setNotes((prev) => [note, ...prev]);
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function downloadNotes() {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "arcwin-notes.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  return (
    <main className="p-6 max-w-3xl mx-auto bg-gray-50 rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Arc-win Notebook</h1>

      <NoteForm onAddNote={addNote} />

      <div className="text-center mt-6">
        <button
          onClick={downloadNotes}
          disabled={notes.length === 0}
          className={`px-6 py-2 rounded text-white ${
            notes.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Download Notes
        </button>
      </div>

      <NoteList notes={notes} onDelete={deleteNote} />
    </main>
  );
}
