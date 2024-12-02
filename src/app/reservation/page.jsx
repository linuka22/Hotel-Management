"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react"; // Import next-auth session handler
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Facilities from "./Facilities";
import styles from "./reservation.module.css";
import roomStyles from "./roomCards.module.css";

import room1 from "./images/room1.jpg";
import room2 from "./images/room2.jpg";
import room3 from "./images/room3.jpg";
import room4 from "./images/room4.jpg";
import room5 from "./images/room5.jpg";
import banner from "./images/banner.jpg";

const Reservations = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [filteredAvailability, setFilteredAvailability] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rooms, setRooms] = useState([
    { id: 1, img: room1, title: "Deluxe Suite", features: ["01 BED - KING SIZE", "FREE WI-FI"] },
    { id: 2, img: room2, title: "Superior Room", features: ["02 BEDS - QUEEN SIZE", "FREE BREAKFAST"] },
    { id: 3, img: room3, title: "Standard Room", features: ["01 BED - QUEEN SIZE", "TV & WIFI"] },
    { id: 4, img: room4, title: "Executive Suite", features: ["01 BED - KING SIZE", "MINIBAR & TV"] },
    { id: 5, img: room5, title: "Family Suite", features: ["02 BEDS - KING SIZE", "LARGE TV & WIFI"] },
  ]);
  const router = useRouter();

  const checkAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    const checkInISO = checkInDate.toISOString();
    const checkOutISO = checkOutDate.toISOString();

    try {
      const response = await fetch(
        `/api/checkAvailability?checkIn=${checkInISO}&checkOut=${checkOutISO}`
      );
      const data = await response.json();

      // Update rooms with available rooms and prices fetched from the API
      const updatedRooms = rooms.map((room) => {
        const availableRoom = data.find((r) => r.type === room.title);
        return {
          ...room,
          availableRooms: availableRoom ? availableRoom.availableRooms : 0,
          price: availableRoom ? availableRoom.price : 0, // Price fetched from the database
        };
      });
      setRooms(updatedRooms); // Update the state with availability and pricing data
    } catch (error) {
      console.error("Error fetching room availability:", error);
    }
  };

  const handleBookNow = async (room) => {
    // Ensure check-in and check-out dates are selected
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates first.");
      return;
    }

    // Ensure there are available rooms
    if (room.availableRooms === 0) {
      alert("No rooms available for this room type.");
      return;
    }

    // Adjust the dates to handle time zone issues
    const adjustedCheckInDate = new Date(checkInDate);
    const adjustedCheckOutDate = new Date(checkOutDate);

    // Set both check-in and check-out times to midday to avoid time zone issues
    adjustedCheckInDate.setHours(12, 0, 0, 0);
    adjustedCheckOutDate.setHours(12, 0, 0, 0);

    // Check if user is logged in
    const session = await getSession();
    if (!session) {
      alert("Please log in to continue.");
      return;
    }

    // Redirect to the booking page with room type and user details
    router.push(
      `/reservation/booking?roomType=${room.title}&roomId=${room.id}&checkInDate=${adjustedCheckInDate.toISOString()}&checkOutDate=${adjustedCheckOutDate.toISOString()}`
    );
  };

  const nextRoom = () => {
    if (currentIndex < rooms.length - 3) {
      setCurrentIndex(currentIndex + 3); // Show next 3 cards
    }
  };

  const prevRoom = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3); // Show previous 3 cards
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
            minDate={new Date()}
          />
        </div>

        <div className={styles.datePickerWrapper}>
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            placeholderText="Check out"
            className={styles.dateInput}
            minDate={checkInDate || new Date()}
          />
        </div>

        <button className={styles.checkAvailabilityButton} onClick={checkAvailability}>
          Check Availability
        </button>
      </div>

      {/* Message for check-in and check-out dates */}
      {!checkInDate || !checkOutDate ? (
        <div className={styles.noDatesMessage}>
          <p>Please enter check-in and check-out dates to see available rooms and prices.</p>
        </div>
      ) : null}

      {/* Room Cards */}
      <div className={roomStyles.carousel}>
        <button className={roomStyles.prevButton} onClick={prevRoom} disabled={currentIndex === 0}>
          &#10094; {/* Left arrow */}
        </button>
        <div className={roomStyles.roomsSection}>
          {rooms.slice(currentIndex, currentIndex + 3).map((room, index) => (
            <div key={index} className={roomStyles.roomCard}>
              <Image src={room.img} alt={room.title} width={400} height={300} />
              <div className={roomStyles.roomDetails}>
                <h2 className={roomStyles.roomTitle}>{room.title}</h2>
                <div className={roomStyles.roomFeatures}>
                  {room.features.map((feature, idx) => (
                    <p key={idx}>{feature}</p>
                  ))}
                </div>
                <div className={roomStyles.availableRooms}>
                  {room.availableRooms ? (
                    <p>{room.availableRooms} rooms available</p>
                  ) : (
                    <p className={roomStyles.noRooms}>No rooms available</p>
                  )}
                  {room.price && <p>Price: Rs. {room.price.toLocaleString()}</p>} {/* Display price in Rs */}
                </div>
                <button
                  className={roomStyles.bookButton}
                  onClick={() => handleBookNow(room)}
                  disabled={room.availableRooms === 0 || !checkInDate || !checkOutDate}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className={roomStyles.nextButton} onClick={nextRoom} disabled={currentIndex >= rooms.length - 3}>
          &#10095; {/* Right arrow */}
        </button>
      </div>

      <Facilities />
    </div>
  );
};

export default Reservations;
