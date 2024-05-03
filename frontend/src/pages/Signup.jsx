import React from "react";
import logo from "../assets/logo.png";
import { CreateAccount } from "../services/UserServices";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      const response = await CreateAccount(data);
      console.log("Compte crée avec succès");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      console.error("Erreur lors de la création du compte :", error);
    }
  };

  return (
    <div className="login-page">
      <div className="logo">
        <img src={logo} />
        <a href="#">Next-U</a>
        <span>Drive</span>
      </div>

      <div className="login-container">
        <h1>Create your new account 👏</h1>
        <div className="social-login">
          <button className="google">
            <i className="bx bxl-google"></i>
            Use Google
          </button>
          <button className="google">
            <i className="bx bxl-apple"></i>
            Use Apple
          </button>
        </div>
        <div className="divider">
          <div className="line"></div>
          <p>Or</p>
          <div className="line"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <div className="custome-input">
            <input
              type="email"
              name="login"
              placeholder="Your Email"
              autoComplete="off"
            />
            <i className="bx bx-at"></i>
          </div>
          <label htmlFor="password">Password:</label>
          <div className="custome-input">
            <input
              type="password"
              name="password"
              placeholder="Your Password"
            />
            <i className="bx bx-lock-alt"></i>
          </div>
          <label htmlFor="firstName">First Name:</label>
          <div className="custome-input">
            <input type="text" name="firstName" placeholder="Your First Name" />
            <i className="bx bx-user"></i>
          </div>
          <label htmlFor="LastName">Last Name:</label>
          <div className="custome-input">
            <input type="text" name="lastName" placeholder="Your Last Name" />
            <i className="bx bx-user"></i>
          </div>
          <button className="login">Register</button>
          <div className="links">
            <a href="#">Reset Password</a>
            <a href="/login">Connect to your account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
