'use client';

import { useState } from "react";
import './myAccount.css';

const MyAccount = ({ bookings, userName, userEmail }) => {
  const [bookingList, setBookingList] = useState(bookings);

  // Function to handle booking cancellation
  const cancelBooking = async (bookingId) => {
    try {
      console.log(`Canceling booking with ID: ${bookingId} for user: ${userEmail}`);

      // Send DELETE request to cancel booking, passing user email
      const response = await fetch(`/api/cancelBooking?bookingId=${bookingId}&userEmail=${userEmail}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel booking');
      }

      // Update the local state to remove the canceled booking
      setBookingList((prev) => prev.filter((booking) => booking.id !== bookingId));

      alert('Booking cancelled successfully. A confirmation email has been sent to your registered email address.');
    } catch (error) {
      console.error('Error canceling booking:', error.message);
      alert(`Failed to cancel booking: ${error.message}`);
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
                      onClick={() => cancelBooking(booking.id)}
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
