import React, { useEffect, useState } from 'react'

import '../css/AddMovie.css'
import { Navigate, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { updateSeriesAction } from '../action/seriesAction';
import { getIdSeries } from '../axios';

const UpdateEpisode = () => {

    var { movieid, seriesid } = useParams();
    const navigate = useNavigate();
    const [seriesData, setSeriesData] = useState({
       name:'', time: '', link: '', year: '', description: '', season: '', episode: '',
    })
    const dispatch = useDispatch();

    useEffect(() => {
        const getMemo = async () => {
            const { data } = await getIdSeries(seriesid)
            setSeriesData(data)
        }

        getMemo()
    }, [seriesid])

    const seriesUpdate = () => {
        dispatch(updateSeriesAction(seriesid, seriesData))
        navigate(`/episodes/${movieid}`);
    }

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
    }
    else {

        return (
            <div class="AddMovie">



                <div class="float-child">
                    <div class="blue ">

                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Konusu"
                                    name="name" id='name' value={seriesData.name} required onChange={(e) => setSeriesData({ ...seriesData, name: e.target.value })} />
                                <label for="Konusu" class="form__label">Bölüm Adı</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Linki"
                                    name="name" id='name' value={seriesData.description} required onChange={(e) => setSeriesData({ ...seriesData, description: e.target.value })} />
                                <label for="Linki" class="form__label">Bölüm Konusu</label>
                            </div>
                        </div>
                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Süresi"
                                    name="name" id='name' value={seriesData.link} required onChange={(e) => setSeriesData({ ...seriesData, link: e.target.value })} />
                                <label for="Süresi" class="form__label">Linki</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Yapım Yılı"
                                    name="name" id='name' value={seriesData.time} required onChange={(e) => setSeriesData({ ...seriesData, time: e.target.value })} />
                                <label for="Yapım Yılı" class="form__label">Bölüm Süresi</label>
                            </div>
                        </div>
                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Süresi"
                                    name="name" id='name' value={seriesData.year} required onChange={(e) => setSeriesData({ ...seriesData, year: e.target.value })} />
                                <label for="Sezon Sayısı" class="form__label">Yayınlanma Tarihi</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Süresi"
                                    name="name" id='name' value={seriesData.season} required onChange={(e) => setSeriesData({ ...seriesData, season: e.target.value })} />
                                <label for="Sezon Sayısı" class="form__label">Bölüm Sezon Sayısı</label>
                            </div>
                        </div>
                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Süresi"
                                    name="name" id='name' value={seriesData.episode} required onChange={(e) => setSeriesData({ ...seriesData, episode: e.target.value })} />
                                <label for="Sezon Sayısı" class="form__label">Bölüm Sayısı</label>
                            </div>
                        </div>
                        <button onClick={seriesUpdate} className='button-66' role="button-66" >Bölüm Güncelle</button>
                    </div>
                </div>

            </div >

        )
    }
};

export default UpdateEpisode