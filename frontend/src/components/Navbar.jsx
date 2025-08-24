import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";
import "../assets/styles.css";
export default function Navbar() {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/?search=${query}`); // redirect to rides page with query
    }
  };
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="/images/logo.png" alt="miles"/>
       </div>
       
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by origin or destination..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>


      <ul className="nav-links">
      <li><Link to="/" >Home</Link></li>
      <li><Link to="/bookings" >My Bookings</Link></li>
     </ul>
     <div className="navbar-auth">
      <Link to="/login" className="btn-login">Login</Link>
      <Link to="/register" className="btn-register" >Register</Link>
     </div>
    </nav>
  );
}
