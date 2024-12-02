"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "./styles.css";

const BookingPage = () => {
  const [user, setUser] = useState(null); // Holds logged-in user details
  const [rooms, setRooms] = useState(1); // Number of rooms selected by user
  const [roomPrice, setRoomPrice] = useState(0); // Price per room
  const searchParams = useSearchParams();
  const router = useRouter();
  const roomType = searchParams.get("roomType"); // Fallback for roomType

  useEffect(() => {
    console.log("Fetching user and room price...");

    const fetchUser = async () => {
      try {
        const response = await fetch("/api/session");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchRoomPrice = async () => {
      try {
        const response = await fetch(`/api/roomPrice?roomType=${roomType}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Room price fetched:", data);
          setRoomPrice(data.price || 0);
        } else {
          console.error("Failed to fetch room price for:", roomType);
        }
      } catch (error) {
        console.error("Error fetching room price:", error);
      }
    };

    fetchUser();
    fetchRoomPrice();
  }, [roomType]);

  const roomId = searchParams.get("roomId");

  const handleGoToPayment = () => {
    const checkInDate = searchParams.get("checkInDate"); // Retrieve check-in date
    const checkOutDate = searchParams.get("checkOutDate"); // Retrieve check-out date
    const totalAmount = roomPrice * rooms; // Calculate total amount
  
    // Redirect to the payment page with all required details
    router.push(
      `/reservation/payment?roomType=${roomType}&roomId=${roomId}&rooms=${rooms}&totalAmount=${totalAmount}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
    );
  };
  
  

  return (
    <div className="booking-container">
      <h2>Booking Details</h2>
      {user ? (
        <>
          {/* Display user details */}
          <div className="user-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>

          {/* Booking form */}
          <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="rooms">Number of Rooms:</label>
            <div className="room-selection-container">
              <button
                type="button"
                onClick={() => setRooms((prev) => Math.max(1, prev - 1))}
              >
                −
              </button>
              <span>{rooms}</span>
              <button type="button" onClick={() => setRooms((prev) => prev + 1)}>
                +
              </button>
            </div>
            <div className="total-amount">
              <p>
                <strong>Total Amount:</strong> Rs. {(roomPrice * rooms).toLocaleString()}
              </p>
            </div>
            <button
              type="button"
              className="submit-btn"
              onClick={handleGoToPayment}
            >
              Go to Payment
            </button>
          </form>
        </>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default BookingPage;

