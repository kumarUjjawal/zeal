"use client";

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import NoteEditor from '../../components/NoteEditor';

export default function Dashboard() {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  // Mock data - in a real app this would come from your database
  const [notes, setNotes] = useState([
    { id: '1', title: 'Welcome Note', content: 'Welcome to Zeal! This is your first note.' },
    { id: '2', title: 'Getting Started', content: 'Learn how to use Zeal effectively.' },
    { id: '3', title: 'Features', content: 'Explore all the features available in Zeal.' },
  ]);

  const activeNote = notes.find(note => note.id === activeNoteId) || notes[0];

  const updateNote = (id: string, title: string, content: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, title, content } : note
      )
    );
  };

  const createNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: ''
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
    setActiveNoteId(newNote.id);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        notes={notes}
        activeNoteId={activeNoteId || notes[0]?.id}
        onSelectNote={setActiveNoteId}
        onCreateNote={createNewNote}
      />
      <NoteEditor
        note={activeNote}
        onUpdateNote={updateNote}
      />
    </div>
  );
}
