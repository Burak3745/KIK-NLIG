import React from 'react'
import '../css/SeriesCard.css'
import { FaImdb } from "react-icons/fa";
const SeriesCard = ({ movie }) => {
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
                    <div className='my-2' style={{
                        background: "#b00000", borderRadius: "7px", color: "white",
                        width: "130px", display: "flex", justifyContent: "center", 
                        alignItems: "center", fontWeight: "bold", textAlign:"center"
                    }}>
                        <h5 className='my-1 mx-2'>{movie.country}</h5>
                    </div>
                    <div className='my-2' style={{
                        background: "#603300", borderRadius: "7px", color: "white",
                        width: "130px", display: "flex", justifyContent: "center", 
                        alignItems: "center", fontWeight: "bold", textAlign:"center"
                    }}>
                        < h5 className='my-1 mx-2'>{movie.catagory}</h5>
                    </div>
                    <div className='my-2' style={{
                        background: "#3000ce", borderRadius: "7px", color: "white",
                        width: "130px", display: "flex", justifyContent: "center", 
                        alignItems: "center", fontWeight: "bold", textAlign:"center"
                    }}>
                        < h5 className='my-1'>{movie.director}</h5>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default SeriesCard