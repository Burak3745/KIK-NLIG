import { useState, useEffect, useReducer } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getIdMovie } from '../axios';
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { updateMovieAction } from '../action/movieAction'
import "../css/FetchMovie.css"
import SeriesCard from './SeriesCard';
export default function FetchMovie() {


  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [movieData, setMovieData] = useState({
    user: '', name: '', time: '', link: '', country: '', year: '', score: '',
    description: '', director: '', company: '', actors: '', catagory: '', image: '', likes: [{ user: '' }], views: '', player: []
  })

  useEffect(() => {
    const getMemo = async () => {
      const { data } = await getIdMovie(id)
      setMovieData(data)
    }

    getMemo()
  }, [id])

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
  }, []);

  const viewsData = {
    views: ''
  }

  viewsData.views = movieData.views + 1



  useEffect(() => {
    if (!movieData[0]) {
      dispatch(updateMovieAction(id, viewsData))
    }

  }, [dispatch, id, viewsData]);

  const navigatee = (id) => {
    navigate(`/actors/${id}`);
  }

  if (movieData.type == "Dizi") {
    return (navigate(`/diziler`))
  }
  else {
    return (
      <div>
        <Card style={{ background: "#06001d" }}>
          <Card.Footer className='mx-4 my-4' style={{ display: 'flex', justifyContent: "center" }}>
            <iframe src={movieData.link} scrolling="no"
              frameborder="0" width="640" height="360" allowfullscreen="true"
              webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>

          </Card.Footer>
          <div style={{ display: 'flex', justifyContent: "center", color: "#22cf95" }}>

            <FaEye size={25} />

            <div className='mx-1'>{movieData.views}</div>
          </div>
        </Card>
        <Card className='my-4' style={{ background: "#06001d" }}>
          <Card.Footer className='mx-4 my-2' style={{ display: 'flex', justifyContent: "center", color: "white" }}>
            <h3>HAKKINDA</h3>

          </Card.Footer>
          <div className='mx-3 my-2' style={{ display: 'flex', justifyContent: "center", color: "rgba(255, 255, 255, 0.5)" }}>
            {movieData.description}

          </div>
        </Card>
        <div className='my-4 mx-4' style={{ background: "#06001d", minHeight: "640px" }}>
          <div class="float-child">
            <div class="green"><SeriesCard movie={movieData} /></div>
          </div>
          <div class="">
            <h3 className='py-4' style={{ display: 'flex', justifyContent: "center", color: "white" }}>OYUNCULAR</h3>
            <Row>
              {movieData.player.map((item) => (
                <Col
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  key={movieData._id}
                  style={{ width: "128px", height: "180px" }}
                  className='my-2'
                >
                  <div class='card-glass'>
                    <div class='content-glass' onClick={() => navigatee(item.actorsid)}>
                      <div class='imgBx-glass'>
                        <img src={item.image} />
                      </div>
                      <div class='contentBx-glass'>
                        <h3><span>{item.name}</span></h3>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div >
    )
  }
}

/*
const [user, setUser] = useState()
  const userState = useSelector((state) => state.user)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setUser(userData)
  }, [userState])
  const userid = user && user._id

  const [userData] = [{
    userid: `${user && user._id}`
  }]

  const likess = movieData.likes

  const userData1 = JSON.stringify(userData)
  const bool = likess.filter((item) => userData1 === item.user).length > 0

  console.log(bool)
        */

/*{
          likess.filter((item) => userData1 === item.user).length == 0 ?(
            <div onClick={(e) => {
              e.preventDefault()
              dispatch(likeMovieAction(movieData._id, userData))
              setTimeout(function(){
                window.location.reload();
            }, 800)
            }} style={{ cursor: "pointer" }}>
              <AiFillLike color='white' size={100} />
            </div>
          ) : (<div onClick={(e) => {
            e.preventDefault()
            dispatch(unlikeMovieAction(movieData._id, userData))
            setTimeout(function(){
              window.location.reload();
          }, 800)
          }} style={{ cursor: "pointer" }}>
            <AiFillLike color='red' size={100} style={{ cursor: "pointer" }} />
          </div>)}
        <div>{
          likess.length}</div>
*/