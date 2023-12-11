import React from 'react'
import { useParams } from 'react-router';
import UpdateMovie from './UpdateMovie';

const UpdateMovieScreen = ({user,setUser}) => {
    const {id} = useParams();
  return (
    <div><UpdateMovie id={id} user={user} setUser={setUser}/></div>
  )
}

export default UpdateMovieScreen