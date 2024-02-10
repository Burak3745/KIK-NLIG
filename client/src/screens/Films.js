import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard1'
import { Col, Row } from 'react-bootstrap'
import { getMovieAction } from '../action/movieAction'
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  DropdownHeader,
  Dropdown,
} from 'semantic-ui-react'
import '../css/Films.css'
const Films = () => {
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
    return movie.sort((a, b) => {
      let comparison = 0;
      if (a[sortBy] > b[sortBy]) {
        comparison = 1;
      } else if (a[sortBy] < b[sortBy]) {
        comparison = -1;
      }
      return sortOrder === 'desc' ? comparison * -1 : comparison;
    });
  };

  const handleSortOderChange = (e, { value }) => {
    const params = new URLSearchParams(window.location.search);
    params.set("siralamaturu", value);
    params.set("page", 1);
    setTimer(300)
    navigate(`/filmler?${params.toString()}`);
    setCurrentPage(1)
  };

  const handleByChange = (e, { value }) => {
    const params = new URLSearchParams(window.location.search);
    params.set("siralamatipi", value);
    params.set("page", 1);
    setTimer(300)
    navigate(`/filmler?${params.toString()}`);
    setCurrentPage(1)
  };




  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 48;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = sortMovies(sortBy, sortOrder).filter((item2) => {
    if (item2.type === 'Film') {
      return item2
    }
    else {
      return
    }
  }).slice(firstIndex, lastIndex);


  const npage = Math.ceil(movie.filter((item) => item.type == "Film").length / recordsPerPage)
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

      navigate(`/filmler?${params.toString()}`);
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

      navigate(`/filmler?${params.toString()}`);
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

      navigate(`/filmler?${params.toString()}`);
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


  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  } else {

    return (
      <div>
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
              <DropdownItem onClick={handleByChange} value='time'>Süresine göre</DropdownItem>
              <DropdownItem onClick={handleByChange} value='views'>İzlenme sayısına göre</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        {timerCount == 0 ?
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
          </div>
          : <span class="loader"></span>}
      </div>
    )
  }
}

export default Films

/*

const catagory = searchParams.get('catagory');

  const handleChangeCatagory = (e) => {
    const { value } = e.target;

    const params = new URLSearchParams(window.location.search);
    params.set("catagory", value);
    params.set("page", 1)
    navigate(`/filmler?${params.toString()}`);
    window.location.reload()
  };



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




      .filter(item => {
    if (catagory === '' || catagory === null) return item
    else
      return catagory && item.catagory.toLowerCase().includes(catagory.toLowerCase())
  })
*/