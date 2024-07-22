import Link from "next/link";
import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar-logo">Logo</div>
        <div className="navbar-links">
            <Link href="/">Home</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/reviews">Guest Reviews</Link>
        </div>
    </div>
   )
}

export default Navbar;
