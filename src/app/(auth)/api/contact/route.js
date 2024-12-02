// src/app/contact/api/contact/route.js

import { prisma } from "../../../../lib/prisma"; // Adjust based on where your Prisma client is initialized

export async function POST(req) {
  try {
    const { name, phone, email, message } = await req.json();

    // Insert data into the database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        phone,
        email,
        message,
      },
    });

    return new Response(JSON.stringify(contactMessage), {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return new Response("Failed to save message", { status: 500 });
  }
}
