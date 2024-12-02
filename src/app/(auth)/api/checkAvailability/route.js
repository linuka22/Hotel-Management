import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  // Get the check-in and check-out dates from the URL query parameters
  let checkInDate = new Date(searchParams.get('checkIn'));
  let checkOutDate = new Date(searchParams.get('checkOut'));

  // Add 1 day to the check-in and check-out dates
  checkInDate.setDate(checkInDate.getDate() + 1);
  checkOutDate.setDate(checkOutDate.getDate() + 1);

  // Set the time portion of both dates to midnight for consistent comparison
  checkInDate.setHours(0, 0, 0, 0);
  checkOutDate.setHours(0, 0, 0, 0);

  try {
    // Get the list of rooms with their bookings
    const rooms = await prisma.roomType.findMany({
      include: {
        bookings: {
          where: {
            // Get all bookings that overlap with the requested period
            OR: [
              {
                checkInDate: { lt: checkOutDate }, // Booking starts before the requested check-out
                checkOutDate: { gt: checkInDate }, // Booking ends after the requested check-in
              },
            ],
          },
        },
      },
    });

    const availability = rooms.map((room) => {
      // Calculate the total number of booked rooms for the requested period
      const bookedCount = room.bookings.reduce((count, booking) => {
        const bookingStart = new Date(booking.checkInDate);
        const bookingEnd = new Date(booking.checkOutDate);

        let currentDate = new Date(checkInDate);
        
        while (currentDate < checkOutDate) {
          // If the current date is between the booking period, increment the booked rooms count
          if (currentDate >= bookingStart && currentDate < bookingEnd) {
            count += booking.numberOfRooms; // Add booked rooms for this overlapping date
          }
          currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }

        return count;
      }, 0);

      // Debugging: log booked rooms count and total rooms available
      console.log(`Room Type: ${room.name}, Total Rooms: ${room.totalRooms}, Booked Count: ${bookedCount}`);

      // Calculate available rooms for this room type
      const availableRooms = room.totalRooms - bookedCount;

      return {
        type: room.name, // Assuming room.name represents the room type
        availableRooms: availableRooms > 0 ? availableRooms : 0, // Ensure no negative availability
        price: room.price, // Assuming price is a property of the room type
      };
    });

    return new Response(JSON.stringify(availability), { status: 200 });
  } catch (error) {
    console.error('Error fetching room availability:', error);
    return new Response('Error fetching availability', { status: 500 });
  }
}
