import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "../css/Signin.css";
import toast from "react-hot-toast";
const OTPInput = ({ email, setEmail, otp, setOTP }) => {
    const navigate = useNavigate();
    const [timerCount, setTimer] = React.useState(60);
    const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
    const [disable, setDisable] = useState(true);

    function resendOTP() {
        if (disable) return;
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        setOTP(OTP);
        axios
            .post("https://kiknlig.onrender.com/send_recovery_email", {
                OTP: OTP,
                recipient_email: email,
            })
            .then(() => setDisable(true))
            .then(() => toast.success("Yeni kod E-mail adresinize gönderilmiştir"))
            .then(() => setTimer(60))
            .catch(console.log);
    }

    function verfiyOTP(e) {
        e.preventDefault();
        if (parseInt(OTPinput.join("")) === otp) {
            setOTP('')
            navigate('/reset');
            return;
        }
        
        return toast.error("Girilen kod doğru değil lütfen tekrar deneyiniz veya yeniden kod gönderiniz");;
    }

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval);
                if (lastTimerCount <= 1) setDisable(false);
                if (lastTimerCount <= 0) return lastTimerCount;
                return lastTimerCount - 1;
            });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval);
    }, [disable]);


    if (localStorage.getItem("user")) {
        return <Navigate to="/" />
    }
    else if (otp === '') {
        return <Navigate to="/forgotPassword" />
      }
    else {
        return (
            <div className="signin-body">
                <Container className="signIn">
                    <form className="signIn-form">
                        <h2 className="signIn-header">Kodu Giriniz</h2>
                        <div style={{ height: "60px", marginBottom: "30px" }}>
                            <input
                                maxLength="1"
                                type="text"
                                onChange={(e) =>
                                    setOTPinput([
                                        e.target.value,
                                        OTPinput[1],
                                        OTPinput[2],
                                        OTPinput[3],
                                    ])
                                }
                                required
                                style={{ width: '15%', height: '100%', textAlign: "center", marginRight: "10px", borderRadius: "7px" }}
                            />
                            <input
                                maxLength="1"
                                type="text"
                                onChange={(e) =>
                                    setOTPinput([
                                        OTPinput[0],
                                        e.target.value,
                                        OTPinput[2],
                                        OTPinput[3],
                                    ])
                                }
                                required
                                style={{ width: '15%', height: '100%', textAlign: "center", marginRight: "10px", borderRadius: "7px" }}
                            />
                            <input
                                maxLength="1"
                                type="text"
                                onChange={(e) =>
                                    setOTPinput([
                                        OTPinput[0],
                                        OTPinput[1],
                                        e.target.value,
                                        OTPinput[3],
                                    ])
                                }
                                required
                                style={{ width: '15%', height: '100%', textAlign: "center", marginRight: "10px", borderRadius: "7px" }}
                            />
                            <input
                                maxLength="1"
                                type="text"
                                onChange={(e) =>
                                    setOTPinput([
                                        OTPinput[0],
                                        OTPinput[1],
                                        OTPinput[2],
                                        e.target.value,
                                    ])
                                }
                                required
                                style={{ width: '15%', height: '100%', textAlign: "center", marginRight: "10px", borderRadius: "7px" }}
                            />
                        </div>
                        <button onClick={verfiyOTP}>Kod Kontrol Et</button>
                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                            <p style={{color:"white"}}>Kod Gönderilmedi mi?</p>{" "}
                            <a
                                className= "flex flex-row items-center"
                                
                                style={{
                                    color: disable ? "gray" : "#2dffb9",
                                    cursor: disable ? "default" : "pointer",
                                }}
                                onClick={() => resendOTP()}
                            >
                                {disable ? `Yeni Kod Göndermeye ${timerCount}s` : "Yeni Kod Gönder"}
                            </a>
                        </div>
                    </form>
                </Container>
            </div>
        );
    };
}
export default OTPInput;

/*

  

  */