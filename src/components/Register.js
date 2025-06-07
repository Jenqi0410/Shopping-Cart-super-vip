import React, { useState } from "react";
import axios from "axios";

export default function Register({ onSwitchToLogin }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/auth/register", {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        address: form.address,
        phone: form.phone,
      });
      alert("Register successful!");
      onSwitchToLogin(); 
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <form
        onSubmit={handleRegister}
        className="bg-white p-4 rounded shadow"
        style={{ width: 400 }}
      >
        <h3 className="text-center text-primary mb-3">Register</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-2">
          <label>Full Name</label>
          <input
            name="fullName"
            className="form-control"
            required
            value={form.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            className="form-control"
            required
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label>Address</label>
          <input
            name="address"
            className="form-control"
            required
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            name="phone"
            className="form-control"
            required
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={onSwitchToLogin}
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}
