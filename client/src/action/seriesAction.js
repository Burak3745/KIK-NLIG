
import * as axios from '../axios'

import { toast } from 'react-toastify'

export const getSeriesAction = () => async (dispatch) => {
  try {
    const { data } = await axios.getSeries()

    dispatch({ type: "GET_SERIES", payload: data })
  } catch (error) {
    console.log(error)
    toast(error.response.data.msg, {
      position:"top-right",
      autoClose: 5000,
    });
  }
}


  export const createSeriesAction = (seriesData) => async (dispatch) => {
    try {
      const { data } = await axios.createSeries(seriesData)
  
      dispatch({ type: "CREATE_SERIES", payload: data })
    } catch (error) {
      console.log(error)
      toast(error.response.data.msg, {
        position:"top-right",
        autoClose: 5000,
      });
    }
  }

  
    export const updateSeriesAction = (id, updatedSeries) => async (dispatch) => {
      try {
        const { data } = await axios.updateSeries(id, updatedSeries)
    
        dispatch({ type: "UPDATE_SERIES", payload: data })
      } catch (error) {
        console.log(error)
        toast(error.response.data.msg, {
          position:"top-right",
          autoClose: 5000,
        });
      }
    }
    

  export const deleteSeriesAction = (id) => async (dispatch) => {
    try {
      await axios.deleteSeries(id)
  
      dispatch({ type: "DELETE_SERIES", payload: id })
    } catch (error) {
      console.log(error)
      toast(error.response.data.msg, {
        position:"top-right",
        autoClose: 5000,
      });
    }
  }

  export const deleteAllSeriesAction = (id) => async (dispatch) => {
    try {
      await axios.deleteAllSeries(id)
  
      dispatch({ type: "DELETE_ALL_SERIES", payload: id })
    } catch (error) {
      console.log(error)
      toast(error.response.data.msg, {
        position:"top-right",
        autoClose: 5000,
      });
    }
  }

  
  export const getIdSeriesAction = (id) => async (dispatch) => {
    try {
      const { data } = await axios.getIdSeries(id)
  
      dispatch({ type: "GET_ID_SERIES", payload: data })
    } catch (error) {
      console.log(error)
      toast(error.response.data.msg, {
        position:"top-right",
        autoClose: 5000,
      });
    }
  }

  