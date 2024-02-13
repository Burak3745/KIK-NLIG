import React, { useEffect, useState } from 'react'
import '../css/Players.css'
import { useDispatch, useSelector } from 'react-redux';
import { getActorsAction } from '../action/actorsAction';
import { Col, Row } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate } from 'react-router';
const Players = () => {
    const actors = useSelector(state => state.actors)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!actors[0]) {
            dispatch(getActorsAction());
        }
    }, [dispatch]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 48;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = actors.sort((a, b) => a.name.localeCompare(b.name))
        .slice(firstIndex, lastIndex);


    const npage = Math.ceil(actors.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    useEffect(() => {
        // URL'den sayfa parametresini al
        const pageFromUrl = searchParams.get('page');

        // Eğer sayfa parametresi varsa ve şu anki sayfa farklıysa güncelle
        if (pageFromUrl && pageFromUrl !== currentPage) {
            setCurrentPage(pageFromUrl);
        }
    }, [currentPage])

    function prePage() {
        if (currentPage == 1) { }
        else {
            const value = currentPage - 1
            const params = new URLSearchParams(window.location.search);
            params.set("page", value);

            navigate(`/oyuncular?${params.toString()}`);
            window.location.reload()
        }
    }
    function changeCPage(id) {
        if (parseInt(currentPage, 10) == id) {

        }
        else {
            const value = id
            const params = new URLSearchParams(window.location.search);
            params.set("page", value);

            navigate(`/oyuncular?${params.toString()}`);
            window.location.reload()
        }
    }

    function nextPage() {
        if (currentPage >= npage) {
        }
        else {
            const value = parseInt(currentPage, 10) + 1
            const params = new URLSearchParams(window.location.search);
            params.set("page", value);

            navigate(`/oyuncular?${params.toString()}`);
            window.location.reload()

        }
    }
    

    

    const [timerCount, setTimer] = React.useState(300)
    useEffect(() => {
        const interval = setInterval(() => {
            if (timerCount > 0) {
                setTimer(prevCount => prevCount - 1);
            }
        }, 1); // her milisaniyede bir azalt

        // Temizleme işlemi
        return () => clearInterval(interval);
    }, [timerCount]); // yalnızca bir kez çağırılacak

    let sliceCurrent = 0
    if (currentPage == 2 || currentPage == 1) {
        sliceCurrent = 0
    }
    else {
        sliceCurrent = currentPage - 3
    }
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login" />;
    } else {

        return (
            <div>
                {timerCount == 0 ?
                    <div>

                        <Row>
                            {records
                                .map((item) => (
                                    <Col
                                        sm={12}
                                        md={6}
                                        lg={4}
                                        xl={3}
                                        key={item._id}
                                        style={{ width: "160px", height: "250px" }}
                                    >
                                        <div class="players-container" onClick={() => navigate(`/actors/${item._id}`)}>
                                            <div class="players-item">
                                                <div class="players-card">
                                                    <div class="players-circle circle2"></div>
                                                    <div class="players-circle circle1"></div>
                                                    <img class="players-img" src={item.image} />
                                                </div>

                                                <div class="players-content">

                                                    <p>{item.name}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </Col>
                                ))}
                        </Row>
                        <div className='pagination-container' style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "70px" }}>
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
                        </div>
                    </div> : <span class="loader"></span>}
            </div>
        )
    }
}

export default Players