"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"; // Import the Image component
import styles from "./navbar.module.css";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const links = [
  { title: "Homepage", path: "/" },
  { title: "Reservations", path: "/reservation" },
  { title: "Gallery", path: "/gallery" },
  { title: "Contact Us", path: "/contact" },
  { title: "Your Feedback", path: "/reviews" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const { data: session, status } = useSession(); // Fetch session using useSession
  const isAdmin = true;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${styles.container} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/logoimage.png" // Update the path
            alt="Logo"
            width={250} // Adjust as needed
            height={200} // Adjust as needed
          />
        </Link>
      </div>
      <div className={styles.links}>
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.path}
            className={`${styles.link} ${
              pathName === link.path && styles.active
            }`}
          >
            {link.title}
          </Link>
        ))}
        {session?.user ? (
          <>
            {isAdmin && (
              <Link
                href="/myAccount"
                className={`${styles.link} ${
                  pathName === "/myAccount" && styles.active
                }`}
              >
                My Account
              </Link>
            )}
            <button className={styles.logout} onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <Link className={styles.link} href="/sign-in">
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Mobile Links */}
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.path}
              className={`${styles.link} ${
                pathName === link.path && styles.active
              }`}
              onClick={() => setOpen(false)}
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
