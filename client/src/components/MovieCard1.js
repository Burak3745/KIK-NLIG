
import { useNavigate } from 'react-router-dom';
import Rating from './Rating';
import '../css/MovieCardBrowser.css'
import { FaPlayCircle } from 'react-icons/fa'

import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { dislikeMovieAction, likeMovieAction, undislikeMovieAction, unlikeMovieAction } from '../action/movieAction'
export default function MovieCard({ movie, hidden }) {
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const [user, setUser] = useState()
    const userState = useSelector((state) => state.user)
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser(userData)
    }, [userState])
    const userid = user && user._id

    const [userData] = [{
        userid: `${userid}`
    }]

    const userData1 = JSON.stringify(userData)

    const navigatee = (movie) => {
        navigate(`/play/${movie && movie._id}`);
    }

    const navigateeEpisode = (movie) => {
        navigate(`/episodes/${movie && movie._id}`);
    }

    return (
        <div className="movie-card" hidden={hidden} style={{ width: "170px", height: "300px" }} >
            <div class="wrapper">
                <div class="card1">
                    <img src={movie && movie.image} />
                    <div class="descriptions">
                        {movie && movie.type === "Film" ? (

                            <div>
                                { }
                                <h1 style={{marginTop:"7px"}}>{movie && movie.name}</h1>
                                <div onClick={() => navigatee(movie)}>
                                    <FaPlayCircle size={"85px"} color='#2dffb9' style={{ position: "absolute", left: "32px", top: "80px" }} />
                                </div>
                                <h1 style={{ position: "absolute", left: "55px", top: "170px", color: "rgba(245, 197, 24)" }}>IMDB</h1>
                                <Rating style={{ position: "absolute", left: "20px", top: "190px", color: "rgba(245, 197, 24)" }} score={movie && movie.score} />
                                <h1 style={{ position: "absolute", left: "115px", top: "193px", color: "rgba(245, 197, 24)" }}>{movie && movie.score}</h1>
                            </div>
                        ) : (
                            <div>
                                <h1 style={{marginTop:"7px"}}>{movie && movie.name}</h1>
                                <div onClick={() => navigateeEpisode(movie)}>
                                    <FaPlayCircle size={"85px"} color='#2dffb9' style={{ position: "absolute", left: "32px", top: "80px" }} />
                                </div>
                                <h1 style={{ position: "absolute", left: "55px", top: "170px", color: "rgba(245, 197, 24)" }}>IMDB</h1>
                                <Rating style={{ position: "absolute", left: "20px", top: "190px", color: "rgba(245, 197, 24)" }} score={movie && movie.score} />
                                <h1 style={{ position: "absolute", left: "105px", top: "193px", color: "rgba(245, 197, 24)" }}>{movie && movie.score}</h1>
                            </div>
                        )}

                        {
                            movie && movie.watched.filter((item) => userid === item.userid).length > 0 && movie.type === "Film" ? (
                                <h1 style={{ color: "red", position: "absolute", top: "5px", left: "45px" }}>İZLENDİ</h1>
                            ) : (<div></div>)

                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

/*<img
                class="card__background"
                src={movie.image}
                alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
                width="100%"
                height="100%"
            />
            <div className="movie-details">
                <h4>{movie.name}</h4>
                <Rating score={movie.score} />
                <Link to={`/play/${movie._id}`}>
                    <BsPlayFill className="play-btn" />
                </Link>
                <Link to={`/details/${movie._id}`}>
                    <BsChevronUp className="details-btn" />
                </Link>
            </div>
            */