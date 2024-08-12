// Navbar.jsx
"use client";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Links from "./links/Links";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Change this value based on when you want the color to change
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.container} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>Logo</div>
      <Links />
    </div>
  );
};

export default Navbar;
