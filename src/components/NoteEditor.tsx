"use client";

import React, { useState, useEffect } from 'react';

interface Note {
    id: string;
    title: string;
    content: string;
}

interface NoteEditorProps {
    note: Note;
    onUpdateNote: (id: string, title: string, content: string) => void;
}

export default function NoteEditor({ note, onUpdateNote }: NoteEditorProps) {
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');

    // Update local state when active note changes
    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    // Handle title change
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (note) {
            onUpdateNote(note.id, newTitle, content);
        }
    };

    // Handle content change
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setContent(newContent);
        if (note) {
            onUpdateNote(note.id, title, newContent);
        }
    };

    if (!note) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Select a note or create a new one</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Note title"
                        className="text-xl font-bold w-full outline-none focus:ring-2 focus:ring-purple-200 rounded px-2 py-1"
                    />
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Start writing your note..."
                    className="w-full h-full resize-none outline-none focus:ring-2 focus:ring-purple-200 rounded p-2"
                />
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
                <div>Last edited {new Date().toLocaleDateString()}</div>
                <div>{content.split(' ').filter(Boolean).length} words</div>
            </div>
        </div>
    );
}
