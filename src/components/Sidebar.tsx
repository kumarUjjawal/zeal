"use client";
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

interface Note {
    id: string;
    title: string;
    content: any;
    updatedAt: string;
}

interface SidebarProps {
    notes: Note[];
    activeNoteId: string | null;
    onSelectNote: (id: string) => void;
    onCreateNote: () => void;
    onDeleteNote: (id: string) => void;
}


export default function Sidebar({ notes, activeNoteId, onSelectNote, onCreateNote, onDeleteNote }: SidebarProps) {

    function getPreviewText(content: any): string {
        if (typeof content === 'string') {
            try {
                const parsed = JSON.parse(content);
                if (parsed?.blocks?.[0]?.text) {
                    return parsed.blocks[0].text;
                }
                return content;
            } catch {
                return content;
            }
        } else if (content?.blocks?.[0]?.text) {
            return content.blocks[0].text;
        } else {
            return '';
        }
    }
    return (
        <div className="w-64 h-full bg-gray-50 flex flex-col">
            <div className="p-4">
                <Link href="/" className="flex items-center">
                    <Image src='/logo.png' alt="FlowSpace" width={50} height={50} className="bg-gray-50" />
                    <h1 className="text-xl font-bold text-gray-800">FlowSpace</h1>
                </Link>
            </div>

            <div className="p-4 flex justify-between items-center">
                <h2 className="text-lg text-gray-600 font-medium">Your Notes</h2>
                <button
                    onClick={onCreateNote}
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                                ? 'bg-gray-200 text-gray-600'
                                : 'hover:bg-gray-200'}
                            `}
                        >
                            <div className="font-medium text-gray-600 truncate">{note.title}</div>
                            <div className="text-sm text-gray-600 truncate">
                                {getPreviewText(note.content)}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                                {new Date(note.updatedAt).toLocaleDateString()}
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteNote(note.id);
                                }}
                                className="mt-2 p-1 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
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
