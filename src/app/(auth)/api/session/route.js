import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ user: null }), { status: 200 });
  }

  // Include userId in the response
  const userDetails = {
    id: session.user.id, // Make sure the user object in session has an id field
    name: session.user.name,
    address: session.user.address,
    phone: session.user.phone,
    email: session.user.email,
  };

  return new Response(JSON.stringify({ user: userDetails }), { status: 200 });
}
