import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import * as bcrypt from 'bcrypt';

// POST /api/auth/register - Register a new user
export async function POST(request: Request) {
    try {
        const json = await request.json();
        const { email, password, name } = json;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || '',
            },
        });

        // Create a welcome note for the new user
        await prisma.page.create({
            data: {
                title: 'Welcome to NoteSpace!',
                content: JSON.parse(JSON.stringify({
                    blocks: [
                        {
                            type: 'paragraph',
                            text: 'This is your first note. You can edit it or create new ones!'
                        }
                    ]
                })),
                userId: user.id,
            },
        });

        // Return the user without the password
        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error('Request error:', error);
        return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
    }
}
