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
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import PassEye from '../components/PassEye'
import { ProfileGet, ProfileUpdate } from '../axios';

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
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        password: "",
        newPassword: "",
    });
    const [newpassControl, setNewpassControl] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [newPasswordType, setNewPasswordType] = useState("password");

    useEffect(() => {
        console.log(formData);
        if (
            formData.password.length >= 1 &&
            formData.fullname.length >= 5 &&
            formData.phoneNumber.length >= 10 &&
            formData.email.length >= 3 &&
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
                    <Col md={10} lg={8} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-1 mt-4">
                                    <Row>
                                        <Col>
                                            <h2 className="fw-bold mb-2 text-uppercase">KIK'NLIG</h2>
                                            <p className=" mb-3" style={{ color: "red" }}>{user?.email}</p>
                                        </Col>
                                        <Col>
                                            <div className="d-grid">
                                                {
                                                    <Button variant={vana ? "outline-info" : "outline-light"} onClick={toggleVana}>
                                                        Güncellemeyi {vana ? "kapa" : "aç"}
                                                    </Button>
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                    <Form onSubmit={(e) => {
                                        e.preventDefault();
                                        ProfileUpdate(formData)
                                            .then((res) => {
                                                if (res.status === 200) {
                                                    ProfileGet(user.email).then((res2) => {
                                                        const usx = res2.data
                                                        localStorage.setItem("user", JSON.stringify(usx));
                                                        setUser(usx);
                                                        setDisabled(true);
                                                        toggleVana();
                                                    });
                                                }
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
                                                <Form.Label className="text-center">
                                                    İsim Soyisim
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="İsminizi giriniz"
                                                    value={formData.fullname}
                                                    style={{ border: vana ? "" : 0 }}
                                                    readOnly={!vana}
                                                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Form.Group
                                                as={Col}
                                                className="mb-1"
                                                controlId="phoneNumber"
                                            >
                                                <Form.Label>Cep telefonu</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Cep telefonunuzu giriniz"
                                                    value={formData.phoneNumber}
                                                    style={{ border: vana ? "" : 0 }}
                                                    readOnly={!vana}
                                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-1">
                                            <Form.Group
                                                as={Col}
                                                className="mb-1"
                                                controlId="password"
                                            >
                                                <Form.Label className="text-center">
                                                    Şifre
                                                </Form.Label>
                                                <Form.Control
                                                    type={passwordType}
                                                    className="mb-1"
                                                    placeholder={vana ? "Şifrenizi giriniz" : "*******"}
                                                    value={formData.password}
                                                    style={{ border: vana ? "" : 0 }}
                                                    readOnly={!vana}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                ></Form.Control>
                                                <PassEye password={passwordType} toggle={togglePasswordType} />
                                            </Form.Group>
                                            <Form.Group
                                                as={Col}
                                                className="mb-1"
                                                controlId="newPassword"
                                            >
                                                <Col>
                                                    <Form.Check
                                                        className="mb-2"
                                                        type="checkbox"
                                                        label="Yeni şifre"
                                                        disabled={!vana}
                                                        checked={newpassControl}
                                                        onChange={(e) => setNewpassControl(e.target.checked)}
                                                    ></Form.Check>
                                                </Col>
                                                <Col>
                                                    <Form.Control
                                                        type={newPasswordType}
                                                        placeholder={vana ? "Yeni şifrenizi giriniz" : "*******"}
                                                        value={formData.newPassword}
                                                        style={{ border: vana ? "" : 0 }}
                                                        readOnly={!newpassControl}
                                                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                                    ></Form.Control>
                                                    <PassEye password={newPasswordType} toggle={toggleNewPasswordType} />
                                                </Col>

                                            </Form.Group>
                                        </Row>
                                        <div className="d-grid">
                                            <Button disabled={disabled} variant="primary" type="submit" hidden={!vana}>
                                                Kaydet
                                            </Button>
                                        </div>
                                    </Form>
                                    <div className="mt-2">
                                        <p className="mb-0  text-center">
                                            @BerkayErsoy&BurakDuyar
                                            <a href="/browse" className="text-primary fw-bold">
                                                Tarama sayfası
                                            </a>
                                        </p>
                                    </div>
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
                            color: "red",
                            display: formData.fullname.length >= 5 && "none",
                        }}
                    >
                        * İsim en az 5 karakter olmalı.
                    </p>
                    <p
                        style={{
                            color: "red",
                            display: formData.phoneNumber.length >= 10 && "none",
                        }}
                    >
                        * Cep telefonu en az 10 rakamdan oluşmalı.
                    </p>

                    <p
                        style={{
                            color: "red",
                            display: (!vana || formData.password.length) >= 1 && "none",
                        }}
                    >
                        * Güncelleme için şifrenizi girmelisiniz.
                    </p>
                    <p
                        style={{
                            color: "red",
                            display: (!vana || !newpassControl || formData.newPassword.length >= 6) && "none",
                        }}
                    >
                        * Yeni şifre en az 6 karakterden oluşmalı.
                    </p>
                    <p
                        style={{
                            color: "red",
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