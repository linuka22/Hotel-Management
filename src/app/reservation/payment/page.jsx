// src/app/reservation/payment/page.jsx
"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "./styles.css";

const PaymentPage = () => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomId = searchParams.get("roomId");
  const rooms = searchParams.get("rooms");
  const totalAmount = searchParams.get("totalAmount");
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");

  const handlePayment = async () => {
    // Input validation
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Card number must be 16 digits.");
      return;
    }
    if (!/^\d{3}$/.test(cvv)) {
      alert("CVV must be 3 digits.");
      return;
    }
    if (!/^\d{5,6}$/.test(postalCode)) {
      alert("Postal code must be 5-6 digits.");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      alert("Expiry date must be in MM/YY format.");
      return;
    }
  
    try {
      // Fetch the user session (including email)
      const sessionResponse = await fetch("/api/session");
      if (!sessionResponse.ok) {
        throw new Error("Unable to fetch user session. Please log in again.");
      }
      const sessionData = await sessionResponse.json();
      const userId = sessionData.user.id;
      const userEmail = sessionData.user.email; // Fetch user's email
  
      console.log("User ID from session:", userId);
      console.log("User email from session:", userEmail);
  
      // Ensure required search parameters are present
      if (!roomId || !rooms || !totalAmount || !checkInDate || !checkOutDate) {
        alert("Missing required fields.");
        console.error("Missing fields:", { roomId, rooms, totalAmount, checkInDate, checkOutDate });
        return;
      }
  
      // Create the booking
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: roomId,
          userId: userId,
          numberOfRooms: parseInt(rooms),
          checkInDate: new Date(checkInDate),
          checkOutDate: new Date(checkOutDate),
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Booking created:", data);
  
        // Send confirmation email to the user using the updated API route
        await fetch("/api/sendConfirmationEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: userEmail, // Send the logged-in user's email
            bookingDetails: {
              roomType: roomId,  // Replace with actual room type if needed
              roomsBooked: rooms,
              checkInDate: checkInDate,
              checkOutDate: checkOutDate,
              totalAmount: totalAmount,
            },
          }),
        });
  
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/myAccount");
        }, 2000);
      } else {
        const errorText = await response.text();
        let errorMessage = "An error occurred";
  
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || "Unknown error";
        } catch (e) {
          console.error("Failed to parse error response:", errorText);
        }
  
        console.error("Booking failed:", errorMessage);
        alert(`Booking failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert(`Booking failed: ${error.message}`);
    }
  };
  
  

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>

      <div className="payment-details">
        <p>
          <strong>Total Amount: </strong> Rs. {totalAmount}
        </p>
      </div>

      {isSuccess && (
        <div className="success-message">
          <p>Booking Successful!</p>
        </div>
      )}

      <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="cardName">Name on Card:</label>
        <input
          type="text"
          id="cardName"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
        />

        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          maxLength="16"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />

        <label htmlFor="expiryDate">Expiry Date (MM/YY):</label>
        <input
          type="text"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="MM/YY"
          required
        />

        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          maxLength="3"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />

        <label htmlFor="postalCode">Postal Code:</label>
        <input
          type="text"
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />

        <button type="button" className="submit-btn" onClick={handlePayment}>
          Complete Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
