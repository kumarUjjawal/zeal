"use client";
import debounce from 'lodash.debounce';
import React, { useState, useEffect, useMemo } from 'react';

interface Note {
    id: string;
    title: string;
    content: any;
    updatedAt: string;
}

interface NoteEditorProps {
    note: Note;
    onUpdateNote: (id: string, title: string, content: string) => void;
}

export default function NoteEditor({ note, onUpdateNote }: NoteEditorProps) {
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');

    const debouncedUpdateNote = useMemo(
        () => debounce((newTitle, newContent) => {
            onUpdateNote(note.id, newTitle, newContent);
        }, 500),
        [note.id]
    );
    // Update local state when active note changes
    useEffect(() => {
        if (note) {
            setTitle(note.title || 'Untitled Note');

            // Handle different content formats
            if (typeof note.content === 'string') {
                setContent(note.content);
            } else if (note.content?.blocks) {
                // If it's stored as JSON content with blocks
                const textContent = note.content.blocks
                    .map((block: any) => block.text)
                    .join('\n\n');
                setContent(textContent);
            } else {
                setContent('');
            }
        }
    }, [note.id]);

    // Handle title change
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (note) {
            debouncedUpdateNote(newTitle, content);  // 👈 debounce!
        }
    };

    // Handle content change
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setContent(newContent);

        // Convert text to JSON format for storage
        const contentJson = JSON.stringify({
            blocks: newContent.split('\n\n').map(paragraph => ({
                type: 'paragraph',
                text: paragraph
            })).filter(block => block.text.trim() !== '')
        });

        if (note) {
            debouncedUpdateNote(title, contentJson);  // 👈 use debounce!
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
                        className="text-xl text-gray-600 font-bold w-full outline-none focus:ring-2 focus:ring-purple-200 rounded px-2 py-1"
                    />
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Start writing your note..."
                    className="w-full h-full resize-none outline-none focus:ring-2 focus:ring-purple-200 rounded p-2 text-gray-600"
                />
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
                <div>Last edited {new Date(note.updatedAt).toLocaleDateString()}</div>
                <div>{content.split(' ').filter(Boolean).length} words</div>
            </div>
        </div>
    );
}
