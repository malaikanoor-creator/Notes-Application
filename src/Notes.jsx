import { useEffect, useState } from "react";

export default function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    if (!text.trim()) return;

    const newNote = {
      id: Date.now(),
      text: text,
    };

    setNotes([newNote, ...notes]);
    setText("");
  }

  function deleteNote(id) {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={addNote}
          className="border px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <p>{note.text}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
