import nodemailer from 'nodemailer';
import { prisma } from '../../../../lib/prisma'; // Adjust the import based on your Prisma setup

export async function POST(req) {
  const { userEmail, bookingDetails } = await req.json();

  if (!userEmail || !bookingDetails) {
    console.error('Missing userEmail or bookingDetails:', { userEmail, bookingDetails });
    return new Response(JSON.stringify({ message: 'Missing data in request' }), { status: 400 });
  }

  // Check if roomType exists (we'll use roomType here, but it's actually roomTypeId in the database)
  const roomTypeId = parseInt(bookingDetails.roomType); // Convert string to number
  if (!roomTypeId) {
    console.error('Invalid roomTypeId:', bookingDetails.roomType);
    return new Response(JSON.stringify({ message: 'Invalid roomTypeId' }), { status: 400 });
  }

  // Fetch the room type name from the database based on roomTypeId
  const roomType = await prisma.roomType.findUnique({
    where: { id: roomTypeId },
  });

  if (!roomType) {
    console.error('Room type not found:', roomTypeId);
    return new Response(JSON.stringify({ message: 'Room type not found' }), { status: 404 });
  }

  // Create the transporter with the App Password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use the App Password here
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Booking Confirmation',
    text: `Dear User,

    Your booking has been successfully processed. Here are the details:

    Room Type: ${roomType.name}
    Rooms Booked: ${bookingDetails.roomsBooked}
    Check-in Date: ${new Date(bookingDetails.checkInDate).toLocaleDateString()}
    Check-out Date: ${new Date(bookingDetails.checkOutDate).toLocaleDateString()}
    Total Amount: Rs. ${bookingDetails.totalAmount}

    Thank you for your booking!

    Best regards,
    Hotel Ardilla Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Failed to send email', error: error.message }), { status: 500 });
  }
}
