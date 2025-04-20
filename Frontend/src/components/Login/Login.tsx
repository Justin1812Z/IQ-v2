import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useAuth } from "../../AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { checkSession } = useAuth();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Prevent default form submission

  try {
    const response = await axios.post("http://localhost:5000/login", {
      username,
      password,
    });

    console.log("Login successful:", response.data);

    await checkSession(); // Check session after login
    const userId = response.data.userId; 
    navigate(`/profile/${userId}`);

    // Redirect or handle successful login
  } catch (err: any) {
    if (err.response && err.response.data) {
      setError(err.response.data.message || "Login failed");
    } else {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    }
  }
};



  return (
    <div className="home">
    <h1>Please sign in!</h1>
    {error && <p className="error">{error}</p>}
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  </div>
  );
}

export default Login;
