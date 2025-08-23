import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css"; // make sure your global styles are imported
import { login, register } from "../services/authService";



export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(username, password);
        alert("Registration successful! Now login.");
        setIsRegister(false);
      } else {
        await login(username, password);
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  
  return (
    <div className="login-container">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <p onClick={() => setIsRegister(!isRegister)} style={{cursor:"pointer", color:"blue"}}>
        {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
      </p>
    </div>
  );
}
