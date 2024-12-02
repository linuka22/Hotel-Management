// File: src/app/(dashboard)/myAccount/page.jsx

import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import MyAccount from "./MyAccount"; // Import the Client Component

const MyAccountServer = async () => {
  // Fetch session
  const session = await getServerSession(authOptions);

  // If user is not logged in, return a message
  if (!session?.user) {
    return (
      <div className="my-account-container">
        <h1 className="my-account-header">Your Account</h1>
        <h2 className="my-account-header">Please login to see this page</h2>
      </div>
    );
  }

  // Fetch bookings for the logged-in user
  const bookings = await prisma.booking.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      roomType: true,
    },
  });

  // Pass the bookings and username to the Client Component
  return <MyAccount bookings={bookings} userName={session.user.name} />;
};

export default MyAccountServer;
