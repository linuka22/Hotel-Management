"use client";

import styles from "./links.module.css";
import NavLink from "./navLink/NavLink";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons"; // Using only the bars icon
import { useRouter } from "next/navigation"; // Import the useRouter hook

const links = [
  { title: "Homepage", path: "/" },
  { title: "Reservations", path: "/reservation" },
  { title: "Gallery", path: "/gallery" },
  { title: "Contact Us", path: "/contact" },
  { title: "Guest Reviews", path: "/reviews" },
];

const Links = () => {
  const [open, setOpen] = useState(false); // Manage the open/close state
  const router = useRouter(); // Initialize the useRouter hook

  const session = true;
  const isAdmin = true;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session ? (
          <>
            {isAdmin && (
              <NavLink item={{ title: "My Account", path: "/myAccount" }} />
            )}
            <button
              className={styles.logout}
              onClick={() => router.push("/sign-in")} // Redirect to /sign-in on click
            >
              Log In
            </button>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/sign-in" }} />
        )}
      </div>
      <button
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)} // Toggle open/close
      >
        <FontAwesomeIcon icon={faBars} /> {/* Always use the bars icon */}
      </button>
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink
              item={link}
              key={link.title}
              onClick={() => setOpen(false)} // Close on link click
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
