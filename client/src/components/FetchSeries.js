import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getIdMovie, getIdSeries } from '../axios';
import { useDispatch } from 'react-redux';
import { updateSeriesAction } from '../action/seriesAction';
import { FaEye } from "react-icons/fa";
export default function FetchSeries() {

  const { id } = useParams();

  const dispatch = useDispatch()
  const [seriesData, setSeriesData] = useState({
    time: '', link: '', year: '', description: '', season: '', episode: '', foreignkey: '', views: '',
  })

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



  useEffect(() => {
    if (!seriesData[0]) {
      dispatch(updateSeriesAction(id, viewsData))
    }

  }, [dispatch, id, viewsData]);

  return (
    <Card style={{ background: "#06001d" }}>
      <Card.Footer style={{ display: 'flex', justifyContent: "center" }}>
        <iframe src={seriesData.link} scrolling="no"
          frameborder="0" width="640" height="360" allowfullscreen="true"
          webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>

      </Card.Footer>
      <div style={{ display: 'flex', justifyContent: "center", color: "#22cf95" }}>

        <FaEye size={25} />

        <div className='mx-1'>{seriesData.views}</div>
      </div>
    </Card>
  )
}