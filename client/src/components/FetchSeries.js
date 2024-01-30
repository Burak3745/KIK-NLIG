import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getIdMovie, getIdSeries } from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateSeriesAction } from '../action/seriesAction';
import { FaEye } from "react-icons/fa";
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
    time: '', link: '', year: '', description: '', season: '', episode: '', foreignkey: '', views: '', links: [], watched: []
  })
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

  viewsData.views = seriesData.views + 1

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

  useEffect(() => {
    if (!seriesData[0]) {
      dispatch(updateSeriesAction(id, viewsData))
    }

  }, [dispatch, id, viewsData]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div class="select-dropdown  mx-3">
          <select onChange={(e) => setLinksData(e.target.value)}>
            <option value=''>Choose Link</option>
            {seriesData.links.map((item) => (
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
        <Card.Footer style={{ display: 'flex', justifyContent: "center" }}>
          {linksData == '' ? (<h1 style={{ color: "white" }}>Yukarıdan Bir Link Seçiniz</h1>) : (
            seriesData.links.filter((item2) => {
              if (item2.hostingname === linksData && linksData) {
                return item2
              }
            })
              .map((link) => (
                <iframe src={link.adress} scrolling="no"
                  frameborder="0" width="640" height="360" allowfullscreen="true"
                  webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
              ))
          )}

        </Card.Footer>
        <div style={{ display: 'flex', justifyContent: "center", color: "#22cf95" }}>

          <FaEye size={25} />

          <div className='mx-1'>{seriesData.views}</div>
        </div>
      </Card>
      <Card className='my-4' style={{ background: "#06001d" }}>
        <Card.Footer className='mx-4 my-2' style={{ display: 'flex', justifyContent: "center", color: "white" }}>
          <h3>BÖLÜM HAKKINDA</h3>

        </Card.Footer>
        <div className='mx-3 my-2' style={{ display: 'flex', justifyContent: "center", color: "rgba(255, 255, 255, 0.5)" }}>
          {seriesData.description}

        </div>
      </Card>
    </div>
  )
}