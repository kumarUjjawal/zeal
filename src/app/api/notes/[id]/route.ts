import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET /api/notes/[id] - Get a specific note
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const note = await prisma.page.findUnique({
            where: { id },
        });

        if (!note) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }

        return NextResponse.json(note);
    } catch (error) {
        console.error('Request error:', error);
        return NextResponse.json({ error: 'Error fetching note' }, { status: 500 });
    }
}

// PATCH /api/notes/[id] - Update a note
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const json = await request.json();
        const { title, content } = json;

        const updatedNote = await prisma.page.update({
            where: { id },
            data: {
                title: title !== undefined ? title : undefined,
                content: content !== undefined ? JSON.parse(JSON.stringify(content)) : undefined,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(updatedNote);
    } catch (error) {
        console.error('Request error:', error);
        return NextResponse.json({ error: 'Error updating note' }, { status: 500 });
    }
}

// DELETE /api/notes/[id] - Delete a note (or archive it)
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        // Option 1: Hard delete
        // const deletedNote = await prisma.page.delete({
        //   where: { id },
        // });

        // Option 2: Soft delete (archive)
        const archivedNote = await prisma.page.update({
            where: { id },
            data: { isArchived: true },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Request error:', error);
        return NextResponse.json({ error: 'Error deleting note' }, { status: 500 });
    }
}
