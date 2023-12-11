import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getPostByIdAction, createPostAction, updatePostAction, getPostAction } from "../action/postAction.js";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import FilmCombo from "../components/FilmCombo.js";
import MovieCard from "../components/MovieCard1.js";
import { useDispatch, useSelector } from "react-redux";
import { getMovieAction } from "../action/movieAction.js";

const animations1 = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const animations2 = {
  initial: { y: -25 },
  animate: { y: 0 },
  exit: { y: 0 },
};

const PostEntry = () => {
  const [movieSelected, setMovieSelected] = useState(null);
  const [user] = useState(JSON.parse(localStorage.getItem('user')));

  const posts = useSelector((state) => state.posts);
  const movies = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movies[0]) {
      dispatch(getMovieAction());
    }
  }, [dispatch, movies]);

  useEffect(() => {
    if (!posts[0]) {
      dispatch(getPostAction(user?.email));
    }
  }, [dispatch, posts, user]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    _id: "",
    userId: user?.email,
    movieId: "",
    title: "",
    body: "",
    date: "",
  });

  const { _id } = useParams();

  useEffect(() => {
    console.log(_id);
    if (_id) {
      dispatch(getPostByIdAction(_id)).then((res) => {
        const post = res.data;
        setFormData(post);
        const films = movies.filter((item) => post.movieId === item._id);
        setMovieSelected(films[0]);
      }).catch((err) => {
        console.log(err)
        toast.error(err.response.data.message);
      });
    }
  }, [dispatch, setFormData, _id, movies, setMovieSelected]);

  const textAreaRef = React.createRef();

  useEffect(()=>{
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 14 + "px";
  },[textAreaRef])

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    console.log(formData);
    if (
      formData.movieId.length > 0 &&
      formData.title.length >= 5 &&
      formData.body.length >= 10
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData]);

  const handleMovieSelect = (e) => {
    const films = movies.filter((item) => e === item._id);
    setMovieSelected(films[0]);
    setFormData({ ...formData, movieId: e, title: films[0].name });
  }

  const userType = user && user.userType
  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  }
  else if (userType !== "ADMIN") {
    return <Navigate to="/browse" />;
  }
  return (
    <motion.div
      className="py-3"
      variants={animations1}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1 }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                formData.date = new Date();
                formData._id && formData._id !== "0"
                  ? dispatch(updatePostAction(formData._id, formData))
                    .then((res) => {
                      navigate("/posts");
                    })
                    .catch((err) => {
                      toast.error(err.response.data.message);
                    })
                  : dispatch(createPostAction(formData))
                    .then((res) => {
                      navigate("/posts");
                    })
                    .catch((err) => {
                      toast.error(err.response.data.message);
                    });
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicID" style={{ height: formData.movieId ? 300 : 100 }}>
                <Form.Label color="white">FILM VE DIZI</Form.Label>
                <Row>
                  <Col>
                      <MovieCard movie={movieSelected} hidden = {!formData.movieId} />
                    <Form.Control readOnly
                      onChange={(e) =>
                        setFormData({ ...formData, movieId: e.target.value })
                      }
                      type="movieId"
                      placeholder="Bir film veya dizi seçin"
                      value={formData.movieId}
                      hidden
                    ></Form.Control>
                  </Col>
                  <Col>
                    <FilmCombo handleMovieSelect={handleMovieSelect} />
                  </Col>
                </Row>
              </Form.Group>
              <motion.div
                variants={animations2}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 1 }}
              >
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Başlık</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    type="title"
                    placeholder="Başlık girin"
                    value={formData.title}
                  ></Form.Control>
                </Form.Group>
              </motion.div>
              <motion.div
                variants={animations1}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 1 }}
              >
                <Form.Group className="mb-3" controlId="formBasicContent">
                  <Form.Label>İçerik</Form.Label>
                  <Form.Control
                    ref={textAreaRef}
                    onChange={(e) => {
                      const ta = e.target;
                      ta.style.height = "auto";
                      ta.style.height = ta.scrollHeight + 14 + "px";
                      setFormData({ ...formData, body: ta.value })
                    }
                    }
                    type="content"
                    as="textarea"
                    rows="1"
                    draggable
                    placeholder="İçerik giriniz"
                    value={formData.body}
                  ></Form.Control>
                </Form.Group>
              </motion.div>
              <Form.Group className="d-grid">
                <Button
                  disabled={disabled}
                  type="submit"
                  name="submit"
                  variant="primary"
                  size="lg"
                >
                  Kaydet
                </Button>
              </Form.Group>
            </Form>
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
                  color: "red",
                  display: formData.title.length >= 5 && "none",
                }}
              >
                * Başlık en az 5 karakter olmalı.
              </p>
              <p
                style={{
                  color: "red",
                  display: formData.body.length >= 10 && "none",
                }}
              >
                * İçerik alanı en az 10 karakter olmalı.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default PostEntry;
