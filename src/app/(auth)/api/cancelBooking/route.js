import nodemailer from 'nodemailer';
import { prisma } from '../../../../lib/prisma'; // Adjust the import based on your Prisma setup

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const bookingId = searchParams.get('bookingId');
  const userEmail = searchParams.get('userEmail');

  if (!bookingId || !userEmail) {
    console.error('Missing bookingId or userEmail:', { bookingId, userEmail });
    return new Response(JSON.stringify({ message: 'Missing bookingId or userEmail' }), { status: 400 });
  }

  try {
    // Fetch booking details before deletion
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(bookingId) },
      include: { roomType: true }, // Include room type details
    });

    if (!booking) {
      console.error('Booking not found for ID:', bookingId);
      return new Response(JSON.stringify({ message: 'Booking not found' }), { status: 404 });
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id: parseInt(bookingId) },
    });

    // Create the transporter with App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use the App Password here
      },
    });

    // Prepare email details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Booking Cancellation Confirmation',
      text: `Dear User,

      Your booking has been successfully canceled. Here are the details of the canceled booking:

      - Room Type: ${booking.roomType?.name || 'Not specified'}
      - Rooms Booked: ${booking.numberOfRooms || '0'}
      - Check-in Date: ${new Date(booking.checkInDate).toLocaleDateString()}
      - Check-out Date: ${new Date(booking.checkOutDate).toLocaleDateString()}

      Thank you for using our service.

      Best regards,
      Hotel Ardilla Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Booking canceled and email sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error canceling booking or sending email:', error);
    return new Response(JSON.stringify({ message: 'Failed to cancel booking or send email', error: error.message }), { status: 500 });
  }
}
