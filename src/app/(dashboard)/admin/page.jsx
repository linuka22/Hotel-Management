import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"

const Admin = async () => {
  // Static text for testing
  const staticContent = (
    <div>
      <h1 className="text-4xl">Admin Page</h1>
      <p className="text-lg">This is a test to check if the admin page is rendering.</p>
      <h2 className="text-2xl">Welcome to the Admin Section</h2>
      <p>If you can see this, the page is working!</p>
    </div>
  );

  // Session check
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div>
        {staticContent}
        <h2 className="text-2xl">Admin page - welcome back {session?.user.name}</h2>
      </div>
    );
  }

  return (
    <div>
      {staticContent}
      <h2>Please login to see this admin page</h2>
    </div>
  );
}

export default Admin;
