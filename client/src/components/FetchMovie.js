import { useState, useEffect, useReducer } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getIdMovie } from '../axios';
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { updateMovieAction } from '../action/movieAction'

export default function FetchMovie() {


  const { id } = useParams();

  const dispatch = useDispatch()

  const [movieData, setMovieData] = useState({
    user: '', name: '', time: '', link: '', country: '', year: '', score: '',
    description: '', director: '', company: '', actors: '', catagory: '', image: '', likes: [{ user: '' }], views: '',
  })

  useEffect(() => {
    const getMemo = async () => {
      const { data } = await getIdMovie(id)
      setMovieData(data)
    }

    getMemo()
  }, [id])


  const viewsData = {
    views: ''
  }

  viewsData.views = movieData.views + 1



  useEffect(() => {
    if (!movieData[0]) {
      dispatch(updateMovieAction(id, viewsData))
    }

  }, [dispatch, id, viewsData]);

  return (
    <div>
      <Card style={{ background: "#06001d" }}>
        <Card.Footer style={{ display: 'flex', justifyContent: "center" }}>
          <iframe src={movieData.link} scrolling="no"
            frameborder="0" width="640" height="360" allowfullscreen="true"
            webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>

        </Card.Footer>
        <div style={{ display: 'flex', justifyContent: "center", color:"#22cf95" }}>

          <FaEye size={25}  />

          <div className='mx-1'>{movieData.views}</div>
        </div>
      </Card>


    </div>
  )
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