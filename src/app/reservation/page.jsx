"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Facilities from './facilities';
import styles from './reservation.module.css';
import roomStyles from './roomCards.module.css';

const Reservations = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const rooms = [
    // Ensure the paths to images are correct
    { img: '/room1.jpg', title: 'Deluxe Suite', features: ['01 BED - KING SIZE', 'FREE WI-FI'] },
    { img: '/room2.jpg', title: 'Superior Room', features: ['02 BEDS - QUEEN SIZE', 'FREE BREAKFAST'] },
    { img: '/room3.jpg', title: 'Standard Room', features: ['01 BED - QUEEN SIZE', 'TV & WIFI'] },
    { img: '/room4.jpg', title: 'Executive Suite', features: ['01 BED - KING SIZE', 'MINIBAR & TV'] },
    { img: '/room5.jpg', title: 'Family Suite', features: ['02 BEDS - KING SIZE', 'LARGE TV & WIFI'] },
  ];

  const handleCheckAvailability = () => {
    alert(`Checking availability for dates:\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}`);
  };

  const handleNext = () => {
    if (currentIndex < rooms.length - 2) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <Image src="/banner.jpg" alt="Room Reservations" layout="fill" objectFit="cover" />
        <h1 className={styles.bannerText}>
          <span className={styles.roomText}>ROOM</span> 
          <span className={styles.reservationText}> RESERVATION</span>
        </h1>
      </div>

      <div className={styles.dateSection}>
        <div className={styles.datePickerWrapper}>
          <DatePicker 
            selected={checkInDate} 
            onChange={(date) => setCheckInDate(date)} 
            placeholderText="Check in"
            className={styles.dateInput}
          />
        </div>
        
        <div className={styles.datePickerWrapper}>
          <DatePicker 
            selected={checkOutDate} 
            onChange={(date) => setCheckOutDate(date)} 
            placeholderText="Check out"
            className={styles.dateInput}
          />
        </div>
        
        <button className={styles.checkAvailabilityButton} onClick={handleCheckAvailability}>
          Check Availability
        </button>
      </div>

      <div className={roomStyles.carousel}>
        <button className={roomStyles.prevButton} onClick={handlePrev} disabled={currentIndex === 0}>
          &lt;
        </button>
        
        <div className={roomStyles.roomsSection}>
          {rooms.slice(currentIndex, currentIndex + 2).map((room, index) => (
            <div key={index} className={roomStyles.roomCard}>
              <img src={room.img} alt={room.title} />
              <div className={roomStyles.roomDetails}>
                <h2 className={roomStyles.roomTitle}>{room.title}</h2>
                <div className={roomStyles.roomFeatures}>
                  {room.features.map((feature, idx) => (
                    <p key={idx}>{feature}</p>
                  ))}
                </div>
                <button className={roomStyles.bookButton}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
        
        <button className={roomStyles.nextButton} onClick={handleNext} disabled={currentIndex >= rooms.length - 2}>
          &gt;
        </button>
      </div>

      <Facilities /> {/* Display after the room cards */}
    </div>
  );
};

export default Reservations;
