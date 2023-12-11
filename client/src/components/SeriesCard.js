import React from 'react'
import '../css/SeriesCard.css'
import { FaImdb } from "react-icons/fa";
const SeriesCard = ({movie}) => {
    return (
        <div class='cardd'>
            <div class='imgbx' style={{backgroundImage: `url(${movie.image})`}}> </div>
            <div class='content'>
                <span class='price'>
                <a >
                    <FaImdb size={20} className='mx-1' color='rgba(245, 197, 24)'/>
                    {movie.score}</a>
                </span>
                <ul>
                    <li>{movie.name}</li>
                    <li>{movie.description}</li>
                </ul>
            </div>
        </div>
    )
}

export default SeriesCard