import * as axios from '../axios'

import { toast } from 'react-toastify'

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

  export const deleteUserAction = (id) => async (dispatch) => {
    try {
      await axios.deleteUser(id)
  
      dispatch({ type: "DELETE_USER", payload: id })
    } catch (error) {
      console.log(error)
      toast(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }