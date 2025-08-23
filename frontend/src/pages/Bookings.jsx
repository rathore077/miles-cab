import { useEffect, useState } from "react";
import { getBookings, cancelBooking } from "../services/bookingService";
import "../assets/styles.css"; // global styles

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const data = await getBookings(userId);
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p className="loading">Loading bookings...</p>;

  return (
    <div className="container">
      <h2 className="page-title">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <h3 className="booking-ride">
                🚖 {booking.ride?.origin} → {booking.ride?.destination}
              </h3>
              <p className="booking-date">
                <strong>Date:</strong>{" "}
                {booking.date
                  ? new Date(booking.date).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="booking-seats">
                <strong>Seats:</strong> {booking.seats}
              </p>
              <p className="booking-price">
                <strong>Price:</strong> ₹{booking.ride?.price}
              </p>

              <button
                className="cancel-btn"
                onClick={() => handleCancel(booking._id)}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
