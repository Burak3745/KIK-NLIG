import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getIdMovie, getIdSeries, getIdUser } from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSeriesAction, updateSeriesAction } from '../action/seriesAction';
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { IoSend } from "react-icons/io5";
import CommentCard from './CommentCard';
import "../css/FetchMovie.css"
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai"
import { updateUserAction } from '../action/userAction';
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { RiAdvertisementFill } from "react-icons/ri";
import { MdSubtitles } from "react-icons/md";
export default function FetchSeries() {

  const { id } = useParams();


  const dispatch = useDispatch()
  const [user, setUser] = useState()
  const userState = useSelector((state) => state.user)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setUser(userData)
  }, [userState])
  const userid = user && user._id

  const [seriesData, setSeriesData] = useState({
    name: '', time: '', link: '', year: '', description: '', season: '', episode: '', foreignkey: '', views: '', links: [], watched: [], comment: [],
    likes: [], dislikes: []
  })

  const [userData, setUserData] = useState({
    fullname: '', email: '', phoneNumber: '', hostingname: '', options: ''
  })

  useEffect(() => {
    const getUser = async () => {
      if (userid != undefined) {
        const { data } = await getIdUser(userid)
        setUserData(data)
      }

    }

    getUser()
  }, [userid])

  const [linksData, setLinksData] = useState('')
  useEffect(() => {
    const getMemo = async () => {
      const { data } = await getIdSeries(id)
      setSeriesData(data)
    }

    getMemo()
  }, [id])

  const viewsData = {
    views: ''
  }



  const isChecked = seriesData.watched.filter((item) => userid === item.userid).length != 0
  const handleCheckChange = () => {
    if (seriesData && seriesData.watched.filter((item) => userid === item.userid).length == 0) {
      const newWatched = { userid: userid };
      const currentData = { ...seriesData };

      currentData.watched.push(newWatched);
      setSeriesData(currentData);
      dispatch(updateSeriesAction(id, seriesData))
      console.log("Checkbox işaretlendi");
    } else {
      const currentData = { ...seriesData };

      const watchedIndex = currentData.watched.findIndex(
        (watched) => watched.userid === userid
      );

      if (watchedIndex !== -1) {
        currentData.watched.splice(watchedIndex, 1);
        setSeriesData(currentData);
      }
      dispatch(updateSeriesAction(id, seriesData))
      console.log("Checkbox işareti kaldırıldı!");
    }

  };



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
      const currentData = { ...seriesData };

      currentData.comment.push(newComment);
      setSeriesData(currentData);
      setDescription('')
      dispatch(updateSeriesAction(id, seriesData))
    }
  }

  const handleDeleteButtonClick = (comment) => {
    const commentIdToDelete = comment._id;
    deleteComment(commentIdToDelete);

  };

  const deleteComment = (commentId) => {
    const currentData = { ...seriesData };

    const commentIndex = currentData.comment.findIndex(
      (comment) => comment._id === commentId
    );

    if (commentIndex !== -1) {
      currentData.comment.splice(commentIndex, 1);
      setSeriesData(currentData);
    }
    dispatch(updateSeriesAction(id, seriesData))
    toast.success('Yorum Silindi')
  };

  const updateComment = (commentId) => {
    const currentData = { ...seriesData };

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
      setSeriesData(currentData);
      dispatch(updateSeriesAction(id, seriesData))
      toast.success('Yorum Güncellendi')
    }

  }

  const likeseries = () => {
    if (seriesData.likes.filter((item) => item.userid === userid).length === 0 &&
      seriesData.dislikes.filter((item) => item.userid === userid).length > 0) {
      const currentData = { ...seriesData };

      const dislikeIndex = currentData.dislikes.findIndex(
        (dislike) => dislike.userid === userid
      );

      if (dislikeIndex !== -1) {
        currentData.dislikes.splice(dislikeIndex, 1);
      }

      const newLike = { userid: userid };

      currentData.likes.push(newLike);
      setSeriesData(currentData);
      dispatch(updateSeriesAction(id, seriesData))
    }
    else if (seriesData.likes.filter((item) => item.userid === userid).length === 0 &&
      seriesData.dislikes.filter((item) => item.userid === userid).length === 0) {
      const newLike = { userid: userid };
      const currentData = { ...seriesData };

      currentData.likes.push(newLike);
      setSeriesData(currentData);
      dispatch(updateSeriesAction(id, seriesData))
    }
    else {
      toast.error('Zaten Like Atılmış')
    }
  }

  const unlikeseries = () => {
    if (seriesData.likes.filter((item) => item.userid === userid).length > 0) {
      const currentData = { ...seriesData };

      const likeIndex = currentData.likes.findIndex(
        (like) => like.userid === userid
      );

      if (likeIndex !== -1) {
        currentData.likes.splice(likeIndex, 1);
        setSeriesData(currentData);
        dispatch(updateSeriesAction(id, seriesData))
      }
    }
    else {
      toast.error('Daha like atılmamış')
    }
  }

  const dislikeseries = () => {
    if (seriesData.dislikes.filter((item) => item.userid === userid).length === 0 &&
      seriesData.likes.filter((item) => item.userid === userid).length > 0) {
      const currentData = { ...seriesData };

      const likeIndex = currentData.likes.findIndex(
        (like) => like.userid === userid
      );

      if (likeIndex !== -1) {
        currentData.likes.splice(likeIndex, 1);
      }

      const newDislike = { userid: userid };

      currentData.dislikes.push(newDislike);
      setSeriesData(currentData);
      dispatch(updateSeriesAction(id, seriesData))
    }
    else if (seriesData.dislikes.filter((item) => item.userid === userid).length === 0 &&
      seriesData.likes.filter((item) => item.userid === userid).length === 0) {
      const newDislike = { userid: userid };
      const currentData = { ...seriesData };

      currentData.dislikes.push(newDislike);
      setSeriesData(currentData);
      dispatch(updateSeriesAction(id, seriesData))
    }
    else {
      toast.error('Zaten Dislike Atılmış')
    }
  }

  const undislikeseries = () => {
    if (seriesData.dislikes.filter((item) => item.userid === userid).length > 0) {
      const currentData = { ...seriesData };

      const dislikeIndex = currentData.dislikes.findIndex(
        (dislike) => dislike.userid === userid
      );

      if (dislikeIndex !== -1) {
        currentData.dislikes.splice(dislikeIndex, 1);
        setSeriesData(currentData);
        dispatch(updateSeriesAction(id, seriesData))
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
  const izlenmesayisi = bölünmüssayi(seriesData.views);
  const likesayisi = bölünmüssayi(seriesData.likes.map((item) => { return item }).length);
  const dislikesayisi = bölünmüssayi(seriesData.dislikes.map((item) => { return item }).length);

  const userUpdate = (e) => {
    e.preventDefault()
    setLinksData(e.target.value)
    setValue(e.target.value)
    userData.hostingname = e.target.value
    if (userid != undefined) {

      dispatch(updateUserAction(userid, userData))
    }

  }
  const [value, setValue] = useState('');
  useEffect(() => {
    if (seriesData.links.filter((item) => item.hostingname === userData.hostingname).length > 0) {
      setValue(userData.hostingname)
      setLinksData(userData.hostingname)
    }
    else {

    }
    if (userData.options === "Altyazı" && seriesData.links.filter((item) => item.options === 'Altyazı').length === 0) {
      setLinkOptions("Dublaj")
    }
    else if (userData.options === "Dublaj" && seriesData.links.filter((item) => item.options === 'Dublaj').length === 0) {
      setLinkOptions("Altyazı")
    }
    else {
      setLinkOptions(userData.options)
    }

  }, [seriesData, userData]);

  const episodes = useSelector(state => state.series)
  useEffect(() => {
    if (!episodes[0]) {
      dispatch(getSeriesAction());
    }
  }, [dispatch]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieid = searchParams.get('dizi');
  const navigate = useNavigate();

  const nextepisode = (e) => {
    const shortepisode = episodes.filter((item) => item.foreignkey === movieid)
      .sort((a, b) => {
        if (a.season !== b.season) {
          return a.season - b.season;
        }
        return a.episode - b.episode;
      })
    const Index = shortepisode.findIndex(
      (item) => item._id === id
    );
    if (shortepisode[Index + 1]) {
      const nextepisode = shortepisode[Index + 1]
      const value = movieid && movieid;
      const params = new URLSearchParams(window.location.search);
      params.forEach((value, key) => {
        params.delete(key);
      });
      params.set("dizi", value);
      navigate(`/playseries/${nextepisode._id}?${params.toString()}`);
      window.location.reload()
    }
  }


  const forwardepisode = (e) => {
    const shortepisode = episodes.filter((item) => item.foreignkey === movieid)
      .sort((a, b) => {
        if (a.season !== b.season) {
          return a.season - b.season;
        }
        return a.episode - b.episode;
      })
    const Index = shortepisode.findIndex(
      (item) => item._id === id
    );
    if (shortepisode[Index - 1]) {
      const forwardepisode = shortepisode[Index - 1]
      const value = movieid && movieid;
      const params = new URLSearchParams(window.location.search);
      params.forEach((value, key) => {
        params.delete(key);
      });
      params.set("dizi", value);
      navigate(`/playseries/${forwardepisode._id}?${params.toString()}`);
      window.location.reload()
    }
  }
  const shortallepisode = episodes.filter((item) => item.foreignkey === movieid)
    .sort((a, b) => {
      if (a.season !== b.season) {
        return a.season - b.season;
      }
      return a.episode - b.episode;
    })
  const Indexepisode = shortallepisode.findIndex(
    (item) => item._id === id
  )
  const [linkOptions, setLinkOptions] = useState('')
  const [isActiveAltyazı, setIsActiveAltyazı] = useState(false)
  const [isActiveDublaj, setIsActiveDublaj] = useState(false)
  const userUpdateOptionsAltyazi = (e) => {
    setLinkOptions('Altyazı')
    setUserData({ ...userData, options: 'Altyazı' })
    userData.options = 'Altyazı'
    setIsActiveDublaj(false)
    if (userid != undefined) {

      dispatch(updateUserAction(userid, userData))
    }
  }
  useEffect(() => {
    if (linkOptions === 'Altyazı') {
      if (seriesData.links.filter((item) => item.hostingname === userData.hostingname)
        .filter((item) => item.options === linkOptions).length === 0) {
        setLinksData('')
        setValue('')
      }
      else {
        setValue(userData.hostingname)
        setLinksData(userData.hostingname)

      }

    }
  }, [linkOptions]);

  const userUpdateOptionsDublaj = (e) => {
    setLinkOptions('Dublaj');
    setUserData({ ...userData, options: 'Dublaj' })
    userData.options = 'Dublaj'
    setIsActiveAltyazı(false)
    if (userid != undefined) {

      dispatch(updateUserAction(userid, userData))
    }
  };

  useEffect(() => {
    if (linkOptions === 'Dublaj') {
      if (seriesData.links.filter((item) => item.hostingname === userData.hostingname)
        .filter((item) => item.options === linkOptions).length === 0) {
        setLinksData('')
        setValue('')
      }
      else {
        setValue(userData.hostingname)
        setLinksData(userData.hostingname)
      }

    }
  }, [linkOptions]);



  const [cur, setCur] = useState(0)
  useEffect(() => {
    if (seriesData.views != '' && cur == 0) {
      viewsData.views = seriesData.views + 1
      dispatch(updateSeriesAction(id, viewsData))
      setCur(1)
    }

  }, [dispatch, id, viewsData]);

  useEffect(() => {
    if (userData.options == 'Altyazı') {
      setIsActiveAltyazı(true)
    }
    else if (userData.options == 'Dublaj') {
      setIsActiveDublaj(true)
    }
    else {

    }
  }, [userData])

  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", overflowX: "auto", whiteSpace: "nowrap", marginBottom: "10px" }}>
          {seriesData.links.filter((item) => item.options === 'Altyazı').length > 0 ? (
            <div className={`backforward1 ${isActiveAltyazı == true ? 'active' : ''}`} style={{ marginRight: "20px", marginLeft: "20px" }} 
            onClick={(e) => userUpdateOptionsAltyazi()}>
              <MdSubtitles size={16} style={{ marginRight: "5px" }} /> Altyazı
            </div>
          ) : (<div></div>)}
          {seriesData.links.filter((item) => item.options === 'Dublaj').length > 0 ? (
            <div className={`backforward2 ${isActiveDublaj == true ? 'active' : ''}`} onClick={(e) => userUpdateOptionsDublaj(e)}>
              <RiAdvertisementFill /> Dublaj
            </div>
          ) : (<div></div>)}


          <div class="select-dropdown  mx-3">
            <select value={value} onChange={(e) => userUpdate(e)}>
              <option value=''>Choose Link</option>
              {seriesData.links.filter((item) => item.options === linkOptions).map((item) => (
                <option value={item.hostingname}>{item && item.hostingname}</option>
              ))}
            </select>
          </div>
          <div style={{ position: "relative", color: "white", marginLeft: "20px" }}>
            <label htmlFor="remember-me">İzlendi Olarak İşaretle:</label>
            <input checked={isChecked} onChange={handleCheckChange} type="checkbox" style={{ marginLeft: "10px" }} id="remember-me" />
          </div>
          {shortallepisode[Indexepisode - 1] ? (
            <div className='backforward' onClick={forwardepisode}>
              <h5>
                <IoChevronBack style={{ marginRight: "5px", marginLeft: "30px" }} size={15} />
                Önceki Bölüm
              </h5>
            </div>
          ) : (<div className='backforward' style={{ color: "gray", cursor: "default" }} >
            <h5>
              <IoChevronBack style={{ marginRight: "5px", marginLeft: "30px" }} size={15} />
              Önceki Bölüm
            </h5>
          </div>)}
          {shortallepisode[Indexepisode + 1] ? (
            <div className='backforward' style={{ marginLeft: "30px" }} onClick={nextepisode}>
              <h5>
                Sonraki Bölüm
                <IoChevronForward style={{ marginLeft: "5px" }} size={15} />
              </h5>
            </div>
          ) : (
            <div className='backforward' style={{ marginLeft: "30px", color: "gray", cursor: "default" }} >
              <h5>
                Sonraki Bölüm
                <IoChevronForward style={{ marginLeft: "5px" }} size={15} />
              </h5>
            </div>
          )}

        </div>
        <Card style={{ background: "#06001d" }}>
          {linksData == '' ? (<h1 style={{ color: "white", display: 'flex', justifyContent: "center", margin: "30px" }}>Yukarıdan Bir Link Seçiniz</h1>) : (

            <Card.Footer className='mx-4 my-4' >
              <div style={{ display: 'flex', justifyContent: "center" }}>
                <h5 style={{ color: "white", margin: "5px" }}> {seriesData.name} </h5>

              </div>
              <div style={{ display: 'flex', justifyContent: "center" }}>

                {
                  seriesData.links.filter((item2) => {
                    if (item2.hostingname === linksData && linksData) {
                      return item2
                    }
                  }).filter((item) => item.options === linkOptions)
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
                  {seriesData.likes.filter((item) => item.userid == userid).length === 0 ? (
                    <span style={{ display: "flex", marginRight: "5px", cursor: "pointer", position: "relative" }} onClick={likeseries}>
                      <AiFillLike color='white' size={25} />
                      <span style={{ borderRight: "1px solid gray" }}>
                        <div className='mx-2 my-1 text-white'>{likesayisi}</div>
                      </span>
                    </span>) : (
                    <span style={{ display: "flex", marginRight: "5px", cursor: "pointer", position: "relative" }} onClick={unlikeseries} >
                      <AiFillLike color='#2dffb9' size={25} />
                      <span style={{ borderRight: "1px solid gray" }}>
                        <div className='mx-2 my-1 text-white'>{likesayisi}</div>
                      </span>
                    </span>)}
                  {seriesData.dislikes.filter((item) => item.userid == userid).length === 0 ? (
                    <span style={{ display: "flex", marginRight: "5px", cursor: "pointer", position: "relative" }} onClick={dislikeseries}>
                      <AiFillDislike color='white' size={25} />
                      <span >
                        <div className='mx-2 my-1 text-white'>{dislikesayisi}</div>
                      </span>
                    </span>) : (
                    <span style={{ display: "flex", marginRight: "5px", cursor: "pointer", position: "relative" }} onClick={undislikeseries}>
                      <AiFillDislike color='#2dffb9' size={25} />
                      <span >
                        <div className='mx-2 my-1 text-white'>{dislikesayisi}</div>
                      </span></span>)}
                </div>
              </div>
            </Card.Footer >
          )
          }
        </Card >
        <Card className='my-4' style={{ background: "#06001d" }}>
          <Card.Footer className='mx-4 my-2' style={{ display: 'flex', justifyContent: "center", color: "white" }}>
            <h3>BÖLÜM HAKKINDA</h3>

          </Card.Footer>
          <div className='mx-3 my-2' style={{ display: 'flex', justifyContent: "center", color: "rgba(255, 255, 255, 0.5)", textAlign:"justify" }}>
            {seriesData.season}.sezon {' '} {seriesData.episode}.bölüm{': '}
            {seriesData.description}

          </div>
        </Card>
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

              <input type="input" value={description} class="form__field" placeholder="Yorum Ekleyin..." name="Yorum Ekleyin..." id='Yorum Ekleyin...' required onChange={(e) => setDescription(e.target.value)} />
              <label for="Yorum Ekleyin..." class="form__label">Yorum Ekleyin</label>
            </div>
            <IoSend onClick={sendButtonClick} size={20} style={{ marginTop: "35px", position: "relative" }} className='send-icon' />
          </div>
          <div>
            {seriesData && seriesData.comment.map((comment, index) => (
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
  useEffect(() => {
    if (!seriesData[0]) {
      dispatch(updateSeriesAction(id, viewsData))
    }

  }, [dispatch, id, viewsData]);*/