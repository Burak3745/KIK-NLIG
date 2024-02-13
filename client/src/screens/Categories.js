import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router';
import { getMovieAction } from '../action/movieAction';
import { useDispatch, useSelector } from 'react-redux';
import Filtered from '../components/Filtered';
import {
    DropdownMenu,
    DropdownItem,
    DropdownHeader,
    Dropdown,
} from 'semantic-ui-react'
import { Col, Row } from 'react-bootstrap';
import MovieCard from '../components/MovieCard1';

const Categories = () => {
    const movie = useSelector(state => state.movie)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!movie[0]) {
            dispatch(getMovieAction());
        }
    }, [dispatch]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const catagory = searchParams.get('catagory');
    const country = searchParams.get('country');
    const time = searchParams.get('time');
    const minscore = searchParams.get('minscore');
    const maxscore = searchParams.get('maxscore');
    const director = searchParams.get('director');
    const minyear = searchParams.get('minyear');
    const maxyear = searchParams.get('maxyear');
    const type = searchParams.get('type');
    const company = searchParams.get('company');
    let currentPage = searchParams.get('page');
    const catagoryArray = catagory && catagory.split(',').map(item => item.trim());
    const countryArray = country && country.split(',').map(item => item.trim());

    const [catagoryData, setCatagoryData] = useState(catagoryArray)
    const [nameData, setNameData] = useState(name);
    const [timeData, setTimeData] = useState(time);
    const [countryData, setCountryData] = useState(countryArray)
    const [minscoreData, setMinscoreData] = useState(minscore)
    const [maxscoreData, setMaxscoreData] = useState(maxscore)
    const [directorData, setDirectorData] = useState(director);
    const [minyearData, setMinyearData] = useState(minyear);
    const [maxyearData, setMaxyearData] = useState(maxyear);
    const [typeData, setTypeData] = useState(type);
    const [companyData, setCompanyData] = useState(company);

    const filteredOther = () => {
        return movie.filter((item) => {
            if (name === '' || name == 'null' || name === null) { return item }
            else {
                return name.toLowerCase() === '' ? item : item.name.toLowerCase().includes(name.toLowerCase())
            }
        })
            .filter(item => {
                if (catagory === '' || catagory === 'null' || catagory === null) return item;
                else {
                    const selectedCategories = catagory.split(',').map(category => category.trim().toLowerCase());
                    return selectedCategories.some(selectedCategory => item.catagory.toLowerCase().includes(selectedCategory));
                }
            })
            .filter(item => {
                if (country === '' || country === 'null' || country === null) return item;
                else {
                    const selectedCountry = country.split(',').map(country => country.trim().toLowerCase());
                    const selectedItemCountry = item.country.split(',').map(country => country.trim().toLowerCase());
                    return selectedCountry.some(selectedCountry =>
                        selectedItemCountry.some(selectedItemCountry => selectedItemCountry.toLowerCase().includes(selectedCountry)
                        )
                    )
                }
            })
            .filter(item => {
                if (time === '' || time === 'null' || time === null) return item;
                else if (time == '1' || time == 1) {
                    return item.time >= '30' && item.time < '60'
                }
                else if (time == '2' || time == 2) {
                    return item.time >= '60' && item.time < '90'
                }
                else if (time == '3' || time == 3) {
                    return item.time >= '90' && item.time < '120'
                }
                else if (time == '4' || time == 4) {
                    return item.time >= '120' && item.time < '150'
                }
                else if (time == '5' || time == 5) {
                    return item.time >= '150' && item.time < '180'
                }
                else if (time == '6' || time == 6) {
                    return item.time >= '180'
                }
            })
            .filter(item => {
                if (minscore === '' && maxscore === '' || minscore === null && maxscore === null) return item;
                else if (minscore && maxscore == '') {
                    return item.score >= parseInt(minscore)
                }
                else if (maxscore && minscore == '') {
                    return item.score <= parseInt(maxscore)

                }
                else {
                    return item.score >= parseInt(minscore) && item.score <= parseInt(maxscore)
                }
            })
            .filter((item) => {
                if (director === '' || director == 'null' || director === null) { return item }
                else {
                    return director.toLowerCase() === '' ? item : item.director.toLowerCase().includes(director.toLowerCase())
                }
            })
            .filter(item => {
                if (minyear === '' && maxyear === '' || minyear === null && maxyear === null) return item;
                else if (minyear && maxyear == '') {
                    return item.year.slice(-4) >= parseInt(minyear)
                }
                else if (maxyear && minyear == '') {
                    return item.year.slice(-4) <= parseInt(maxyear)

                }
                else {
                    return item.year.slice(-4) >= parseInt(minyear) && item.year.slice(-4) <= parseInt(maxyear)
                }
            })
            .filter(item => {
                if (type === '' || type == 'null' || type === null) return item;
                else {
                    return item.type == type
                }
            })
            .filter((item) => {
                if (company === '' || company == 'null' || company === null) { return item }
                else {
                    return company.toLowerCase() === '' ? item : item.company.toLowerCase().includes(company.toLowerCase())
                }
            })
    }

    let sortBy = ''
    let sortOrder = ''
    if (searchParams.get('siralamatipi') != null) {
        sortBy = searchParams.get('siralamatipi');
    }
    else {
        sortBy = 'score'
    }

    if (searchParams.get('siralamaturu') != null) {
        sortOrder = searchParams.get('siralamaturu');
    }
    else {
        sortOrder = 'desc'
    }

    const sortMovies = (sortBy, sortOrder) => {
        if (sortBy == 'year') {
            return filteredOther().sort((a, b) => {
                let comparison = 0;
                if (a[sortBy].slice(-4) > b[sortBy].slice(-4)) {
                    comparison = 1;
                } else if (a[sortBy].slice(-4) < b[sortBy].slice(-4)) {
                    comparison = -1;
                }
                return sortOrder === 'desc' ? comparison * -1 : comparison;
            })
        }
        else {
            return filteredOther().sort((a, b) => {
                let comparison = 0;
                if (a[sortBy] > b[sortBy]) {
                    comparison = 1;
                } else if (a[sortBy] < b[sortBy]) {
                    comparison = -1;
                }
                return sortOrder === 'desc' ? comparison * -1 : comparison;
            })
        }
        ;
    };

    const handleSortOderChange = (e, { value }) => {
        const params = new URLSearchParams(window.location.search);
        params.set("siralamaturu", value);
        params.set("page", 1);
        setTimer(300)
        navigate(`/kategoriler?${params.toString()}`);
    };

    const handleByChange = (e, { value }) => {
        const params = new URLSearchParams(window.location.search);
        params.set("siralamatipi", value);
        params.set("page", 1);
        setTimer(300)
        navigate(`/kategoriler?${params.toString()}`);
    };

    if (currentPage == null) {
        currentPage = 1
    }

    const recordsPerPage = 48;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = sortMovies(sortBy, sortOrder).slice(firstIndex, lastIndex);


    const npage = Math.ceil(sortMovies(sortBy, sortOrder).length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    function prePage() {
        if (currentPage == 1) { }
        else {
            const value = currentPage - 1
            const params = new URLSearchParams(window.location.search);
            params.set("page", value);
            navigate(`/kategoriler?${params.toString()}`);
            setTimer(200)
        }
    }
    function changeCPage(id) {
        if (parseInt(currentPage, 10) == id) {

        }
        else {
            const value = id
            const params = new URLSearchParams(window.location.search);

            params.set("page", value);
            navigate(`/kategoriler?${params.toString()}`);
            setTimer(200)
        }
    }

    function nextPage() {
        if (currentPage >= npage) {
        }
        else {
            const value = parseInt(currentPage, 10) + 1
            const params = new URLSearchParams(window.location.search);
            params.set("page", value);
            navigate(`/kategoriler?${params.toString()}`);
            setTimer(200)

        }
    }
    let sliceCurrent = 0
    if (currentPage == 2 || currentPage == 1) {
        sliceCurrent = 0
    }
    else {
        sliceCurrent = currentPage - 3
    }

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        scrollToTop();
    }, []);

    const [timerCount, setTimer] = React.useState(100)
    useEffect(() => {
        const interval = setInterval(() => {
            if (timerCount > 0) {
                setTimer(prevCount => prevCount - 1);
            }
        }, 1); // her milisaniyede bir azalt

        // Temizleme işlemi
        return () => clearInterval(interval);
    }, [timerCount]); // yalnızca bir kez çağırılacak
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login" />;
    } else {

        return (
            <div>
                <div class="float-child">
                    <div>
                        <Dropdown
                            text='Sırala'
                            icon='sort'
                            floating
                            labeled
                            button
                            className='icon'

                        >
                            <DropdownMenu >
                                <DropdownHeader icon='tags' content='Etikete göre sırala' />
                                <DropdownItem>
                                    <Dropdown
                                        text='Artan Azalan'
                                        floating
                                        labeled
                                        button
                                    >
                                        <DropdownMenu>
                                            <DropdownItem icon='sort amount up' onClick={handleSortOderChange} value='asc'>Artan</DropdownItem>
                                            <DropdownItem onClick={handleSortOderChange} value='desc'>Azalan</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </DropdownItem>
                                <DropdownItem onClick={handleByChange} value='name'>İsme göre</DropdownItem>
                                <DropdownItem onClick={handleByChange} value='score'>IMDB Puanına göre</DropdownItem>
                                <DropdownItem onClick={handleByChange} value='year'>Yayınlanma Tarihine göre</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <Filtered catagoryData={catagoryData} setCatagoryData={setCatagoryData} nameData={nameData} setNameData={setNameData}
                        timeData={timeData} setTimeData={setTimeData} countryData={countryData} setCountryData={setCountryData}
                        minscoreData={minscoreData} setMinscoreData={setMinscoreData} maxscoreData={maxscoreData} setMaxscoreData={setMaxscoreData}
                        setTimer={setTimer} directorData={directorData} setDirectorData={setDirectorData} minyearData={minyearData}
                        setMinyearData={setMinyearData} maxyearData={maxyearData} setMaxyearData={setMaxyearData} typeData={typeData}
                        setTypeData={setTypeData} companyData={companyData} setCompanyData={setCompanyData} sortBy={sortBy} sortOrder={sortOrder} currentPage={currentPage} />

                </div>
                {timerCount == 0 ?


                    <div>
                        {records.length != 0 ? (
                            <div>
                                <Row>
                                    {records
                                        .map((movie) => (
                                            <Col
                                                sm={12}
                                                md={6}
                                                lg={4}
                                                xl={3}
                                                key={movie._id}
                                                style={{ width: "160px", height: "250px" }}
                                            >
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                </Row>
                                <div className='pagination-container' style={{ marginTop: "50px" }}>
                                    <ul class="pagination1">
                                        <li >
                                            <a className='prev' style={{ cursor: "pointer", position: "relative" }} onClick={prePage}>Geri</a>

                                        </li>
                                        {
                                            numbers.map((n, i) => (
                                                <li key={i} className={`page-item ${parseInt(currentPage, 10) === n ? 'active' : ''}`}>
                                                    <a style={{ cursor: "pointer", position: "relative" }} onClick={() => changeCPage(n)}>{n}</a>
                                                </li>
                                            )).slice(sliceCurrent, parseInt(currentPage, 10) + 2)
                                        }
                                        <li>
                                            <a className='next' style={{ cursor: "pointer", position: "relative" }} onClick={nextPage}>İleri</a>

                                        </li>
                                    </ul>
                                </div></div>) : (< h3 style={{ color: "rgba(255, 255, 255, 0.5)", display:"flex", justifyContent:"center" }}>Sonuç Bulunamadı</h3>)}

                    </div>
                    : <span class="loader1"></span>}
            </div>
        )
    }
}

export default Categories