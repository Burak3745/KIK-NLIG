import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import '../css/AddMovie.css'
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { createMovieAction } from '../action/movieAction';
import ReactFileBase64 from 'react-file-base64'
import ActorsCombo from './ActorsCombo';
import { getActorsAction } from '../action/actorsAction';
import { Col, Row } from 'react-bootstrap';
import { IoClose } from "react-icons/io5";
import { Dropdown } from 'semantic-ui-react';
const AddMovie = () => {
    const dispatch = useDispatch();
    const actors = useSelector((state) => state.actors);

    useEffect(() => {
        if (!actors[0]) {
            dispatch(getActorsAction());
        }
    }, [dispatch]);

    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({
        name: '', time: '', link: '', country: '', year: '', score: '',
        description: '', director: '', company: '', season: '', type: 'Film', catagory: '', image: '', player: [], links: []
    })
    const catagoryArray = movieData.catagory && movieData.catagory.split(',').map(item => item.trim());
    const countryArray = movieData.country && movieData.country.split(',').map(item => item.trim());
    const [linkData, setLinkData] = useState({
        hostingname: '', adress: '', options: ''
    })
    const [disabled, setDisabled] = useState(true);
    const [disabled2, setDisabled2] = useState(true);
    useEffect(() => {
        if (
            linkData.hostingname.length >= 2 &&
            linkData.adress.length >= 2 &&
            linkData.options.length >= 2
        ) {
            setDisabled2(false)
        }
        else {
            setDisabled2(true)
        }
    })
    useEffect(() => {
        if (movieData.type == "Film") {
            if (
                movieData.name.length >= 2 &&
                movieData.company.length >= 2 &&
                movieData.director.length >= 2 &&
                movieData.country.length >= 2 &&
                movieData.description.length >= 2 &&
                movieData.score.length >= 2 &&
                movieData.time.length >= 2 &&
                movieData.year.length >= 2 &&
                movieData.catagory.length >= 2
            ) {
                setDisabled(false);
            }
            else {
                setDisabled(true);
            }
        }
        else {
            if (
                movieData.name.length >= 2 &&
                movieData.company.length >= 2 &&
                movieData.director.length >= 2 &&
                movieData.country.length >= 2 &&
                movieData.description.length >= 2 &&
                movieData.score.length >= 2 &&
                movieData.season.length >= 1 &&
                movieData.catagory.length >= 2
            ) {
                setDisabled(false);
            }
            else {
                setDisabled(true);
            }
        }
    }, [movieData]);

    const movieCreate = () => {
        dispatch(createMovieAction(movieData))
        if (movieData.type == "Film") {
            navigate('/movielist')
        }
        else {
            navigate('/serieslist')
        }
    }
    const addPlayer = (newPlayer) => {
        const currentData = { ...movieData };

        currentData.player.push(newPlayer);
        setMovieData(currentData);
    };

    const deletePlayer = (playerId) => {
        const currentData = { ...movieData };

        const playerIndex = currentData.player.findIndex(
            (player) => player.actorsid === playerId
        );

        // Eğer oyuncu bulunduysa, listeden çıkar
        if (playerIndex !== -1) {
            currentData.player.splice(playerIndex, 1);
            setMovieData(currentData);
        }
    };

    const handleAddButtonClick = (e) => {
        const actor1 = actors.filter((item) => e === item._id);
        if (movieData.player.filter((item) => e === item.actorsid).length == 0) {
            const actor = actor1[0]
            const newPlayer = { name: actor.name, image: actor.image, actorsid: actor._id };

            addPlayer(newPlayer);
        }
    };

    const handleDeleteButtonClick = (player) => {
        const playerIdToDelete = player.actorsid;
        deletePlayer(playerIdToDelete);

    };

    const addLink = (newLink) => {
        const currentData = { ...movieData };

        currentData.links.push(newLink);
        setMovieData(currentData);
        console.log(movieData)
    }
    const createLink = () => {
        if (movieData.links.filter((item) => item.options == linkData.options).filter((item) => item.hostingname === linkData.hostingname).length == 0) {
            const newLink = { hostingname: linkData.hostingname, adress: linkData.adress, options: linkData.options }
            addLink(newLink)
        }
    }

    const deleteLink = (linkName) => {
        const currentData = { ...movieData };

        const linkIndex = currentData.links.findIndex(
            (link) => link.hostingname === linkName
        );

        // Eğer oyuncu bulunduysa, listeden çıkar
        if (linkIndex !== -1) {
            currentData.links.splice(linkIndex, 1);
            setMovieData(currentData);
        }
    };
    const handleLinkDeleteButtonClick = (link) => {
        const linkNameToDelete = link.hostingname;
        deleteLink(linkNameToDelete);

    };

    const isAltyazi = linkData.options === 'Altyazı';
    const isDublaj = linkData.options === 'Dublaj';
    const altyaziCheckChange = (e) => {
        if (linkData.options == 'Altyazı') {
            setLinkData({ ...linkData, options: '' })
        }
        else {
            setLinkData({ ...linkData, options: e.target.value })
        }
    }
    const dublajCheckChange = (e) => {
        if (linkData.options == 'Dublaj') {
            setLinkData({ ...linkData, options: '' })
        }
        else {
            setLinkData({ ...linkData, options: e.target.value })
        }
    }

    const handleDropdownCatagoryChange = (event, data) => {
        if (movieData.catagory == null) {
            setMovieData({ ...movieData, catagory: '' })
        }
        else if (data.value.length <= 2) {
            const selectedValues1 = data.value;
            const string1 = selectedValues1 && selectedValues1.join(', ');
            setMovieData({ ...movieData, catagory: string1 })

        }
    };

    const handleDropdownCountryChange = (event, data) => {
        if (movieData.country == null) {
            setMovieData({ ...movieData, country: '' })
        }
        else if (data.value.length <= 2) {
            const selectedValues2 = data.value;
            const string2 = selectedValues2 && selectedValues2.join(', ');
            setMovieData({ ...movieData, country: string2 })
        }

    };





    const catagoryOptions = [
        { value: 'Action & Advanture', text: 'Action & Advanture' },
        { value: 'Animation', text: 'Animation' },
        { value: 'Comedy', text: 'Comedy' },
        { value: 'Crime', text: 'Crime' },
        { value: 'Documentary', text: 'Documentary' },
        { value: 'Drama', text: 'Drama' },
        { value: 'Family', text: 'Family' },
        { value: 'Kids', text: 'Kids' },
        { value: 'Mystery', text: 'Mystery' },
        { value: 'News', text: 'News' },
        { value: 'Reality', text: 'Reality' },
        { value: 'Sci-Fi & Fantasy', text: 'Sci-Fi & Fantasy' },
        { value: 'Soap', text: 'Soap' },
        { value: "Talk", text: "Talk" },
        { value: "War & Politics", text: "War & Politics" },
        { value: 'Western', text: 'Western' },
    ]
    const countryOptions = [
        { key: 'gb', value: 'İngiltere', flag: 'gb', text: 'İngiltere' },
        { key: 'us', value: 'ABD', flag: 'us', text: 'Amerika' },
        { key: 'tr', value: 'Türkiye', flag: 'tr', text: 'Türkiye' },
    ]

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                document.getElementById('myButton').click();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const [user, setUser] = useState()
    const userState = useSelector((state) => state.user)
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser(userData)
    }, [userState])
    const userType = user && user.user.userType
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login" />;
    }
    else if (userType != "ADMIN") {
        navigate("/");
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
                                <input type="input" class="form__field" placeholder="Name"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, name: e.target.value })} />
                                <label for="Film Adı" class="form__label">Adı</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Yapımcı Şirketi"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, company: e.target.value })} />
                                <label for="Yapımcı Şirketi" class="form__label">Yapımcı Şirketi</label>
                            </div>


                        </div>
                        <div className='flex-container mx-2'>

                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Yönetmeni"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, director: e.target.value })} />
                                <label for="Yönetmeni" class="form__label">Yönetmeni</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Konusu"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, description: e.target.value })} />
                                <label for="Konusu" class="form__label">Konusu</label>
                            </div>
                        </div>
                        <div className='flex-container mx-2'>


                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="IMDB Puanı"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, score: e.target.value })} />
                                <label for="IMDB Puanı" class="form__label">IMDB Puanı</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="IMDB Puanı"
                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, image: e.target.value })} />
                                <label for="IMDB Puanı" class="form__label">Resmi</label>
                            </div>
                        </div>
                        <div>
                            {
                                movieData.type === "Film" ? (
                                    <div>
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
                                                <span style={{ position: "relative", color: "white", marginRight: "15px" }}>
                                                    <label htmlFor="altyazı">Altyazı</label>
                                                    <input checked={isAltyazi} value={'Altyazı'} onChange={(e) => altyaziCheckChange(e)} type="checkbox" style={{ marginLeft: "10px" }} id="altyazı" />
                                                    <label style={{ marginLeft: "5px" }} htmlFor="dublaj">Dublaj</label>
                                                    <input checked={isDublaj} value={'Dublaj'} onChange={(e) => dublajCheckChange(e)} type="checkbox" style={{ marginLeft: "10px" }} id="dublaj" />
                                                </span>
                                                <button disabled={disabled2} onClick={createLink} className='button-37 ' role="button-37">Link Ekle</button>
                                            </div>

                                        </div>
                                        <div className='flex-container mx-2'>
                                            <div class="form__group field py-2 px-2">
                                                <input type="input" class="form__field" placeholder="Süresi"
                                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, time: e.target.value })} />
                                                <label for="Süresi" class="form__label">Süresi</label>
                                            </div>

                                            <div class="form__group field py-2 px-2">
                                                <input type="input" class="form__field" placeholder="Yapım Yılı"
                                                    name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, year: e.target.value })} />
                                                <label for="Yapım Yılı" class="form__label">Yapım Yılı</label>
                                            </div>

                                        </div>
                                    </div>
                                ) : (<div><div className='flex-container mx-2'>
                                    <div class="form__group field py-2 px-2">
                                        <input type="input" class="form__field" placeholder="Süresi"
                                            name="name" id='name' required onChange={(e) => setMovieData({ ...movieData, season: e.target.value })} />
                                        <label for="Sezon Sayısı" class="form__label">Sezon Sayısı</label>
                                    </div>

                                </div>
                                </div>)
                            }
                        </div>
                        <div className='flex-container'>
                            <div class="form__group field">
                                <Dropdown
                                    className='mx-3 my-2'
                                    placeholder='Kategori Seç'
                                    multiple
                                    selection
                                    options={catagoryOptions}
                                    value={catagoryArray}
                                    onChange={handleDropdownCatagoryChange}
                                />
                                <div class="select-dropdown mx-3 my-2">

                                    <select value={movieData.type} onChange={(e) => setMovieData({ ...movieData, type: e.target.value })}>

                                        <option value="Film">Film</option>
                                        <option value="Dizi">Dizi</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form__group field py-3 px-2">
                                <Dropdown
                                    className='my-2'
                                    clearable
                                    multiple
                                    search
                                    selection
                                    options={countryOptions}
                                    value={countryArray}
                                    onChange={handleDropdownCountryChange}
                                    placeholder='Ülke Seç'
                                />

                                <div className='py-2'>
                                    <ActorsCombo handleMovieSelect={handleAddButtonClick} />
                                </div>
                            </div>

                        </div>
                        <button id="myButton" disabled={disabled} onClick={movieCreate} className='button-66 ' role="button-66">Ekle</button>
                        {movieData.type === 'Film' ? (
                            <div>
                                <h3 style={{ color: "white" }} className='mx-4'>Linkler</h3>
                                <Row className='mx-2'>
                                    {movieData.links.map((item) => (
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
                        ) : (<div></div>)}

                        <h3 style={{ color: "white" }} className='mx-4'>Oyuncular</h3>
                        <Row className='mx-2'>
                            {movieData.player.map((item) => (

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
                                    }} onClick={() => handleDeleteButtonClick(item)} >
                                        <h5 className='my-5' style={{ fontSize: "16px" }}>{item.name} <IoClose color='#e44002' /></h5>
                                    </div>
                                </Col>

                            ))}
                        </Row>
                    </div>

                </div>

            </div>
        )
    }
};

export default AddMovie