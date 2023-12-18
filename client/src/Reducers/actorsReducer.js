

const actorsReducer = (actors = [], action) => {
    switch (action.type) {
      case "GET_ACTORS":
        return action.payload
  
      case "GET_ID_ACTORS":
        return actors.filter((item) => item._id !== action.payload._id)
  
      case "CREATE_ACTORS":
        return [...actors, action.payload]
  
      case "UPDATE_ACTORS":
        return actors.map((item) =>
          item._id === action.payload._id ? action.payload : item
        )

      case "DELETE_ACTORS":
        return actors.filter((item) => item._id !== action.payload)
  
  
      default:
        return actors
    }
  }
  
  export default actorsReducer;