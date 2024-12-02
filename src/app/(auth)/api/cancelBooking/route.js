// File: src/app/(auth)/api/cancelBooking/route.js

import { prisma } from "../../../../lib/prisma";  // Ensure this is the correct path to your Prisma client

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get("bookingId"); // Get the bookingId from the query parameter

    if (!bookingId) {
      return new Response("Booking ID is required", { status: 400 });
    }

    // Find and delete the booking by ID
    const deletedBooking = await prisma.booking.delete({
      where: { id: Number(bookingId) }, // Ensure the ID is a number
    });

    // If booking is not found, return a 404
    if (!deletedBooking) {
      return new Response("Booking not found", { status: 404 });
    }

    return new Response("Booking cancelled successfully", { status: 200 });
  } catch (error) {
    console.error("Error canceling booking:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
