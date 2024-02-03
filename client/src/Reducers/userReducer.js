const userReducer = (user = [], action) => {
    switch (action.type) {

        case "GET_USER":
            return action.payload

        case "UPDATE_USER":
            return user.map((item) =>
                item._id === action.payload._id ? action.payload : item
            )
        case "DELETE_USER":
            return user.filter((item) => item._id !== action.payload)
        default:
            return user
    }
}

export default userReducer;