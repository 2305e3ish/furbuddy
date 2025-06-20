import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css"; // Shared CSS for both forms

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        data
      );
      setPopupMsg(response.data);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/login");
      }, 1800);
    } catch (error) {
      if (error.response && error.response.data) {
        setPopupMsg(error.response.data);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1800);
      } else {
        setPopupMsg("An unexpected error occurred. Please try again.");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1800);
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
        {/* Name */}
        <div className={styles.formGroup}>
          <label>Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        {/* Phone */}
        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number (10 digits)",
              },
            })}
          />
          {errors.phone && (
            <span className={styles.error}>{errors.phone.message}</span>
          )}
        </div>

        {/* Address */}
        <div className={styles.formGroup}>
          <label>Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <span className={styles.error}>{errors.address.message}</span>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>

      {showPopup && (
        <div className="adopt-popup-overlay">
          <div className="adopt-popup">
            <span role="img" aria-label="success" style={{ fontSize: "2em" }}>
              🎉
            </span>
            <div className="adopt-popup-msg">{popupMsg}</div>
          </div>
        </div>
      )}

      <p className={styles.authFooter}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}