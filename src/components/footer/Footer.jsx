import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.section}>
            <h3 className={styles.title}>THE ARDILLA</h3>
            <p className={styles.text}>
              Ardilla Hotel offers a range of top-notch facilities, including comfortable rooms, 
              a delicious seafood restaurant, a relaxing spa, and beautiful gardens for leisure walks. 
              Guests can enjoy free Wi-Fi, a welcoming bar, and friendly service to ensure a memorable stay.
            </p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.title}>QUICK LINKS</h3>
            <ul className={styles.list}>
              <li><Link href="/">HOME</Link></li>
              <li><Link href="/reservation">RESERVATIONS</Link></li>
              <li><Link href="/gallery">GALLERY</Link></li>
              <li><Link href="/contact">CONTACT US</Link></li>
              <li><Link href="/reviews">GUEST REVIEWS</Link></li>
            </ul>
          </div>
          <div className={styles.section}>
            <h3 className={styles.title}>CONTACT INFO</h3>
            <p className={styles.text}>
              TEL: +94 70 5 642 889, +94 77 3 490 065, +94 77 3 211 123
            </p>
            <p className={styles.text}>
              EMAIL: info@ardilla.lk
            </p>
            <p className={styles.text}>
              ADDRESS: No.456, Colombo-Kandy Road, Gampaha.
            </p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.title}>WE ACCEPT</h3>
            <div className={styles.cardIcons}>
              <img src="/images/visa.png" alt="Visa" className={styles.cardImage} />
              <img src="/images/mastercard.png" alt="MasterCard" className={styles.cardImage} />
              <img src="/images/amex.png" alt="American Express" className={styles.cardImage} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <p className={styles.copyright}>
          Copyright© 2024-The Ardilla-All Rights Reserved.
        </p>
        <div className={styles.bottomLinks}>
          <Link href="/accommodations">Accommodations</Link>
          <Link href="/book-now" className={styles.bookNow}>Book Now</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
