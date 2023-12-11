const postReducer = (posts = [], action) => {
  switch (action.type) {
    case "GET_POST":
      return action.payload

    case "GET_POST_BYID":
      return posts.filter((item) => item._id !== action.payload)
      
    case "CREATE_POST":
      return [...posts, action.payload]

    case "UPDATE_POST":
      return posts.map((item) =>
        item._id === action.payload._id ? action.payload : item
      )
    
    case "DELETE_POST":
      return posts.filter((item) => item._id !== action.payload)
    
    case "DELETE_ALL_SERIES":
      
    default:
      return posts
  }
}

export default postReducer;