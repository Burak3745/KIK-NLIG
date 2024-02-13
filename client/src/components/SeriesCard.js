import React from 'react'
import '../css/SeriesCard.css'
import { FaImdb } from "react-icons/fa";
import { useNavigate } from 'react-router';
const SeriesCard = ({ movie }) => {
    const navigate = useNavigate()
    const countryArray = movie && movie.country.split(',').map(item => item.trim());
    const catagoryArray = movie && movie.catagory.split(',').map(item => item.trim());
    const handleClickCountry = (country) => {
        const params = new URLSearchParams(window.location.search);
        params.set("country", country);
        navigate(`/kategoriler?${params.toString()}`);
    };
    const handleClickCatagory = (catagory) => {
        const params = new URLSearchParams(window.location.search);
        params.set("catagory", catagory);
        navigate(`/kategoriler?${params.toString()}`);
    }
    const handleClickCompany = (company) => {
        const params = new URLSearchParams(window.location.search);
        params.set("company", company);
        navigate(`/kategoriler?${params.toString()}`);
    }
    const handleClickDirector = (director) => {
        const params = new URLSearchParams(window.location.search);
        params.set("director", director);
        navigate(`/kategoriler?${params.toString()}`);
    }
    return (
        <div class='cardd'>
            <div class='imgbx' style={{ backgroundImage: `url(${movie.image})` }}> </div>
            <div class='content'>
                <span class='price'>
                    <a >
                        <FaImdb size={20} className='mx-1' color='rgba(245, 197, 24)' />
                        {movie.score}</a>
                </span>
                <ul >

                    <h3 className='my-2' style={{ fontWeight: "bold" }}>{movie.name}</h3>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {countryArray.map((item) => (
                            <div className='country-click my-2' style={{
                                borderRadius: "7px", color: "white",
                                width: "100px", display: "flex", justifyContent: "center",
                                alignItems: "center", fontWeight: "bold", textAlign: "center",
                                marginRight: "10px"
                            }} onClick={(e) => handleClickCountry(item)}>
                                <h5 className='my-1 mx-2' style={{ fontSize: "13px" }}>{item}</h5>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {catagoryArray.map((item) => (
                            <div className='catagory-click my-2' style={{
                                borderRadius: "7px", color: "white",
                                width: "100px", display: "flex", justifyContent: "center",
                                alignItems: "center", fontWeight: "bold", textAlign: "center",
                                marginRight: "10px"
                            }} onClick={(e) => handleClickCatagory(item)}>
                                < h5 className='my-1 mx-2' style={{ fontSize: "13px" }}>{item}</h5>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className='company-click my-2' style={{
                            borderRadius: "7px", color: "white",
                            width: "100px", display: "flex", justifyContent: "center",
                            alignItems: "center", fontWeight: "bold", textAlign: "center"
                        }} onClick={(e) => handleClickCompany(movie.company)}>
                            < h5 className='my-1' style={{ fontSize: "13px" }}>{movie.company}</h5>
                        </div>

                        <div className='director-click my-2' style={{
                            borderRadius: "7px", color: "white",
                            width: "100px", display: "flex", justifyContent: "center",
                            alignItems: "center", textAlign: "center"
                        }} onClick={(e) => handleClickDirector(movie.director)}>
                            < h5 className='my-1' style={{ fontSize: "13px" }}>{movie.director}</h5>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default SeriesCard