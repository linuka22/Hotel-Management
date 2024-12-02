// src/app/api/roomPrice/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const roomType = searchParams.get("roomType");

  if (!roomType) {
    return new Response("Room type is required", { status: 400 });
  }

  try {
    // Update this line to use findFirst instead of findUnique
    const room = await prisma.roomType.findFirst({
      where: { name: roomType },
      select: { price: true },
    });

    if (!room) {
      return new Response("Room not found", { status: 404 });
    }

    return new Response(JSON.stringify({ price: room.price }), { status: 200 });
  } catch (error) {
    console.error("Error fetching room price:", error);
    return new Response("Error fetching room price", { status: 500 });
  }
}
