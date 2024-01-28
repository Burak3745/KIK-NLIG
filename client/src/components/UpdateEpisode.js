import React, { useEffect, useState } from 'react'

import '../css/AddMovie.css'
import { Navigate, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { updateSeriesAction } from '../action/seriesAction';
import { getIdSeries } from '../axios';
import { Col, Row } from 'react-bootstrap';
import { IoClose } from "react-icons/io5";
const UpdateEpisode = () => {

    var { movieid, seriesid } = useParams();
    const navigate = useNavigate();
    const [seriesData, setSeriesData] = useState({
        name: '', time: '', link: '', year: '', description: '', season: '', episode: '', links: []
    })
    const [linkData, setLinkData] = useState({
        hostingname: '', adress: ''
    })
    const dispatch = useDispatch();

    useEffect(() => {
        const getMemo = async () => {
            const { data } = await getIdSeries(seriesid)
            setSeriesData(data)
        }

        getMemo()
    }, [seriesid])

    const [disabled2, setDisabled2] = useState(true);
    useEffect(() => {
        if (
            linkData.hostingname.length >= 2 &&
            linkData.adress.length >= 2
        ) {
            setDisabled2(false)
        }
        else {
            setDisabled2(true)
        }
    })
    const seriesUpdate = () => {
        dispatch(updateSeriesAction(seriesid, seriesData))
        navigate(`/episodes/${movieid}`);
    }


    const addLink = (newLink) => {
        const currentData = { ...seriesData };

        currentData.links.push(newLink);
        setSeriesData(currentData);
    }
    const createLink = () => {
        if (seriesData.links.filter((item) => item.hostingname === linkData.hostingname).length == 0) {
            const newLink = { hostingname: linkData.hostingname, adress: linkData.adress }
            addLink(newLink)
        }
    }

    const deleteLink = (linkName) => {
        const currentData = { ...seriesData };

        const linkIndex = currentData.links.findIndex(
            (link) => link.hostingname === linkName
        );

        // Eğer oyuncu bulunduysa, listeden çıkar
        if (linkIndex !== -1) {
            currentData.links.splice(linkIndex, 1);
            setSeriesData(currentData);
        }
    };
    const handleLinkDeleteButtonClick = (link) => {
        const linkNameToDelete = link.hostingname;
        deleteLink(linkNameToDelete);

    };

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
                                <input type="input" class="form__field" placeholder="Linki"
                                    name="name" id='name' required onChange={(e) => setLinkData({ ...linkData, hostingname: e.target.value })} />
                                <label for="Hosting" class="form__label">Hosting İsmi</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Linki"
                                    name="name" id='name' required onChange={(e) => setLinkData({ ...linkData, adress: e.target.value })} />
                                <label for="Adress" class="form__label">Link Adresi</label>
                            </div>
                            <div class="form__group field py-4 px-5 ">
                                <button disabled={disabled2} onClick={createLink} className=' ' role="button-66">Link Ekle</button>
                            </div>

                        </div>
                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Yapım Yılı"
                                    name="name" id='name' value={seriesData.time} required onChange={(e) => setSeriesData({ ...seriesData, time: e.target.value })} />
                                <label for="Yapım Yılı" class="form__label">Bölüm Süresi</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Süresi"
                                    name="name" id='name' value={seriesData.year} required onChange={(e) => setSeriesData({ ...seriesData, year: e.target.value })} />
                                <label for="Sezon Sayısı" class="form__label">Yayınlanma Tarihi</label>
                            </div>

                        </div>
                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Süresi"
                                    name="name" id='name' value={seriesData.season} required onChange={(e) => setSeriesData({ ...seriesData, season: e.target.value })} />
                                <label for="Sezon Sayısı" class="form__label">Bölüm Sezon Sayısı</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Süresi"
                                    name="name" id='name' value={seriesData.episode} required onChange={(e) => setSeriesData({ ...seriesData, episode: e.target.value })} />
                                <label for="Sezon Sayısı" class="form__label">Bölüm Sayısı</label>
                            </div>
                        </div>
                        <button onClick={seriesUpdate} className='button-66' role="button-66" >Bölüm Güncelle</button>
                        <h3 style={{ color: "white" }} className='mx-4'>Linkler</h3>
                        <Row className='mx-2'>
                            {seriesData.links.map((item) => (
                                <Col
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                    key={item._id}
                                    style={{ width: "150px", height: "120px" }}
                                >
                                    <div style={{
                                        background: "white", borderRadius: "5px", textAlign: "center",
                                        position: "relative", cursor: "pointer"
                                    }} onClick={() => handleLinkDeleteButtonClick(item)}>
                                        <h5 className='my-5' style={{ fontSize: "16px" }}>{item.hostingname} <IoClose color='#e44002' /></h5>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>

            </div >

        )
    }
};

export default UpdateEpisode