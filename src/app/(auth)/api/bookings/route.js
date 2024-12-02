import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function POST(req) {
  // Retrieve session details
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    console.error("User authentication failed. Session details:", session);
    return new Response(
      JSON.stringify({ message: "User is not authenticated." }),
      { status: 401 }
    );
  }

  // Parse request body
  const { roomId, numberOfRooms, checkInDate, checkOutDate } = await req.json();
  const userId = session.user.id;

  console.log("Received Booking Request:", {
    roomId,
    numberOfRooms,
    checkInDate,
    checkOutDate,
    userId,
  });

  // Validate input fields
  if (
    !roomId ||
    !numberOfRooms ||
    !checkInDate ||
    !checkOutDate ||
    isNaN(Number(roomId)) ||
    isNaN(Number(numberOfRooms))
  ) {
    console.error("Invalid or missing fields in request body:", {
      roomId,
      numberOfRooms,
      checkInDate,
      checkOutDate,
    });
    return new Response(
      JSON.stringify({ message: "Invalid or missing input fields." }),
      { status: 400 }
    );
  }

  try {
    // Find the room type
    const room = await prisma.roomType.findUnique({
      where: { id: Number(roomId) },
    });

    if (!room) {
      console.error(`Room not found. Room ID: ${roomId}`);
      return new Response(
        JSON.stringify({ message: "Room not found." }),
        { status: 404 }
      );
    }

    console.log("Room Details:", room);

    // Check room availability
    if (room.totalRooms < Number(numberOfRooms)) {
      console.warn(
        `Insufficient rooms. Requested: ${numberOfRooms}, Available: ${room.totalRooms}`
      );
      return new Response(
        JSON.stringify({
          message: `Not enough rooms available. Requested: ${numberOfRooms}, Available: ${room.totalRooms}`,
        }),
        { status: 400 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        roomTypeId: room.id,
        userId: userId,
        numberOfRooms: Number(numberOfRooms),
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
      },
    });

    console.log("Booking Created:", booking);

    // Update room availability
    await prisma.roomType.update({
      where: { id: room.id },
      data: { totalRooms: room.totalRooms },
    });

    console.log(
      `Room availability updated. Room ID: ${room.id}, Remaining Rooms: ${
        room.totalRooms - Number(numberOfRooms)
      }`
    );

    return new Response(JSON.stringify(booking), { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    return new Response(
      JSON.stringify({
        message: "Internal server error.",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
