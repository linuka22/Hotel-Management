const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function main() {
  // Room types data
  const roomTypes = [
    { name: 'Deluxe Suite', totalRooms: 10 },
    { name: 'Superior Room', totalRooms: 15 },
    { name: 'Executive Suite', totalRooms: 5 },
    { name: 'Junior Suite', totalRooms: 8 },
    { name: 'Standard Room', totalRooms: 20 },
  ];

  // Creating room types
  for (const room of roomTypes) {
    await prisma.roomType.create({ data: room });
  }

  // Bookings data
  const bookings = [
    { roomTypeId: 1, checkInDate: new Date('2024-11-01'), checkOutDate: new Date('2024-11-05') },
    { roomTypeId: 2, checkInDate: new Date('2024-11-03'), checkOutDate: new Date('2024-11-07') },
    { roomTypeId: 3, checkInDate: new Date('2024-11-02'), checkOutDate: new Date('2024-11-04') },
    { roomTypeId: 4, checkInDate: new Date('2024-11-01'), checkOutDate: new Date('2024-11-03') },
    { roomTypeId: 5, checkInDate: new Date('2024-11-04'), checkOutDate: new Date('2024-11-06') },
    { roomTypeId: 1, checkInDate: new Date('2024-11-08'), checkOutDate: new Date('2024-11-10') },
    { roomTypeId: 2, checkInDate: new Date('2024-11-05'), checkOutDate: new Date('2024-11-09') },
    { roomTypeId: 3, checkInDate: new Date('2024-11-12'), checkOutDate: new Date('2024-11-15') },
    { roomTypeId: 4, checkInDate: new Date('2024-11-10'), checkOutDate: new Date('2024-11-13') },
    { roomTypeId: 5, checkInDate: new Date('2024-11-14'), checkOutDate: new Date('2024-11-18') },
  ];

  // Creating bookings
  for (const booking of bookings) {
    await prisma.booking.create({ data: booking });
  }

  console.log('Database seeded with room types and bookings!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
