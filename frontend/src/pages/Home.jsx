import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRides } from "../services/rideService";
import { createBooking } from "../services/bookingService";
import "../assets/styles.css"; // make sure styles are imported
import { useLocation } from "react-router-dom";
export default function Home() {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const fetchRides = async () => {
      try {
        const data = await getRides();
        const params = new URLSearchParams(location.search);
        const search = params.get("search") || "";

        // 🔎 Filter rides by origin or destination
        const filtered = data.filter(
          (ride) =>
            ride.origin.toLowerCase().includes(search.toLowerCase()) ||
            ride.destination.toLowerCase().includes(search.toLowerCase())
        );

      console.log("Fetched rides:", filtered);
      setRides(filtered);
      } catch (err) {
        console.error("Error fetching rides:", err);
      }
    };
    fetchRides();
  }, [location.search]);
const handleBookNow = async (rideId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first!");
      return;
    }
    console.log("Booking ride with:", {  rideId, seats:1 });

    const res = await createBooking({rideId, seats: 1 });
    console.log("Booking response:", res);

    navigate("/bookings");
  } catch (err) {
    console.error("Error booking ride:", err.response?.data || err.message);
  }
};


  return (
    <div className="rides-container">
      <h2>Available Rides</h2>
      <div className="rides-grid">
        {rides.map((ride) => (
          <div key={ride._id} className="ride-card">
            <img
              src={ride.image ? `/images/${ride.image}` : "/images/car-placeholder.jpg"}
              alt="Car"
              className="ride-image"
            />
            <h3>{ride.origin} → {ride.destination}</h3>
            <p><strong>Seats:</strong> {ride.seatsAvailable}</p>
            <p><strong>Price:</strong> ₹{ride.price}</p>
            <button
              className="book-btn"
              onClick={() => handleBookNow(ride._id)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
