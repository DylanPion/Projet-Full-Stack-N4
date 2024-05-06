import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Authenticate } from "../services/UserServices";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      const response = await Authenticate(data);
      localStorage.clear();
      localStorage.setItem("user-token", response.data.token);
      localStorage.setItem("user-refreshToken", response.data.refreshToken);
      localStorage.setItem("user-email", response.data.email);
      console.log("Connexion réusite avec succès");
      setTimeout(() => {
        navigate("/dashboard/drive");
      }, 500);
    } catch (error) {
      console.error("Erreur lors de la connexion :" + error);
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
        <h1>Login to your account 👏</h1>
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
          <button className="login">Login</button>
          <div className="links">
            <a href="#">Reset Password</a>
            <a href="/signup">Don't have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
