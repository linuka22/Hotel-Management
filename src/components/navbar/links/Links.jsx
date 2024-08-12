"use client";

import styles from "./links.module.css";
import NavLink from "./navLink/NavLink";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons"; // Using only the bars icon

const links = [
  { title: "Homepage", path: "/" },
  { title: "Reservations", path: "/reservation" },
  { title: "Gallery", path: "/gallery" },
  { title: "Contact Us", path: "/contact" },
  { title: "Guest Reviews", path: "/reviews" },
];

const Links = () => {
  const [open, setOpen] = useState(false); // Manage the open/close state

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
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <button className={styles.logout}>Logout</button>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
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
