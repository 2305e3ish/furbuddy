import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        data
      );
      // Save user email to localStorage and sessionStorage for profile page
      localStorage.setItem('userEmail', data.email);
      sessionStorage.setItem('userEmail', data.email);
      alert(response.data);
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("Server is not reachable. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
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
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>

      <p className={styles.authFooter}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}