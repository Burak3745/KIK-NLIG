import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import '../css/AddMovie.css'
import { Navigate, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { getIdMovie, getIdSeries } from '../axios/index.js'
import { FaEye } from "react-icons/fa";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai"
const SeriesDashboard = () => {
    const { id1, id2 } = useParams()
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({
        name: '', time: '', link: '', country: '', year: '', score: '',
        description: '', director: '', company: '', actors: '', season: '', type: '', catagory: '', image: '',
        likes: [{ user: '' }], dislikes: [{ user: '' }]
    })


    const dispatch = useDispatch();

    useEffect(() => {
        const getMovie = async () => {
            const { data } = await getIdMovie(id1)
            setMovieData(data)
        }

        getMovie()
    }, [id1])
    

    const [seriesData, setSeriesData] = useState({
        time: '', link: '', year: '', description: '', season: '', episode: '', foreignkey: '', views: '',
      })
    
      useEffect(() => {
        const getSeries = async () => {
          const { data } = await getIdSeries(id2)
          setSeriesData(data)
        }
    
        getSeries()
      }, [id2])
    

    const [user, setUser] = useState()
    const userState = useSelector((state) => state.user)
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser(userData)
    }, [userState])
    const userType = user && user.userType
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login" />;
    }
    else if (userType != "ADMIN") {
        navigate("/browse");
    } else {

        return (

            <div class="AddMovie">

                <div class="float-child">
                    <div class="green"><SideBar /></div>
                </div>

                <div class="float-child">
                    <div class="blue ">

                        <div class="ag-format-container" >
                            <div class="ag-courses_box" >
                                <div class="ag-courses_item" >
                                    <a class="ag-courses-item_link">
                                        <div class="ag-courses-item_bg"></div>
                                        <div class="ag-courses-item_title">
                                            <FaEye size={40} color='#22cf95' style={{ position: "absolute", left: "120px", top: "30px" }} />
                                        </div>
                                        <div class="ag-courses-item_title" style={{ position: "absolute", left: "50px", top: "50px" }}>
                                            {seriesData.views} <br />
                                            <h5 style={{ fontSize: "15px", color: "#808080" }}>Views</h5>
                                        </div>


                                    </a>
                                </div>

                                <div class="ag-courses_item">
                                    <a class="ag-courses-item_link">
                                        <div class="ag-courses-item_bg"></div>
                                        <div class="ag-courses-item_title">
                                            <AiFillLike size={40} color='#22cf95' style={{ position: "absolute", left: "120px", top: "30px" }} />
                                        </div>
                                        <div class="ag-courses-item_title" style={{ position: "absolute", left: "50px", top: "50px" }}>
                                            {movieData && movieData.likes.length} <br />
                                            <h5 style={{ fontSize: "15px", color: "#808080" }}>Likes</h5>
                                        </div>

                                    </a>
                                </div>

                                <div class="ag-courses_item">
                                    <a class="ag-courses-item_link">
                                        <div class="ag-courses-item_bg"></div>

                                        <div class="ag-courses-item_title">
                                            <AiFillDislike size={40} color='#22cf95' style={{ position: "absolute", left: "120px", top: "30px" }} />
                                        </div>
                                        <div class="ag-courses-item_title" style={{ position: "absolute", left: "50px", top: "50px" }}>
                                            {movieData && movieData.dislikes.length} <br />
                                            <h5 style={{ fontSize: "15px", color: "#808080" }}>Dislikes</h5>
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
};

export default SeriesDashboard