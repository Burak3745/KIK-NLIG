
import * as axios from '../axios'

import { toast } from 'react-toastify'

export const getMovieAction = () => async (dispatch) => {
  try {
    const { data } = await axios.getMovie()

    dispatch({ type: "GET_MOVIE", payload: data })
  } catch (error) {
    console.log(error)
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
}

export const getUserAction = () => async (dispatch) => {
  try {
    const { data } = await axios.UserGet()

    dispatch({ type: "GET_USER", payload: data })
  } catch (error) {
    console.log(error)
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
}

export const createMovieAction = (movieData) => async (dispatch) => {
  try {
    const { data } = await axios.createMovie(movieData)

    dispatch({ type: "CREATE_MOVIE", payload: data })
  } catch (error) {
    console.log(error)
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
}


export const updateMovieAction = (id, updatedMovie) => async (dispatch) => {
  try {
    const { data } = await axios.updateMovie(id, updatedMovie)

    dispatch({ type: "UPDATE_MOVIE", payload: data })
  } catch (error) {
    console.log(error)
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
}


export const likeMovieAction = (id, userid) => async (dispatch) => {
  try {
    const { data } = await axios.likeMovie(id, userid)

    dispatch({ type: "UPDATE_LIKE_MOVIE", payload: data })
  } catch (error) {
    console.log(error)
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
}

export const unlikeMovieAction = (id, userid) => async (dispatch) => {
  try {
    const { data } = await axios.unlikeMovie(id, userid)

    dispatch({ type: "UPDATE_LIKE_MOVIE", payload: data })
  } catch (error) {
    console.log(error)
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
}

export const dislikeMovieAction = (id, userid) => async (dispatch) => {
  try {
    const { data } = await axios.dislikeMovie(id, userid)

    dispatch({ type: "UPDATE_DISLIKE_MOVIE", payload: data })
  } catch (error) {
    console.log(error)
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
}

export const undislikeMovieAction = (id, userid) => async (dispatch) => {
  try {
    const { data } = await axios.undislikeMovie(id, userid)

    dispatch({ type: "UPDATE_DISLIKE_MOVIE", payload: data })
  } catch (error) {
    console.log(error)
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
}

export const updateUserAction = (id, updatedUser) => async (dispatch) => {
  try {
    const { data } = await axios.UserUpdate(id, updatedUser)

    dispatch({ type: "UPDATE_USER", payload: data })
  } catch (error) {
    console.log(error)
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
}

export const deleteMovieAction = (id) => async (dispatch) => {
  try {
    await axios.deleteMovie(id)

    dispatch({ type: "DELETE_MOVIE", payload: id })
  } catch (error) {
    console.log(error)
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
}

export const deleteUserAction = (id) => async (dispatch) => {
  try {
    await axios.deleteUser(id)

    dispatch({ type: "DELETE_MOVIE", payload: id })
  } catch (error) {
    console.log(error)
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
}


export const getIdMovieAction = (id) => async (dispatch) => {
  try {
    const { data } = await axios.getIdMovie(id)

    dispatch({ type: "GET_ID_MOVIE", payload: data })
  } catch (error) {
    console.log(error)
    toast(error.response.data.msg, {
      position: "top-right",
      autoClose: 5000,
    });
  }
}

