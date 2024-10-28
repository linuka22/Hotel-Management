// src/app/api/checkAvailability/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const checkInDate = new Date(searchParams.get('checkIn'));
  const checkOutDate = new Date(searchParams.get('checkOut'));

  try {
    const rooms = await prisma.roomType.findMany({
      include: {
        bookings: {
          where: {
            checkInDate: { lte: checkOutDate },
            checkOutDate: { gte: checkInDate }
          }
        }
      }
    });
    

    const availability = rooms.map(room => {
      const bookedCount = room.bookings.length;
      return {
        type: room.name,
        availableRooms: room.totalRooms - bookedCount,
      };
    });

    return new Response(JSON.stringify(availability), { status: 200 });
  } catch (error) {
    console.error('Error fetching room availability:', error);
    return new Response('Error fetching availability', { status: 500 });
  }
}
