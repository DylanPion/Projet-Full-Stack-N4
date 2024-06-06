import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { CreateAccount } from "../services/UserServices";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

const Signup = () => {
  const navigate = useNavigate();

  const [enteredValues, setEnteredValues] = useState({
    login: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [didEdit, setDidEdit] = useState({
    login: false,
    password: false,
    firstName: false,
    lastName: false,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;

  const emailIsInvalid = didEdit.login && !emailRegex.test(enteredValues.login);
  const passwordIsInvalid =
    didEdit.password && enteredValues.password.trim().length < 10;
  const firstNameIsInvalid =
    didEdit.firstName && !nameRegex.test(enteredValues.firstName);
  const lastNameIsInvalid =
    didEdit.lastName && !nameRegex.test(enteredValues.lastName);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      emailIsInvalid ||
      passwordIsInvalid ||
      firstNameIsInvalid ||
      lastNameIsInvalid
    ) {
      console.log(emailIsInvalid);
      console.error("Validation errors");
      return;
    }
    try {
      const response = await CreateAccount(enteredValues);
      console.log("Compte créé avec succès");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      console.error("Erreur lors de la création du compte :", error);
    }
  };

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  useEffect(() => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-refreshToken");
    localStorage.removeItem("user-email");
  }, []);

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
          <Input
            label="Email"
            id="email"
            icon="bx bx-at"
            type="email"
            placeholder="Entrer votre email"
            name="email"
            onBlur={() => handleInputBlur("email")}
            onChange={(event) => handleInputChange("login", event.target.value)}
            value={enteredValues.login}
            error={
              emailIsInvalid && "Veuillez entrer une adresse email valide !"
            }
          />
          <Input
            label="Mot de passe"
            id="password"
            icon="bx bx-lock-alt"
            type="password"
            placeholder="Entrer votre mot de passe"
            name="password"
            onBlur={() => handleInputBlur("password")}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            value={enteredValues.password}
            error={
              passwordIsInvalid &&
              "Veuillez entrer un mot de passe avec dix caractères minimum !"
            }
          />
          <Input
            label="Prénom"
            id="firstName"
            icon="bx bx-user"
            type="text"
            placeholder="Entrer votre prénom"
            name="firstName"
            onBlur={() => handleInputBlur("firstName")}
            onChange={(event) =>
              handleInputChange("firstName", event.target.value)
            }
            value={enteredValues.firstName}
            error={
              firstNameIsInvalid &&
              "Veuillez entrer un prénom contenant que des lettres !"
            }
          />
          <Input
            label="Nom"
            id="lastName"
            icon="bx bx-user"
            type="text"
            placeholder="Entrer votre nom"
            name="lastName"
            onBlur={() => handleInputBlur("lastName")}
            onChange={(event) =>
              handleInputChange("lastName", event.target.value)
            }
            value={enteredValues.lastName}
            error={
              lastNameIsInvalid &&
              "Veuillez entrer un nom contenant que des lettres !"
            }
          />
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
