import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RideDetails from "./pages/RideDetails";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", padding: "1rem" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/rides/:id" element={<RideDetails />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
