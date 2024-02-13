import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard1'
import { Button, Col, Row } from 'react-bootstrap'
import { getMovieAction } from '../action/movieAction'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { useLocation } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import '../css/Films.css'
import { Dropdown, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Filtered from '../components/Filtered'
const FilmDiziSearch = () => {
  const movie = useSelector(state => state.movie)
  const dispatch = useDispatch();

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
  const useWindowWide = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth);
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [setWidth]);

    return width;
  };
  const kutuCount = Math.round(useWindowWide() / 300);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: kutuCount,
      slidesToSlide: kutuCount // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: kutuCount,
      slidesToSlide: kutuCount // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: kutuCount,
      slidesToSlide: kutuCount // optional, default to 1.
    }

  };

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

  const filteredMovies = () => {
    return (filteredOther().filter((item) => {
      if (item.type === "Film") { return item }
      else {
        return
      }
    })
    )
  };


  const filteredSeries = () => {
    return (filteredOther().filter((item) => {
      if (item.type === "Dizi") { return item }
      else {
        return
      }
    })
    )
  };





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
  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  } else {

    return (
      <div>
        <div class="float-child">

          <Filtered catagoryData={catagoryData} setCatagoryData={setCatagoryData} nameData={nameData} setNameData={setNameData}
            timeData={timeData} setTimeData={setTimeData} countryData={countryData} setCountryData={setCountryData}
            minscoreData={minscoreData} setMinscoreData={setMinscoreData} maxscoreData={maxscoreData} setMaxscoreData={setMaxscoreData}
            setTimer={setTimer} directorData={directorData} setDirectorData={setDirectorData} minyearData={minyearData}
            setMinyearData={setMinyearData} maxyearData={maxyearData} setMaxyearData={setMaxyearData} 
            typeData={typeData} setTypeData={setTypeData} companyData={companyData} setCompanyData={setCompanyData}/>

        </div>
        {timerCount == 0 ?
          <div>
            <h2 className='text-white'>Film</h2>
            {filteredMovies().length === 0 ? (<h3 style={{ color: "rgba(255, 255, 255, 0.5)" }}>Film Bulunamadı</h3>) : (
              <Carousel
                responsive={responsive}
              >
                {filteredMovies()
                  .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                  .map((movie) => (
                    <MovieCard movie={movie} />
                  ))}
              </Carousel>
            )}

            <h2 className='text-white'>Dizi</h2>
            {filteredSeries().length === 0 ? (< h3 style={{ color: "rgba(255, 255, 255, 0.5)" }}>Dizi Bulunamadı</h3>) : (
              <Carousel
                responsive={responsive}
              >
                {filteredSeries()
                  .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                  .map((movie) => (
                    <MovieCard movie={movie} />
                  ))}
              </Carousel>

            )}
          </div> : <span class="loader1"></span>}
      </div>
    )
  }
}

export default FilmDiziSearch