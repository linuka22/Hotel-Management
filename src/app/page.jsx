"use client"; // This tells Next.js that this is a Client Component

import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from './home.module.css';
import Image from 'next/image';



export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);

  const images1 = ['/home1.png', '/home2.png', '/home3.png' ];
  const images2 = ['/image1.png'];
  const images3 = ['/image2.png'];
  const images4 = ['/image3.png'];
  const images5 = ['/dishes.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsZooming(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images1.length - 1 ? 0 : prevIndex + 1
        );
        setIsZooming(false);
      }, 1000); // Match this timeout with the CSS transition duration
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images1.length]);

  return (
    <div>
    <div className={styles.container}>
      <Head>
        <title>Luxurious Hotel</title>
        <meta
          name="description"
          content="Book your dream stay with us today!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`${styles.heroSection} ${
          isZooming ? styles['zoom-enter-active'] : ''
        }`}
        style={{ backgroundImage: `url(${images1[currentImageIndex]})`,objectFit: 'cover' }}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.whiteText}>LUXURIOUS </span>
            <span className={styles.redText}>HOTEL</span>
          </h1>
          <div className={styles.buttonsContainer}>
            <button className={styles.exploreButton}>EXPLORE HOTEL</button>
            <button className={styles.bookButton}>
              <span>📅 BOOK A ROOM NOW</span>
            </button>
          </div>
        </div>
        <div className={styles.textOverlay}>
          <p>Book Your Dream</p>
          <p>Stay with Us Today!</p>
        </div>
      </div>
    </div>

   <main className={styles.main}>
        <section className={styles.whatWeDo}>
          <h2>What We Do</h2>
          <p>
            We offer luxurious accommodations, seamless booking, exceptional service, and unforgettable experiences tailored just for you.
          </p>
          <div className={styles.services}>
            <div className={styles.serviceItem}>
              <img src={images2}></img>
              <p>Elegant Room</p>
            </div>
            <div className={styles.serviceItem}>
            <img src={images3}></img>
              <p>Exquisite Bar</p>
            </div>
            <div className={styles.serviceItem}>
            <img src={images4}></img>
              <p>Fresh SeaFood</p>
            </div>
          </div>
        </section>
        </main> 

<div className={styles.weAreSupreme}>
  <div className={styles.imageWrapper}>
    <Image src="/dishes.png" alt="Supreme Dining" width={500} height={300} />
  </div>
  <div className={styles.textWrapper}>
    <h3>WE ARE SUPREME</h3>
    <p>
      Indulge in a culinary adventure with our masterfully crafted dishes, exquisite beverages, and an ambiance that will make every
      meal a delightful experience. Our restaurant is where every occasion becomes special.
    </p>
  </div>
</div>

      {/* Explore Reviews Section */}
      <div className={styles.reviewsSection}>
      <h2>EXPLORE REVIEWS</h2>
      <div className={styles.reviews}>
      <div className={styles.review}>
      <p>
        "I had an amazing stay at this luxurious hotel. The service was exceptional, the rooms were stunning, and the food was
        out-of-this-world. Can't wait to return!"
      </p>
      <h4>Joe Root</h4>
      </div>
      <div className={styles.review}>
      <p>
        "A truly five-star experience! The hotel exceeded all my expectations, from the comfortable rooms to the exquisite dining
        experience."
      </p>
      <h4>Jos Buttler</h4>
      </div>
      </div>
      </div>


      </div>   

  );
}
