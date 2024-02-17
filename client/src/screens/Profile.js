import React, { useEffect, useState } from 'react';
import {
    Col,
    Button,
    Row,
    Container,
    Card,
    Form,
} from "react-bootstrap";
import { Navigate } from "react-router-dom";
import '../css/AddMovie.css'
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import PassEye from '../components/PassEye'
import { ProfileGet, ProfileUpdate } from '../axios';
import ReactFileBase64 from 'react-file-base64'
const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

const Profile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [user, setUser]);
    const [disabled, setDisabled] = useState(true);
    const [vana, setVana] = useState(false);
    const [formData, setFormData] = useState({
        fullname: user?.user.fullname,
        email: user?.user.email,
        phoneNumber: user?.user.phoneNumber,
        image: user?.user.image,
        password: "",
        newPassword: "",
    });
    const [newpassControl, setNewpassControl] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [newPasswordType, setNewPasswordType] = useState("password");

    useEffect(() => {
        if (
            formData.password.length >= 1 &&
            formData.fullname.length >= 5 &&
            formData.phoneNumber.length >= 10 &&
            formData.email.length >= 3 &&
            formData.image.length >= 2 &&
            (!newpassControl || formData.newPassword.length >= 6)
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formData, newpassControl]);

    const togglePasswordType = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };
    const toggleNewPasswordType = () => {
        if (newPasswordType === "password") {
            setNewPasswordType("text");
            return;
        }
        setNewPasswordType("password");
    };

    const toggleVana = () => {
        setVana(!vana);
        setNewpassControl(false);
        setFormData({ ...formData, password: "", newPassword: "" });
    }

    const MAX_IMAGE_WIDTH = 50;
    const MAX_IMAGE_HEIGHT = 50;
    const handleFileSelect = (file) => {
        const img = new Image();
        img.src = file.base64;

        img.onload = function () {
            if (img.width === MAX_IMAGE_WIDTH && img.height === MAX_IMAGE_HEIGHT) {
                setFormData({ ...formData, image: file.base64 })

                // Alternatif olarak, istediğiniz başka bir işlemi de gerçekleştirebilirsiniz.
            } else {
                toast.error("Resmin Boyutu 50 pixel'e 50 pixel olmalı");
            }
        };
    };
    const [click, setClick] = useState('Üyelik')
    const isActiveHakkinda = click == "Üyelik"
    const isActiveBolumler = click == "E-Mail"
    if (!user) {
        return <Navigate to="/login" />;
    }
    return (
        <motion.div
            className="py-3"
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
        >
            <Container>
                <Row className="vh-50 d-flex justify-content-center align-items-center">
                    <Col md={10} lg={8} xs={12} >

                        <Card className="shadow" style={{ background: "#06001d" }}>
                            <Card.Body>
                                <div className="mb-1 mt-4">
                                    <Row>
                                        <Col>
                                            <h2 className="fw-bold text-uppercase text-white">ReelQuorum</h2>
                                            <img
                                                hidden={!user}
                                                height="50"
                                                width="50"
                                                src={formData.image}
                                                alt=""
                                                className="rounded-circle me-1"
                                                fluid
                                            />
                                            <span style={{ marginTop: "8px", marginLeft: "10px", color: "gray" }}>{formData.email}</span>
                                        </Col>
                                        <Col>
                                        <h2 className="fw-bold text-white" style={{}}>Güncellemeyi Aç-Kapat</h2>
                                            <span>
                                                <input type="checkbox" id="codepen" className="checkbox" checked={vana} onChange={toggleVana} />
                                                <label htmlFor="codepen" className={vana ? 'checkbox checked' : 'checkbox'}/>
                                            </span>
                                        </Col>
                                    </Row>
                                    <Form onSubmit={(e) => {
                                        e.preventDefault();
                                        ProfileUpdate(formData)
                                            .then((res) => {
                                                if (res.status === 200) {
                                                    ProfileGet(user.user.email, user.accessToken).then((res2) => {
                                                        const usx = res2.data
                                                        localStorage.setItem("user", JSON.stringify(usx));
                                                        setUser(usx);
                                                        setDisabled(true);
                                                        toggleVana();
                                                    });
                                                }
                                            })
                                            .then((res) => {
                                                toast.success("Bilgileriniz Başarıyla Güncellendi")
                                            })
                                            .catch((err) => {
                                                toast.error(err.response.data.message);
                                            });
                                    }}>
                                        <Row className="mb-1">
                                            <Form.Group
                                                as={Col}
                                                className="mb-1"
                                                controlId="fullname"
                                            >
                                                <br />
                                                {
                                                    vana ? (<input type="input" value={formData.fullname} class="form__field"
                                                        placeholder="İsminizi giriniz" name="İsminizi giriniz" id='İsminizi giriniz' required
                                                        readOnly={!vana} onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                                        style={{ marginTop: "10px" }} />) : (<h3 style={{ color: "white", marginTop: "15px" }}>{formData.fullname}</h3>)
                                                }

                                                <label style={{ marginTop: "10px" }} for="İsminizi giriniz" class="form__label">Kullanıcı Adı</label>

                                            </Form.Group>
                                            <Form.Group
                                                as={Col}
                                                className="mb-1"
                                                controlId="phoneNumber"
                                            >
                                                <br />
                                                {
                                                    vana ? (<input type="number" value={formData.phoneNumber} class="form__field"
                                                        placeholder="Cep telefonunuzu giriniz" name="Cep telefonunuzu giriniz"
                                                        id='Cep telefonunuzu giriniz' required
                                                        readOnly={!vana} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                        style={{ marginTop: "10px" }} />) : (<h3 style={{ color: "white", marginTop: "15px" }}>{formData.phoneNumber}</h3>)
                                                }

                                                <label style={{ marginTop: "10px" }} for="Cep telefonunuzu giriniz" class="form__label">Cep Telefonu</label>

                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-1">
                                            <Form.Group
                                                as={Col}
                                                className="mb-1"
                                                controlId="password"
                                            >

                                                <br />
                                                {
                                                    vana ? (<input type={passwordType} value={formData.password} class="form__field"
                                                        placeholder="Şifrenizi giriniz" name="Şifrenizi giriniz"
                                                        id='Şifrenizi giriniz' required
                                                        readOnly={!vana} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                        style={{ marginTop: "30px" }} />) : (<h3 style={{ color: "white", marginTop: "40px" }}>*******</h3>)
                                                }

                                                <label style={{ marginTop: "35px" }} for="Şifrenizi giriniz" class="form__label">Şifre</label>


                                                <PassEye password={passwordType} toggle={togglePasswordType} />
                                            </Form.Group>
                                            <Form.Group
                                                as={Col}
                                                className="mb-1"
                                                controlId="newPassword"
                                            >
                                                <Col>
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            id="inpLock"
                                                            checked={newpassControl}
                                                            disabled={!vana}
                                                            onChange={(e) => setNewpassControl(e.target.checked)}
                                                        />
                                                        <label htmlFor="inpLock" className={newpassControl ? 'btn-lock checked' : 'btn-lock'}>
                                                            <svg width='16' height='17' style={{ marginLeft: "6px", marginTop: "3px" }} viewBox='0 0 36 40'>
                                                                <path className="lockb" d='M27 27C27 34.1797 21.1797 40 14 40C6.8203 40 1 34.1797 1 27C1 19.8203 6.8203 14 14 14C21.1797 14 27 19.8203 27 27ZM15.6298 26.5191C16.4544 25.9845 17 25.056 17 24C17 22.3431 15.6569 21 14 21C12.3431 21 11 22.3431 11 24C11 25.056 11.5456 25.9845 12.3702 26.5191L11 32H17L15.6298 26.5191Z' />
                                                                <path className="lock" d='M6 21V10C6 5.58172 9.58172 2 14 2V2C18.4183 2 22 5.58172 22 10V21' />
                                                                <path className="bling" d='M29 20L31 22' />
                                                                <path className="bling" d='M31.5 15H34.5' />
                                                                <path className="bling" d='M29 10L31 8' />
                                                            </svg>
                                                        </label>
                                                    </div>

                                                </Col>
                                                <Col>
                                                    {
                                                        newpassControl ? (<input type={newPasswordType} value={formData.newPassword} class="form__field"
                                                            placeholder="Yeni şifrenizi giriniz" name="Yeni şifrenizi giriniz"
                                                            id='Yeni şifrenizi giriniz' required
                                                            readOnly={!newpassControl} onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                                            style={{ marginTop: "17px" }} />) : (<h3 style={{ color: "white", marginTop: "25px" }}>*******</h3>)
                                                    }

                                                    <label style={{ marginTop: "35px" }} for="Yeni şifrenizi giriniz" class="form__label">Yeni Şifre</label>

                                                    <PassEye password={newPasswordType} toggle={toggleNewPasswordType} />
                                                </Col>

                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <ReactFileBase64
                                                disabled={!vana}
                                                type='file'
                                                multiple={false}
                                                onDone={handleFileSelect}

                                            />
                                        </Row>
                                        <button className='button-66 ' role="button-66" style={{ width: "170px" }} disabled={disabled} type="submit" hidden={!vana}>
                                            Güncelle
                                        </button>
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row
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
                            display: formData.fullname.length >= 5 && "none",
                        }}
                    >
                        * İsim en az 5 karakter olmalı.
                    </p>
                    <p
                        style={{
                            color: "#2dffb9",
                            display: formData.phoneNumber.length >= 10 && "none",
                        }}
                    >
                        * Cep telefonu en az 10 rakamdan oluşmalı.
                    </p>

                    <p
                        style={{
                            color: "#2dffb9",
                            display: (!vana || formData.password.length) >= 1 && "none",
                        }}
                    >
                        * Güncelleme için şifrenizi girmelisiniz.
                    </p>
                    <p
                        style={{
                            color: "#2dffb9",
                            display: (!vana || !newpassControl || formData.newPassword.length >= 6) && "none",
                        }}
                    >
                        * Yeni şifre en az 6 karakterden oluşmalı.
                    </p>
                    <p
                        style={{
                            color: "#2dffb9",
                            display: formData.email.length >= 3 && "none",
                        }}
                    >
                        * E-mail adresi en az 3 karakter olmalı.
                    </p>
                </Row>
            </Container>
        </motion.div>
    );
}

export default Profile;