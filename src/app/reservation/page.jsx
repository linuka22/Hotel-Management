"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Facilities from './Facilities';
import styles from './reservation.module.css';
import roomStyles from './roomCards.module.css';

// Import images directly
import room1 from './images/room1.jpg';
import room2 from './images/room2.jpg';
import room3 from './images/room3.jpg';
import room4 from './images/room4.jpg';
import room5 from './images/room5.jpg';
import banner from './images/banner.jpg';

const Reservations = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [filteredAvailability, setFilteredAvailability] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const rooms = [
    { img: room1, title: 'Deluxe Suite', features: ['01 BED - KING SIZE', 'FREE WI-FI'] },
    { img: room2, title: 'Superior Room', features: ['02 BEDS - QUEEN SIZE', 'FREE BREAKFAST'] },
    { img: room3, title: 'Standard Room', features: ['01 BED - QUEEN SIZE', 'TV & WIFI'] },
    { img: room4, title: 'Executive Suite', features: ['01 BED - KING SIZE', 'MINIBAR & TV'] },
    { img: room5, title: 'Family Suite', features: ['02 BEDS - KING SIZE', 'LARGE TV & WIFI'] },
  ];

  // Function to check availability by fetching data from the API
  const checkAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please select both check-in and check-out dates.');
      return;
    }

    const checkInISO = checkInDate.toISOString();
    const checkOutISO = checkOutDate.toISOString();

    try {
      const response = await fetch(
        `/api/checkAvailability?checkIn=${checkInISO}&checkOut=${checkOutISO}`
      );
      const data = await response.json();
      setFilteredAvailability(data);
    } catch (error) {
      console.error('Error fetching room availability:', error);
    }
  };

  // Define handlePrev and handleNext functions for room carousel
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
        <Image src={banner} alt="Room Reservations" layout="fill" objectFit="cover" />
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
            minDate={new Date()} // Disable past dates
          />
        </div>

        <div className={styles.datePickerWrapper}>
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            placeholderText="Check out"
            className={styles.dateInput}
            minDate={checkInDate || new Date()} // Ensure check-out is after check-in
          />
        </div>

        <button className={styles.checkAvailabilityButton} onClick={checkAvailability}>
          Check Availability
        </button>
      </div>

      <div className={styles.availabilityResults}>
        {filteredAvailability.length > 0 ? (
          filteredAvailability.map((room, index) => (
            <div key={index}>
              <p>{room.type}: {room.availableRooms} rooms available</p>
            </div>
          ))
        ) : (
          <p>Select dates to check availability</p>
        )}
      </div>

      {/* Room Cards Carousel */}
      <div className={roomStyles.carousel}>
        <button className={roomStyles.prevButton} onClick={handlePrev} disabled={currentIndex === 0}>
          &lt;
        </button>

        <div className={roomStyles.roomsSection}>
          {rooms.slice(currentIndex, currentIndex + 2).map((room, index) => (
            <div key={index} className={roomStyles.roomCard}>
              <Image src={room.img} alt={room.title} width={400} height={300} />
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
