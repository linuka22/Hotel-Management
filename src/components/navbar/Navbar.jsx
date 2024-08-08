import Link from "next/link";
import styles from "./navbar.module.css";  // Ensure you create this CSS file

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogo}>Logo</div>
      <div className={styles.navbarLinks}>
        <Link href="/">Home</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/reviews">Guest Reviews</Link>
        <Link href="/sign-in" className={styles.loginLink}>Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
