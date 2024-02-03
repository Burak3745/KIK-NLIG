import { useState, useEffect, useReducer } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getIdMovie } from '../axios';
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { updateMovieAction } from '../action/movieAction'
import CommentCard from './CommentCard';
import "../css/FetchMovie.css"
import toast from "react-hot-toast";
import SeriesCard from './SeriesCard';
import { IoSend } from "react-icons/io5";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai"
export default function FetchMovie() {


  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const [user, setUser] = useState()
  const userState = useSelector((state) => state.user)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setUser(userData)
  }, [userState])
  const userid = user && user._id

  const [movieData, setMovieData] = useState({
    user: '', name: '', time: '', link: '', country: '', year: '', score: '',
    description: '', director: '', company: '', actors: '', catagory: '', image: '', likes: [], dislikes: [], views: '',
    player: [], links: [], watched: [], comment: []
  })


  const isChecked = movieData.watched.filter((item) => userid === item.userid).length != 0
  const handleCheckChange = () => {
    if (movieData && movieData.watched.filter((item) => userid === item.userid).length == 0) {
      const newWatched = { userid: userid };
      const currentData = { ...movieData };

      currentData.watched.push(newWatched);
      setMovieData(currentData);
      dispatch(updateMovieAction(id, movieData))
    } else {
      const currentData = { ...movieData };

      const watchedIndex = currentData.watched.findIndex(
        (watched) => watched.userid === userid
      );

      if (watchedIndex !== -1) {
        currentData.watched.splice(watchedIndex, 1);
        setMovieData(currentData);
      }
      dispatch(updateMovieAction(id, movieData))
    }

  };



  const [linksData, setLinksData] = useState('')
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

  const [editedComment, setEditedComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [description, setDescription] = useState('');
  const sendButtonClick = () => {
    if (description == '') {
      toast.error('Bir yorum yazınız')
    }
    else {
      const date = new Date()
      const newComment = { userid: userid, description: description, date: date };
      const currentData = { ...movieData };

      currentData.comment.push(newComment);
      setMovieData(currentData);
      dispatch(updateMovieAction(id, movieData))
    }
  }

  const handleDeleteButtonClick = (comment) => {
    const commentIdToDelete = comment._id;
    deleteComment(commentIdToDelete);

  };

  const deleteComment = (commentId) => {
    const currentData = { ...movieData };

    const commentIndex = currentData.comment.findIndex(
      (comment) => comment._id === commentId
    );

    if (commentIndex !== -1) {
      currentData.comment.splice(commentIndex, 1);
      setMovieData(currentData);
    }
    dispatch(updateMovieAction(id, movieData))
    toast.success('Yorum Silindi')
  };

  const updateComment = (commentId) => {
    const currentData = { ...movieData };

    const commentIndex = currentData.comment.findIndex(
      (comment) => comment._id === commentId
    );

    if (editedComment == '') {
      toast.error('Bir yorum yazınız')
    }
    else if (currentData.comment[commentIndex].description === editedComment) {
      toast.error('Farklı bir yorum yazınız')
    }
    else if (commentIndex !== -1) {
      currentData.comment[commentIndex].description = editedComment;
      setMovieData(currentData);
      dispatch(updateMovieAction(id, movieData))
      toast.success('Yorum Güncellendi')
    }

  }

  const likemovie = () => {
    if (movieData.likes.filter((item) => item.userid === userid).length === 0 &&
      movieData.dislikes.filter((item) => item.userid === userid).length > 0) {
      const currentData = { ...movieData };

      const dislikeIndex = currentData.dislikes.findIndex(
        (dislike) => dislike.userid === userid
      );

      if (dislikeIndex !== -1) {
        currentData.dislikes.splice(dislikeIndex, 1);
      }

      const newLike = { userid: userid };

      currentData.likes.push(newLike);
      setMovieData(currentData);
      dispatch(updateMovieAction(id, movieData))
    }
    else if (movieData.likes.filter((item) => item.userid === userid).length === 0 &&
      movieData.dislikes.filter((item) => item.userid === userid).length === 0) {
      const newLike = { userid: userid };
      const currentData = { ...movieData };

      currentData.likes.push(newLike);
      setMovieData(currentData);
      dispatch(updateMovieAction(id, movieData))
    }
    else {
      toast.error('Zaten Like Atılmış')
    }
  }

  const unlikemovie = () => {
    if (movieData.likes.filter((item) => item.userid === userid).length > 0) {
      const currentData = { ...movieData };

      const likeIndex = currentData.likes.findIndex(
        (like) => like.userid === userid
      );

      if (likeIndex !== -1) {
        currentData.likes.splice(likeIndex, 1);
        setMovieData(currentData);
        dispatch(updateMovieAction(id, movieData))
      }
    }
    else {
      toast.error('Daha like atılmamış')
    }
  }

  const dislikemovie = () => {
    if (movieData.dislikes.filter((item) => item.userid === userid).length === 0 &&
      movieData.likes.filter((item) => item.userid === userid).length > 0) {
      const currentData = { ...movieData };

      const likeIndex = currentData.likes.findIndex(
        (like) => like.userid === userid
      );

      if (likeIndex !== -1) {
        currentData.likes.splice(likeIndex, 1);
      }

      const newDislike = { userid: userid };

      currentData.dislikes.push(newDislike);
      setMovieData(currentData);
      dispatch(updateMovieAction(id, movieData))
    }
    else if (movieData.dislikes.filter((item) => item.userid === userid).length === 0 &&
      movieData.likes.filter((item) => item.userid === userid).length === 0) {
      const newDislike = { userid: userid };
      const currentData = { ...movieData };

      currentData.dislikes.push(newDislike);
      setMovieData(currentData);
      dispatch(updateMovieAction(id, movieData))
    }
    else {
      toast.error('Zaten Dislike Atılmış')
    }
  }

  const undislikemovie = () => {
    if (movieData.dislikes.filter((item) => item.userid === userid).length > 0) {
      const currentData = { ...movieData };

      const dislikeIndex = currentData.dislikes.findIndex(
        (dislike) => dislike.userid === userid
      );

      if (dislikeIndex !== -1) {
        currentData.dislikes.splice(dislikeIndex, 1);
        setMovieData(currentData);
        dispatch(updateMovieAction(id, movieData))
      }
    }
    else {
      toast.error('Daha dislike atılmamış')
    }
  }

  function bölünmüssayi(sayi) {
    const bin = Math.floor(sayi / 100) / 10;
    const onbin = Math.floor(sayi / 1000)
    const milyon = Math.floor(bin / 100) / 10;
    const onmilyon = Math.floor(bin / 1000)
    const milyar = Math.floor(milyon / 100) / 10;
    const onmilyar = Math.floor(milyon / 1000)
    const trilyon = Math.floor(milyar / 100) / 10;
    const ontrilyon = Math.floor(milyar / 1000)

    if (trilyon > 10) {
      return `${ontrilyon} Tn`;
    } else if (trilyon >= 1) {
      return `${trilyon} Tn`;
    } else if (milyar >= 10) {
      return `${onmilyar} Mr`;
    } else if (milyar >= 1) {
      return `${milyar} Mr`;
    } else if (milyon >= 10) {
      return `${onmilyon} Mn`;
    } else if (milyon >= 1) {
      return `${milyon} Mn`;
    } else if (bin >= 10) {
      return `${onbin} B`;
    } else if (bin >= 1) {
      return `${bin} B`;
    } else {
      return `${sayi}`
    }
  }
  const izlenmesayisi = bölünmüssayi(movieData.views);
  const likesayisi = bölünmüssayi(movieData.likes.map((item) => { return item }).length);
  const dislikesayisi = bölünmüssayi(movieData.dislikes.map((item) => { return item }).length);
  useEffect(() => {
    if (!movieData[0]) {
      dispatch(updateMovieAction(id, viewsData))
    }

  }, [dispatch, id, viewsData]);

  const navigatee = (id) => {
    navigate(`/actors/${id}`);
  }

  if (movieData.type == "Dizi") {
    return (navigate(`/episodes/${id}`))
  }
  else {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom:"10px" }}>
          <div class="select-dropdown  mx-3">
            <select onChange={(e) => setLinksData(e.target.value)}>
              <option value=''>Choose Link</option>
              {movieData.links.map((item) => (
                <option value={item.hostingname}>{item && item.hostingname}</option>
              ))}
            </select>

          </div>
          <div style={{ position: "relative", color: "white", marginLeft: "20px" }}>
            <label htmlFor="remember-me">İzlendi Olarak İşaretle:</label>
            <input checked={isChecked} onChange={handleCheckChange} type="checkbox" style={{ marginLeft: "10px" }} id="remember-me" />
          </div>
        </div>
        <Card style={{ background: "#06001d" }}>

          {linksData == '' ? (<h1 style={{ color: "white",display: 'flex', justifyContent: "center", margin:"30px"}}>Yukarıdan Bir Link Seçiniz</h1>) : (
            <Card.Footer className='mx-4 my-4' >
              <div style={{ display: 'flex', justifyContent: "center" }}>
              {movieData.links.filter((item2) => {
                if (item2.hostingname === linksData && linksData) {
                  return item2
                }
              })
                .map((link) => (
                  <iframe src={link.adress} scrolling="no"
                    frameborder="0" width="640" height="360" allowfullscreen="true"
                    webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
                ))}
                </div>
              <div style={{ display: 'flex', justifyContent: "center", marginTop: "10px" }}>
                <div style={{ display: 'flex', justifyContent: "center", width: "240px", borderRadius: "15px", border: "1px solid #2dffb9" }}>
                  <span >
                    <FaEye size={25} color='white' />
                  </span>
                  <span style={{ borderRight: "1px solid gray", marginRight: "5px" }}>
                    <div className='mx-2 my-1 text-white'>{izlenmesayisi}</div>
                  </span>
                  {movieData.likes.filter((item) => item.userid == userid).length === 0 ? (
                    <span style={{ display: "flex", marginRight: "5px", cursor: "pointer", position: "relative" }} onClick={likemovie}>
                      <AiFillLike color='white' size={25} />
                      <span style={{ borderRight: "1px solid gray" }}>
                        <div className='mx-2 my-1 text-white'>{likesayisi}</div>
                      </span>
                    </span>) : (
                    <span style={{ display: "flex", marginRight: "5px", cursor: "pointer", position: "relative" }} onClick={unlikemovie} >
                      <AiFillLike color='#2dffb9' size={25} />
                      <span style={{ borderRight: "1px solid gray" }}>
                        <div className='mx-2 my-1 text-white'>{likesayisi}</div>
                      </span>
                    </span>)}
                  {movieData.dislikes.filter((item) => item.userid == userid).length === 0 ? (
                    <span style={{ display: "flex", marginRight: "5px", cursor: "pointer", position: "relative" }} onClick={dislikemovie}>
                      <AiFillDislike color='white' size={25} />
                      <span >
                        <div className='mx-2 my-1 text-white'>{dislikesayisi}</div>
                      </span>
                    </span>) : (
                    <span style={{ display: "flex", marginRight: "5px", cursor: "pointer", position: "relative" }} onClick={undislikemovie}>
                      <AiFillDislike color='#2dffb9' size={25} />
                      <span >
                        <div className='mx-2 my-1 text-white'>{dislikesayisi}</div>
                      </span></span>)}
                </div>
              </div>

            </Card.Footer>
          )}





        </Card>
        <Card className='my-4' style={{ background: "#06001d" }}>
          <Card.Footer className='mx-4 my-2' style={{ display: 'flex', justifyContent: "center", color: "white" }}>
            <h3>HAKKINDA</h3>

          </Card.Footer>
          <div className='mx-3 my-2' style={{ display: 'flex', justifyContent: "center", color: "rgba(255, 255, 255, 0.5)" }}>
            {movieData.description}

          </div>
        </Card>
        <div className='my-4 mx-4' style={{ background: "#06001d", minHeight: "640px", borderRadius: "5px" }}>
          <div class="float-child">
            <div class="green mx-4 my-4"><SeriesCard movie={movieData} /></div>
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
        <div className='' style={{ background: "#06001d", minHeight: "300px", borderRadius: "5px" }}>
          <div style={{ display: 'flex', justifyContent: "center", color: "white" }}>
            <h3 className='my-4' >YORUMLAR</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: "start" }}>
            <img hidden={!user}
              height="50"
              width="50"
              src={user && user.image}
              alt=""
              className="rounded-circle me-1 my-3 mx-4"
              fluid />
            <div class="form__group field mx-3">

              <input type="input" class="form__field" placeholder="Yorum Ekleyin..." name="Yorum Ekleyin..." id='Yorum Ekleyin...' required onChange={(e) => setDescription(e.target.value)} />
              <label for="Yorum Ekleyin..." class="form__label">Yorum Ekleyin</label>
            </div>
            <IoSend onClick={sendButtonClick} size={20} style={{ marginTop: "35px", position: "relative" }} className='send-icon' />
          </div>
          <div>
            {movieData && movieData.comment.map((comment, index) => (
              <div className='card-comment my-5' key={comment.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <CommentCard comment={comment} index={index} editedComment={editedComment} setEditedComment={setEditedComment}
                    editingCommentId={editingCommentId} setEditingCommentId={setEditingCommentId} />

                  {comment.userid === userid && editingCommentId !== index ? (
                    <div className='edit-delete-comment'>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setEditedComment(comment.description);
                          setEditingCommentId(index);
                        }}
                      >
                        Düzenle
                      </div>
                      <br />
                      <div style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleDeleteButtonClick(comment)

                        }}>
                        Sil
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

                {editingCommentId === index ? (
                  <div>
                    <button className='button-edit'
                      onClick={() => {
                        updateComment(comment._id)
                        setEditingCommentId(null);
                      }}
                    >
                      Kaydet
                    </button>
                    <button
                      className='button-iptal'
                      onClick={() => {
                        setEditingCommentId(null);
                      }}
                    >
                      İptal
                    </button>
                  </div>
                ) : (
                  <div
                  >
                  </div>
                )}
              </div>
            ))}
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