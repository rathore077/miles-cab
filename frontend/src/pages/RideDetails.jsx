import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRideById } from "../services/rideService";
import { createBooking } from "../services/bookingService";

export default function RideDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [userName, setUserName] = useState("");
  const [seats, setSeats] = useState(1);

  useEffect(() => {
    getRideById(id).then(setRide).catch(console.error);
  }, [id]);

  const handleBooking = async () => {
    try {
      await createBooking({ rideId: id, userName, seats });
      alert("Booking successful!");
      navigate("/bookings");
    } catch (err) {
      alert("Booking failed: " + err.message);
    }
  };

  if (!ride) return <p>Loading...</p>;

  return (
    <div>
      <h2>{ride.source} → {ride.destination}</h2>
      <p>Seats Available: {ride.seatsAvailable}</p>
      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="number"
        min="1"
        max={ride.seatsAvailable}
        value={seats}
        onChange={(e) => setSeats(Number(e.target.value))}
      />
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}
