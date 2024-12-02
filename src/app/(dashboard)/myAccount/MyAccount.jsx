'use client';

import { useState } from "react";
import './myAccount.css';

const MyAccount = ({ bookings, userName }) => {
  const [bookingList, setBookingList] = useState(bookings);

  // Function to handle booking cancellation
  const cancelBooking = async (bookingId) => {
    try {
      console.log('Canceling booking with ID:', bookingId);
  
      // Send DELETE request to cancel booking
      const response = await fetch(`/api/cancelBooking?bookingId=${bookingId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }
  
      // Update the local state to remove the canceled booking
      setBookingList((prev) => prev.filter((booking) => booking.id !== bookingId));
      alert('Booking cancelled successfully');
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert('Failed to cancel booking');
    }
  };

  return (
    <div className="my-account-container">
      <h1 className="my-account-header">Your Account</h1>
      <h2 className="my-account-header">Welcome back, {userName}</h2>
      <h3 className="my-account-subheader">Your Bookings:</h3>
      <div className="booking-list">
        {bookingList.length > 0 ? (
          <table className="booking-table">
            <thead>
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-700">Room Type</th>
                <th className="p-4 text-sm font-semibold text-gray-700">Rooms Booked</th>
                <th className="p-4 text-sm font-semibold text-gray-700">Check-in Date</th>
                <th className="p-4 text-sm font-semibold text-gray-700">Check-out Date</th>
                <th className="p-4 text-sm font-semibold text-gray-700">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {bookingList.map((booking) => (
                <tr key={booking.id}>
                  <td className="p-4">{booking.roomType?.name || 'No Room Type'}</td>
                  <td className="p-4">{booking.numberOfRooms || '0'}</td>
                  <td className="p-4">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td className="p-4">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td className="p-4 cancel-btn">
                    <button
                      className="cancel-btn"
                      onClick={() => {
                        console.log('Cancel button clicked for booking ID:', booking.id);
                        cancelBooking(booking.id);
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-bookings-message">You have no bookings at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
