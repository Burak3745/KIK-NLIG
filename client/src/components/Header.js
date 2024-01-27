import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar, Nav, Container, NavDropdown, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../image/King.png";
import SmileFace from "../image/smiley-face.png"
import { useDispatch, useSelector } from "react-redux";
import { getMovieAction } from "../action/movieAction";
import { useHistory } from 'react-router-dom';
import '../css/Header.css'
const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const[search1, setSearch1] = useState('')
  
  useEffect(() => {
    if (localStorage.getItem("user") && !user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user, setUser]);

  const handleChangeName = (e) => {
    const { value } = e.target;
    
    const params2 = new URLSearchParams(window.location.search);
    params2.set("name", value);
    e.preventDefault()
    navigate(`/search?${params2.toString()}`);
  };

  const AdminControl = user && user.userType
  return (
    <Navbar
    className="bg-body-tertiary"
      collapseOnSelect
      bg="auto"
      variant="dark"
      expand="lg"
      >
      <Container fluid>
        <Nav.Link href="/">
          <img
            alt="Logo"
            src={Logo}
            style={{height: "90px", width: "auto"}}
            className="mx-4 d-inline-block align-top"
          />
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0" hidden={!user}>
            <Nav.Link href="/diziler" className="dizifilm-text" style={{}}>
            <button class="draw">Diziler</button>
              
            </Nav.Link>
            <Nav.Link href="/filmler" className="dizifilm-text" style={{}}>
            <button class="draw">Filmler</button>
            </Nav.Link>
          </Nav>
          
          <div id="wrap" >
            <Form hidden={!user}>
              <input type="text" id="input2" className="input2" onChange={(e) => setSearch1(e.target.value)} onKeyPress={event => {
                if (event.key === "Enter") {
                  handleChangeName(event)
                }
              }} placeholder="Film-Dizi Arayın"/><input id="search_submit" className="search_submit" type="submit" />
              </Form>
            
            </div>

          <Nav>
            <img
              hidden={!user}
              height="35"
              width="50"
              src={SmileFace}
              alt=""
              className="rounded-circle me-1"
              fluid
            />
            
            <NavDropdown
              hidden={!user}
              title={user && user.email}
              id="dropdownMenu"
            >
              <NavDropdown.Item className="dropdownItem" onClick={() => navigate("/posts")}>
                Bildirimler
              </NavDropdown.Item>
              <NavDropdown.Item className="dropdownItem" onClick={() => navigate("/profile")}>
                Profil
              </NavDropdown.Item>
              { AdminControl == "ADMIN" ? (
              <NavDropdown.Item className="dropdownItem" onClick={() => navigate("/movielist")}>
                Admin Panel
              </NavDropdown.Item>
              ):(<div></div>)
              }
            </NavDropdown>

            {user ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  borderRadius: "6px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#2dffb9",
                }}
                onClick={(e) => {
                  localStorage.removeItem("user");
                  setUser(null);
                  navigate("/");
                }}
              >
                {" "}
                Çıkış yap{" "}
              </motion.button>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
