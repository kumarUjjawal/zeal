import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET /api/notes - Get all notes for a user
export async function GET(request: Request) {
    try {
        // For now, we'll use a hardcoded user ID since we don't have auth yet
        // Later, this would come from the authenticated session
        const userId = 'user123';

        const notes = await prisma.page.findMany({
            where: {
                userId: userId,
                isArchived: false,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return NextResponse.json(notes);
    } catch (error) {
        console.error('Request error:', error);
        return NextResponse.json({ error: 'Error fetching notes' }, { status: 500 });
    }
}

// POST /api/notes - Create a new note
export async function POST(request: Request) {
    try {
        const json = await request.json();
        const { title, content } = json;

        // Hardcoded user ID for now
        const userId = 'user123';

        const note = await prisma.page.create({
            data: {
                title: title || 'Untitled Note',
                content: content ? JSON.parse(JSON.stringify(content)) : {},
                userId: userId,
            },
        });

        return NextResponse.json(note);
    } catch (error) {
        console.error('Request error:', error);
        return NextResponse.json({ error: 'Error creating note' }, { status: 500 });
    }
}
