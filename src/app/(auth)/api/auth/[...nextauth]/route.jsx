import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import { db } from '../../../../../lib/db';
import * as z from 'zod';

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = signInSchema.parse(body);

    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Compare passwords
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // You can create a session or token here if you're using JWT or sessions

    return NextResponse.json({ message: 'Sign-in successful' }, { status: 200 });
  } catch (error) {
    console.error("Error in user sign-in:", error);
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}
