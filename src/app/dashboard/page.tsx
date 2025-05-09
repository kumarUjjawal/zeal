"use client";
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import NoteEditor from '../../components/NoteEditor';

interface Note {
  id: string;
  title: string;
  content: any;
  updatedAt: string;
}

export default function NotesPage() {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch notes from API
  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch('/api/notes');
        if (!response.ok) throw new Error('Failed to fetch notes');

        const data = await response.json();
        setNotes(data);

        // Set the first note as active if none is selected
        if (data.length > 0 && !activeNoteId) {
          setActiveNoteId(data[0].id);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setIsLoading(false);
      }
    }

    fetchNotes();
  }, []);

  const activeNote = notes.find(note => note.id === activeNoteId);

  const updateNote = async (id: string, title: string, content: any) => {
    try {
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === id ? { ...note, title, content, updatedAt: new Date().toISOString() } : note
        )
      );

      const response = await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),  // ✅ clean
      });

      if (!response.ok) throw new Error('Failed to update note');

      const updatedNote = await response.json();
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === id ? { ...note, ...updatedNote } : note
        )
      );
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };
  const createNewNote = async () => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Untitled Note',
          content: JSON.stringify({ blocks: [{ type: 'paragraph', text: '' }] }),
        }),
      });

      if (!response.ok) throw new Error('Failed to create note');

      const newNote = await response.json();
      setNotes(prevNotes => [newNote, ...prevNotes]);
      setActiveNoteId(newNote.id);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    let noteToDelete: Note | undefined;

    try {
      // Optimistically update UI
      noteToDelete = notes.find(note => note.id === id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));

      // If the deleted note was active, set another note as active
      if (activeNoteId === id) {
        const nextNote = notes.find(note => note.id !== id);
        setActiveNoteId(nextNote ? nextNote.id : null);
      }

      // Send delete request to API
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete note');
    } catch (error) {
      console.error('Error deleting note:', error);
      // Rollback in case of error
      if (noteToDelete) {
        setNotes(prevNotes => [...prevNotes, noteToDelete as Note]);  // ✅ Force TS to treat as Note
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        notes={notes}
        activeNoteId={activeNoteId}
        onSelectNote={setActiveNoteId}
        onCreateNote={createNewNote}
        onDeleteNote={deleteNote}
      />
      {activeNote ? (
        <div className='flex-1 overflow-y-auto'>
          <NoteEditor
            note={activeNote}
            onUpdateNote={updateNote}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h3 className="text-xl font-medium text-gray-600 mb-2">No note selected</h3>
            <p className="text-gray-500 mb-4">Select a note from the sidebar or create a new one</p>
            <button
              onClick={createNewNote}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Create New Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
