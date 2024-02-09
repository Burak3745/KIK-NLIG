import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar, Nav, Container, NavDropdown, Form, Row, Col, NavbarCollapse } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../image/King.png";
import SmileFace from "../image/smiley-face.png"
import { useDispatch, useSelector } from "react-redux";
import { getMovieAction } from "../action/movieAction";
import { useHistory } from 'react-router-dom';
import '../css/Header.css'
const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [search1, setSearch1] = useState('')

  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user") && !user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user, setUser]);

  const movie = useSelector(state => state.movie)

  useEffect(() => {
    if (!movie[0]) {
      dispatch(getMovieAction());
    }
  }, [dispatch]);

  const handleChangeName = (e) => {

    const value = search1;
    const params2 = new URLSearchParams(window.location.search);
    params2.delete("catagory")
    params2.delete("country")
    params2.delete("page")
    params2.delete("minscore")
    params2.delete("maxscore")
    params2.delete("time")
    params2.delete("siralamatipi")
    params2.delete("siralamatürü")
    params2.delete("director")
    params2.delete("minyear")
    params2.delete("maxyear")
    params2.delete("type")
    params2.set("name", value);
    navigate(`/search?${params2.toString()}`);
    window.location.reload()
  };

  const AdminControl = user && user.userType

  const [searchActive, setSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const searchToggle = () => {
    setSearchActive(!searchActive);
    if (searchActive && search1.trim() !== '') {
      handleChangeName()
    }

    // Her durumda arama inputunu temizle
    setSearch1('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Enter tuşuna basıldığında arama işlemini gerçekleştir
      searchToggle();
    }
  };

  const navigatee = (movie) => {
    navigate(`/play/${movie && movie._id}`);
    setSearchActive(!searchActive);
    setSearch1('');

  }

  const navigateeEpisode = (movie) => {
    navigate(`/episodes/${movie && movie._id}`);
    setSearchActive(!searchActive);
    setSearch1('');

  }

  return (

    <Navbar
      className="bg-body-tertiary flex-column"
      collapseOnSelect
      bg="auto"
      variant="dark"
      expand="lg"
    >
      <Container fluid  >
        <Nav.Link href="/">
          <img
            alt="Logo"
            src={Logo}
            style={{ height: "90px", width: "auto", marginLeft: "30px" }}
            className=" d-inline-block align-top navbar-image"
          />
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">



          <div hidden={!user} className={`search-wrapper ${searchActive ? 'active' : ''}`} >

            <div className="input-holder">
              <input type="text" className="search-input" value={search1} onChange={(e) => setSearch1(e.target.value)} placeholder="Film veya Dizi Arayın" onKeyDown={handleKeyDown} />
              <button className="search-icon" onClick={searchToggle}>
                <span></span>
              </button>
            </div>
            {search1.length >= 1 ? (<div className="card-container-search">
              <h4 style={{ color: "white", margin: "20px" }}>Sonuçlar</h4>
              {movie.filter((item) => {
                return search1.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search1.toLowerCase())
              }).length === 0 ? (
                <h4 style={{ color: "white", margin: "20px" }}>Sonuç Bulunamadı</h4>
              ) : (<div>

                <h4 style={{ color: "#2dffb9", margin: "20px" }}>Filmler</h4>

                {movie.filter((item) => item.type == "Film").filter((item) => {
                  return search1.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search1.toLowerCase())
                }).slice(0, 2).map((item) => (
                  <div className="card-search" onClick={() => navigatee(item)}>
                    <h3>{item.name}</h3>
                  </div>
                ))}
                <h4 style={{ color: "#2dffb9", margin: "20px" }}>Diziler</h4>
                {movie.filter((item) => item.type == "Dizi").filter((item) => {
                  return search1.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search1.toLowerCase())
                }).slice(0, 2).map((item) => (
                  <div className="card-search" onClick={() => navigateeEpisode(item)}>
                    <h3>{item.name}</h3>
                  </div>
                ))}</div>)
              }

            </div>) : (<div></div>)}

          </div>

          <Nav>
            <img
              hidden={!user}
              height="50"
              width="50"
              src={user && user.image}
              alt=""
              className="rounded-circle me-1"
              fluid
              style={{ marginLeft: "10px" }}
            />

            <NavDropdown
              hidden={!user}
              title={user && user.email}
              id="dropdownMenu"
              style={{ marginTop: "8px", marginLeft: "10px" }}
            >
              <NavDropdown.Item className="dropdownItem" onClick={() => navigate("/posts")}>
                Bildirimler
              </NavDropdown.Item>
              <NavDropdown.Item className="dropdownItem" onClick={() => navigate("/profile")}>
                Profil
              </NavDropdown.Item>
              {AdminControl == "ADMIN" ? (
                <NavDropdown.Item href="/movielist" className="dropdownItem" >
                  Admin Panel
                </NavDropdown.Item>
              ) : (<div></div>)
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
      <Container>
      {user ? (
        <NavbarCollapse className="justify-content-center" style={{ border: "2px solid white", borderRadius: "10px", marginTop: "10px", marginBottom:"10px" }} >
          <div>
            <Nav hidden={!user} >
              <Nav.Link href="/diziler" className="dizifilm-text" >
                <button class="draw">Diziler</button>

              </Nav.Link>
              <Nav.Link href="/filmler" className="dizifilm-text" >
                <button class="draw">Filmler</button>
              </Nav.Link>
              <Nav.Link className="dizifilm-text" >
                <button class="draw">Kategoriler</button>
              </Nav.Link>
              <Nav.Link href="/oyuncular" className="dizifilm-text">
                <button class="draw">Oyuncular</button>
              </Nav.Link>
            </Nav>
          </div>
        </NavbarCollapse>
      ): null}
      </Container>
    </Navbar>
  );
};

export default Header;
