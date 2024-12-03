import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import MyAccount from "./MyAccount"; // Import the Client Component

const MyAccountServer = async () => {
  try {
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

    // Pass the bookings, username, and userEmail to the Client Component
    return <MyAccount bookings={bookings} userName={session.user.name} userEmail={session.user.email} />;
  } catch (error) {
    console.error("Error fetching bookings or session:", error);
    return (
      <div className="my-account-container">
        <h1 className="my-account-header">Your Account</h1>
        <h2 className="my-account-header">An error occurred while loading your account. Please try again later.</h2>
      </div>
    );
  }
};

export default MyAccountServer;
