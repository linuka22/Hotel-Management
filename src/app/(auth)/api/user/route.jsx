import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { db } from '../../../../lib/db';
import * as z from 'zod';

const userSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),  // Add name field
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have more than 8 characters'),
    phoneNumber: z.string().min(10, 'Phone number must have at least 10 digits'),
    nicNumber: z.string().min(10, 'NIC number must have at least 10 characters'),
    address: z.string().min(1, 'Address is required'),
  });

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, phoneNumber, nicNumber, address } = userSchema.parse(body);

    // Check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email }
    });

    if (existingUserByEmail) {
      return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name,  // Include name
        email,
        password: hashedPassword,
        phoneNumber,
        nicNumber,
        address,
      }
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}


