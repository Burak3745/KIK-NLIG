import * as axios from '../axios'

import { toast } from 'react-toastify'
import toast1 from "react-hot-toast";
export const getUserAction = () => async (dispatch) => {
  try {
    const { data } = await axios.UserGet()

    dispatch({ type: "GET_USER", payload: data })
  } catch (error) {
    console.log(error)
    toast1.error(error.response.data.message);
  }
}

export const updateUserAction = (id, updatedUser) => async (dispatch) => {
  try {
    const { data } = await axios.UserUpdate(id, updatedUser)

    dispatch({ type: "UPDATE_USER", payload: data })
  } catch (error) {
    console.log(error)
    toast1.error(error.response.data.message);
  }
}

export const deleteUserAction = (id) => async (dispatch) => {
  try {
    await axios.deleteUser(id)

    dispatch({ type: "DELETE_USER", payload: id })
  } catch (error) {
    console.log(error)
    toast1.error(error.response.data.message);
  }
}

export const signupAction = (formData, navigate, setUser) => async (dispatch) => {
  try {
    const { data } = await axios.Signup(formData)
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    dispatch({ type: "AUTH", payload: data })

    navigate("/")
  } catch (error) {
    console.log(error)
    toast1.error(error.response.data.message);
  }
}

export const signinActions = (formData, navigate, setUser) => async (dispatch) => {
  try {
    const { data } = await axios.Login(formData)
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    dispatch({ type: "AUTH", payload: data })

    navigate("/")
  } catch (error) {
    toast1.error(error.response.data.message);
  }
}

export const logoutActions = (id) => async (dispatch) => {
  try {
    const { message } = await axios.logOut(id)

    dispatch({ type: "LOGOUT", payload: message })
  } catch (error) {
    toast1.error(error.response.data.message);
  }
}

export const getAccessTokenActions = (id, user) => async (dispatch) => {
  try {
    const { data } = await axios.refreshAccessToken(id)
    const data1 = { user: user, accessToken: data }
    
    localStorage.setItem('user', JSON.stringify(data1))
    dispatch({ type: "REFRESH_ACCESS_TOKEN_SUCCESS", payload: data1 })
  } catch (error) {
    toast1.error(error.response.data.message);
  }
}