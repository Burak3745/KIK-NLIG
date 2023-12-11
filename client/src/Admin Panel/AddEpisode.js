import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import '../css/AddMovie.css'
import { Navigate, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { createSeriesAction } from '../action/seriesAction';

const AddSeries = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [seriesData, setSeriesData] = useState({
        name: '', time: '', link: '', year: '', description: '', season: '', episode: '', foreignkey: `${id}`,
    })
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);


    const seriesCreate = () => {
        dispatch(createSeriesAction(seriesData))
        navigate("/serieslist");
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
                    <div class="green"><SideBar /></div>
                </div>

                <div class="float-child">
                    <div class="blue ">

                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Konusu"
                                    name="name" id='name' required onChange={(e) => setSeriesData({ ...seriesData, name: e.target.value })} />
                                <label for="Konusu" class="form__label">Bölüm Adı</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Linki"
                                    name="name" id='name' required onChange={(e) => setSeriesData({ ...seriesData, description: e.target.value })} />
                                <label for="Linki" class="form__label">Bölüm Konusu</label>
                            </div>
                        </div>
                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Süresi"
                                    name="name" id='name' required onChange={(e) => setSeriesData({ ...seriesData, link: e.target.value })} />
                                <label for="Süresi" class="form__label">Linki</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Yapım Yılı"
                                    name="name" id='name' required onChange={(e) => setSeriesData({ ...seriesData, time: e.target.value })} />
                                <label for="Yapım Yılı" class="form__label">Bölüm Süresi</label>
                            </div>
                        </div>
                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Süresi"
                                    name="name" id='name' required onChange={(e) => setSeriesData({ ...seriesData, year: e.target.value })} />
                                <label for="Sezon Sayısı" class="form__label">Yayınlanma Tarihi</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Süresi"
                                    name="name" id='name' required onChange={(e) => setSeriesData({ ...seriesData, season: e.target.value })} />
                                <label for="Sezon Sayısı" class="form__label">Bölüm Sezon Sayısı</label>
                            </div>
                        </div>
                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Süresi"
                                    name="name" id='name' required onChange={(e) => setSeriesData({ ...seriesData, episode: e.target.value })} />
                                <label for="Sezon Sayısı" class="form__label">Bölüm Sayısı</label>
                            </div>
                        </div>
                        <button onClick={seriesCreate} className='button-66 ' role="button-66">Bölüm Ekle</button>
                    </div>
                </div>

            </div >

        )
    }
};

export default AddSeries