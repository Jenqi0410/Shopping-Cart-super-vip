import React, { useState } from "react";
import axios from "axios";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        username,
        password,
      });
      localStorage.setItem("access_token", res.data.accessToken);
      if (onLogin) onLogin();
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  if (showRegister) {
    return <Register onSwitchToLogin={() => setShowRegister(false)} />;
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <form
        className="bg-white p-4 rounded shadow"
        style={{ width: 400 }}
        onSubmit={handleLogin}
      >
        <h3 className="text-center text-primary mb-3">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email..."
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password..."
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label className="form-check-label">Show Password</label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => setShowRegister(true)}
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
}