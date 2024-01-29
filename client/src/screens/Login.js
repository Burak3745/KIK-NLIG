import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Login as myLogin } from "../axios/index.js";
import toast from "react-hot-toast";
import "../css/Signin.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function setUsernameHandler(evt) {
    setUsername(evt.target.value);
  }

  function setPasswordHandler(evt) {
    setPassword(evt.target.value);
  }

  const doLogin = (e) => {
    e.preventDefault();
    myLogin({ email: username, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const signUpHandler = (e) => {
    e.preventDefault();
    navigate("/signup");
  };
  const forgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgotPassword");
  }
  if (localStorage.getItem("user")) {
    return <Navigate to="/browse" />
  }
  else {
    return (
      <div className="signin-body">
        <Container className="signIn">
          <form className="signIn-form" onSubmit={doLogin}>
            <h2 className="signIn-header">Giriş Yap</h2>

            <input
              type="email"
              placeholder="E-mail adresinizi girin"
              onChange={setUsernameHandler}
              value={username}
              required
            />
            <input
              type="password"
              placeholder="Şifrenizi girin"
              onChange={setPasswordHandler}
              value={password}
              required
            />
            <button type="submit">Giriş Yap</button>
            <div className="form-help">
              <div className="remember-me">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Beni Hatırla</label>
                <div onClick={forgotPassword} style={{marginLeft:"50px", cursor:"pointer"}}>Şifremi Unuttum</div>
              </div>
            </div>
            <h4>
              ReelQourum'da yeni misin?{" "}
              <a href="" onClick={signUpHandler}>
                Şimdi Kayıt Ol
              </a>
            </h4>
          </form>
        </Container>
      </div>
    );
  };
}
export default Login;
