import React from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { createContext } from "react";
import { PasswordUpdate, Login as myLogin } from "../axios/index.js";
import toast from "react-hot-toast";
import "../css/Signin.css";
import { ProfileUpdate } from '../axios';
const ResetPassword = ({ email, setEmail, otp, setOTP }) => {
    const navigate = useNavigate();
    function setUsernameHandler(evt) {
        setEmail(evt.target.value);
    }
    const [formData, setFormData] = useState({
        email: email,
        password: "",
        samePassword: "",
    });
    
    function changePassword(e) {
        e.preventDefault();
        PasswordUpdate(formData)
        .then((res) => {
            toast.success("Şifreniz değiştirilmiştir, giriş yapabilirsiniz")
            navigate("/login")
        })
        .catch((err) => {
            toast.error(err.response.data.message);
        });
    }
    if (localStorage.getItem("user")) {
        return <Navigate to="/" />
    }
    else if (email === '') {
        return <Navigate to="/forgotPassword" />
    }
    else {
        return (
            <div className="signin-body">
                <Container className="signIn">
                    <form className="signIn-form">
                        <h2 className="signIn-header">Şifreyi Değiştir</h2>

                        <input
                            type="password"
                            placeholder="Yeni şifrenizi girin"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Tekrar şifrenizi girin"
                            onChange={(e) => setFormData({ ...formData, samePassword: e.target.value })}
                            required
                        />
                        <button onClick={changePassword} type="submit">Şifreyi Değiştir</button>
                    </form>
                </Container>
            </div>
        );
    };
}
export default ResetPassword;
