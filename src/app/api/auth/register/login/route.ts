import { NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import prisma from '../../../../../lib/prisma';
// POST /api/auth/login - Log in a user
export async function POST(request: Request) {
    try {
        const json = await request.json();
        const { email, password } = json;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify password
        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Create a JWT token for the session
        // Note: In production, use a proper secret key stored in env variables
        const token = sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'supersecret',
            { expiresIn: '7d' }
        );

        // Set cookie with the token
        const cookie = serialize('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        // Return the user without the password
        const { password: _, ...userWithoutPassword } = user;

        const response = NextResponse.json(userWithoutPassword);
        response.headers.set('Set-Cookie', cookie);

        return response;
    } catch (error) {
        console.error('Request error:', error);
        return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
    }
}
