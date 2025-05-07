import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      localStorage.setItem("token", res.data.token);
      console.log(res.data.token);
      setToken(res.data.token);
      setMessage("Login successful!");
    } catch (err) {
      setMessage("Login failed");
    }
  };

  const getProtected = async () => {
    try {
      const res = await axios.get(`${API_URL}/protected`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Access denied");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setMessage("Logged out");
  };

  return (
    <div style={{ padding: 20 }}>
      {!token ? (
        <>
          <h2>Login</h2>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <h2>Welcome</h2>
          <button onClick={getProtected}>Get Protected Data</button>
          <button onClick={logout}>Logout</button>
        </>
      )}
      <p>{message}</p>
    </div>
  );
}

export default App;
