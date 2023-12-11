
const movieReducer = (series = [], action) => {
    switch (action.type) {
      case "GET_SERIES":
        return action.payload
  
  
      case "GET_ID_SERIES":
        return series.filter((item) => item._id !== action.payload)
        
      case "CREATE_SERIES":
        return [...series, action.payload]
  
      case "UPDATE_SERIES":
        return series.map((item) =>
          item._id === action.payload._id ? action.payload : item
        )
  
      case "DELETE_SERIES":
        return series.filter((item) => item._id !== action.payload)
  
      default:
        return series
    }
  }
  
  export default movieReducer;