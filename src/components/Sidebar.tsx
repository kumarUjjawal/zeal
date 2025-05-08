"use client";

import React from 'react';
import Link from 'next/link';

interface Note {
    id: string;
    title: string;
    content: string;
}

interface SidebarProps {
    notes: Note[];
    activeNoteId: string;
    onSelectNote: (id: string) => void;
    onCreateNote: () => void;
}

export default function Sidebar({ notes, activeNoteId, onSelectNote, onCreateNote }: SidebarProps) {
    return (
        <div className="w-64 h-full bg-gray-50 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <Link href="/" className="flex items-center">
                    <h1 className="text-xl font-bold text-purple-600">Zeal</h1>
                </Link>
            </div>

            <div className="p-4 flex justify-between items-center border-b border-gray-200">
                <h2 className="text-lg text-gray-600 font-medium">Your Notes</h2>
                <button
                    onClick={onCreateNote}
                    className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="space-y-1 p-2">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            onClick={() => onSelectNote(note.id)}
                            className={`p-3 rounded-lg cursor-pointer ${note.id === activeNoteId
                                ? 'bg-purple-200 text-purple-700'
                                : 'hover:bg-purple-300'
                                }`}
                        >
                            <div className="font-medium text-gray-600 truncate">{note.title}</div>
                            <div className="text-sm text-gray-500 truncate">{note.content}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-medium">
                        U
                    </div>
                    <div className="ml-2">
                        <div className="text-sm font-medium">User</div>
                        <div className="text-xs text-gray-500">user@example.com</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
