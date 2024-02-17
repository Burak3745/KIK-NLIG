import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Signup as mySignup } from "../axios/index.js";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import "../css/Signup.css";
import { Container } from "react-bootstrap";
import { signupAction } from "../action/userAction.js";
import { useDispatch } from "react-redux";

const Signup = ({ setUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordAgain: "",
  });
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (
      formData.password.length >= 6 &&
      formData.fullname.length >= 5 &&
      formData.phoneNumber.length >= 10 &&
      formData.email.length >= 3 &&
      formData.password === formData.passwordAgain
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData]);
  const signInHandler = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  if (localStorage.getItem("user")) {
    return <Navigate to="/" />
  }
  else {
    return (
      <div className="signup-body">
        <Container className="signUp">
          <form className="signUp-form"
            onSubmit={ async (e) => {
              e.preventDefault();
              dispatch(signupAction(formData, navigate, setUser))
            }}
          >
            <h2 className="signIn-header">Kayıt Ol</h2>
            <input
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              type="username"
              name="fullname"
              placeholder="İsim soyisim girin"
            />

            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              name="email"
              placeholder="E-mail adresinizi girin"
            />

            <input
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              type="number"
              name="phoneNumber"
              placeholder="Telefon numaranızı giriniz"
            />
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              name="password"
              placeholder="Şifrenizi girin"
            />
            <input
              onChange={(e) =>
                setFormData({ ...formData, passwordAgain: e.target.value })
              }
              type="password"
              name="passwordAgain"
              placeholder="Şifrenizi tekrar girin"
            />

            <button
              disabled={disabled}
              type="submit"
            >
              Kaydol
            </button>
            <h4 style={{ color: "gray" }}>
              Zaten Hesabın Var mı? {" "}
              <a href="" className="kayıtol" onClick={signInHandler}>Giriş Yap</a>
            </h4>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <p
              style={{
                color: "#2dffb9",
                display: formData.password.length >= 6 && "none",
              }}
            >
              * Şifre en az 6 karakter olmalı.
            </p>
            <p
              style={{
                color: "#2dffb9",
                display: formData.password === formData.passwordAgain && "none",
              }}
            >
              * Şifre ve tekrar girilen şifre aynı olmalı.
            </p>
            <p
              style={{
                color: "#2dffb9",
                display: formData.email.length >= 3 && "none",
              }}
            >
              * E-mail adresi en az 3 karakter olmalı.
            </p>
          </div>
        </Container>
      </div>
    );
  };
}

export default Signup;
