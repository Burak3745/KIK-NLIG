import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard1'
import { Button, Col, Row } from 'react-bootstrap'
import { getMovieAction } from '../action/movieAction'
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { useLocation } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import '../css/Films.css'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
const FilmDiziSearch = () => {
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
  
  const [catagoryData, setCatagoryData] = useState([])

  const time = 2 //örnek için yaptım. Butondan değiştirebilirsin
  const handleDropdownChange = (event, data) => {
    const selectedValues = data.value;
    setCatagoryData(selectedValues);
  };
  const search = searchParams.get('name');
  const catagory = searchParams.get('catagory');
  const catagoryArray = catagory && catagory.split(',').map(item => item.trim());
  const handleChangeCatagory = (data,time) => {
    const value = data
    const params1 = new URLSearchParams(window.location.search);
    params1.set("catagory", value);
    params1.set("time", time);
    navigate(`/search?${params1.toString()}`);
  };
  
  const countryOptions = [
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
  return (
    <div>

      <Dropdown

        placeholder='All'
        fluid
        multiple
        selection
        options={countryOptions}
        value={catagoryData}
        onChange={handleDropdownChange}
      />
      <button style={{position:"relative", cursor:"pointer"}} onClick={() =>handleChangeCatagory(catagoryData,time)}>TIKLA</button>
      <h2 className='text-white'>Film</h2>
      {movie.filter((item) => {
        if (item.type === "Film") { return item }
        else {
          return
        }
      })
        .filter((item) => {
          if (search == null) { return item }
          else {
            return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())
          }
        })
        .filter(item => {
          if (catagory === '' || catagory === null) return item;
          else {
            const selectedCategories = catagory.split(',').map(category => category.trim().toLowerCase());
            return selectedCategories.some(selectedCategory => item.catagory.toLowerCase().includes(selectedCategory));
          }
        }).length === 0 ? (<h3 style={{color:"rgba(255, 255, 255, 0.5)"}}>Film Bulunamadı</h3>) : (
        <Carousel
          responsive={responsive}
        >
          {movie.filter((item) => {
            if (item.type === "Film") { return item }
            else {
              return
            }
          })
            .filter((item) => {
              if (search == null) { return item }
              else {
                return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())
              }
            })
            .filter(item => {
              if (catagory === '' || catagory === null) return item;
              else {
                const selectedCategories = catagory.split(',').map(category => category.trim().toLowerCase());
                return selectedCategories.some(selectedCategory => item.catagory.toLowerCase().includes(selectedCategory));
              }
            })
            .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            .map((movie) => (
              <MovieCard movie={movie} />
            ))}
        </Carousel>
      )}

      <h2 className='text-white'>Dizi</h2>
      {movie.filter((item) => {
        if (item.type === "Dizi") { return item }
        else {
          return
        }
      })
        .filter((item) => {
          if (search == null) { return item }
          else {
            return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())
          }
        })
        .filter(item => {
          if (catagory === '' || catagory === null) return item;
          else {
            const selectedCategories = catagory.split(',').map(category => category.trim().toLowerCase());
            return selectedCategories.some(selectedCategory => item.catagory.toLowerCase().includes(selectedCategory));
          }
        }).length === 0 ? (< h3 style={{color:"rgba(255, 255, 255, 0.5)"}}>Dizi Bulunamadı</h3>) : (
        <Carousel
          responsive={responsive}
        >
          {movie.filter((item) => {
            if (item.type === "Dizi") { return item }
            else {
              return
            }
          })
            .filter((item) => {
              if (search == null) { return item }
              else {
                return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())
              }
            })
            .filter(item => {
              if (catagory === '' || catagory === null) return item;
              else {
                const selectedCategories = catagory.split(',').map(category => category.trim().toLowerCase());
                return selectedCategories.some(selectedCategory => item.catagory.toLowerCase().includes(selectedCategory));
              }
            })
            .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            .map((movie) => (
              <MovieCard movie={movie} />
            ))}
        </Carousel>

      )}



    </div>
  )
}

export default FilmDiziSearch