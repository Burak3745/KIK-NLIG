import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard1'
import { Col, Row } from 'react-bootstrap'
import { getMovieAction } from '../action/movieAction'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import '../css/Films.css'
const Series = () => {
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
  const catagory = searchParams.get('catagory');

  const handleChangeCatagory = (e) => {
    const { value } = e.target;

    const params = new URLSearchParams(window.location.search);
    params.set("catagory", value);
    params.set("page", 1)
    navigate(`/diziler?${params.toString()}`);
    window.location.reload()
  };

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 48;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = movie.filter((item2) => {
    if (item2.type === 'Dizi') {
      return item2
    }
    else {
      return
    }
  }).filter(item => {
    if (catagory === '' || catagory === null) return item
    else
      return catagory && item.catagory.toLowerCase().includes(catagory.toLowerCase())
  }).slice(firstIndex, lastIndex);


  const npage = Math.ceil(movie.filter((item) => item.type == "Dizi").filter(item => {
    if (catagory === '' || catagory === null) return item
    else
      return catagory && item.catagory.toLowerCase().includes(catagory.toLowerCase())
  }).length / recordsPerPage)
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

      navigate(`/diziler?${params.toString()}`);
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

      navigate(`/diziler?${params.toString()}`);
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

      navigate(`/diziler?${params.toString()}`);
      window.location.reload()

    }
  }
  let sliceCurrent = 0
  if (currentPage == 2 || currentPage == 1) {
    sliceCurrent = 0
  }
  else {
    sliceCurrent = currentPage - 3
  }

  return (
    <div>
      <div class="select-dropdown  mx-3">
        <select value={catagory} onChange={handleChangeCatagory}>
          <option value=''>All</option>
          <option value="Action & Advanture">Action & Advanture</option>
          <option value="Animation">Animation</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Documentary">Documentary</option>
          <option value="Drama">Drama</option>
          <option value="Family">Family</option>
          <option value="Kids">Kids</option>
          <option value="Mystery">Mystery</option>
          <option value="News">News</option>
          <option value="Reality">Reality</option>
          <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
          <option value="Soap">Soap</option>
          <option value="Talk">Talk</option>
          <option value="War & Politics">War & Politics</option>
          <option value="Western">Western</option>
        </select>
      </div>
      <Row>
        {records.map((movie) => (
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "100px" }}>
        <ul className='pagination'>
          <li className='page-item '>
            <a style={{ cursor: "pointer" }} className='page-link' onClick={prePage}>Prev</a>

          </li>
          {
            numbers.map((n, i) => (
              <li className={`page-item ${parseInt(currentPage, 10) === n ? 'active' : ''}`} key={i}>
                <a style={{ cursor: "pointer" }} className='page-link' onClick={() => changeCPage(n)}>{n}</a>
              </li>
            )).slice(sliceCurrent, parseInt(currentPage, 10) + 2)
          }
          <li className='page-item'>
            <a style={{ cursor: "pointer" }} className='page-link' onClick={nextPage}>Next</a>

          </li>
        </ul>
      </div>

    </div>
  )
}

export default Series