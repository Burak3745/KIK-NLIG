import React from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { createContext } from "react";
import { Login as myLogin } from "../axios/index.js";
import toast from "react-hot-toast";
import "../css/Signin.css";

const ForgotPassword = ({ email, setEmail, otp, setOTP }) => {
    const navigate = useNavigate();
    function setUsernameHandler(evt) {
        setEmail(evt.target.value);
    }
    const signInHandler = (e) => {
        e.preventDefault();
        navigate("/login");
    };

    function nagigateToOtp(e) {
        e.preventDefault();
        if (email) {
            const OTP = Math.floor(Math.random() * 9000 + 1000);
            setOTP(OTP);

            axios
                .post("https://kiknlig.onrender.com/send_recovery_email", {
                    OTP: OTP,
                    recipient_email: email,
                })
                .then(() => {
                    toast.success("Kod E-mail adresinize gönderilmiştir")
                    navigate("/code");
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
            return;
        }
        return toast.error("Lütfen Bir E-Mail Giriniz")
    }

    if (localStorage.getItem("user")) {
        return <Navigate to="/browse" />
    }
    else {
        return (
            <div className="signin-body">
                <Container className="signIn">
                    <form className="signIn-form">
                        <h2 className="signIn-header">Şifremi Unuttum</h2>
                        <input
                            type="email"
                            placeholder="E-mail adresinizi girin"
                            onChange={setUsernameHandler}
                            value={email}
                            required
                        />
                        <button onClick={nagigateToOtp} type="submit">Mail Gönder</button>
                        <div className="şifremi-unuttum" onClick={signInHandler} style={{ cursor: "pointer" }}>Önceki Sayfaya Geri Dön</div>
                    </form>
                </Container>
            </div>
        );
    };
}
export default ForgotPassword;
