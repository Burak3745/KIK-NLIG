import * as axios from '../axios'

import { toast } from 'react-toastify'

export const getActorsAction = () => async (dispatch) => {
    try {
        const { data } = await axios.getActors()

        dispatch({ type: "GET_ACTORS", payload: data })
    } catch (error) {
        console.log(error)
        toast(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
        });
    }
}

export const createActorsAction = (movieData) => async (dispatch) => {
    try {
        const { data } = await axios.createActors(movieData)

        dispatch({ type: "CREATE_ACTORS", payload: data })
    } catch (error) {
        console.log(error)
        toast(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
        });
    }
}


export const updateActorsAction = (id, updatedMovie) => async (dispatch) => {
    try {
        const { data } = await axios.updateActors(id, updatedMovie)

        dispatch({ type: "UPDATE_ACTORS", payload: data })
    } catch (error) {
        console.log(error)
        toast(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
        });
    }
}

export const deleteActorsAction = (id) => async (dispatch) => {
    try {
        await axios.deleteActors(id)

        dispatch({ type: "DELETE_ACTORS", payload: id })
    } catch (error) {
        console.log(error)
        toast(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
        });
    }
}

export const getIdActorsAction = (id) => async (dispatch) => {
    try {
        const { data } = await axios.getIdActors(id)

        dispatch({ type: "GET_ID_ACTORS", payload: data })
    } catch (error) {
        console.log(error)
        toast(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
        });
    }
}
