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

        case "AUTH":

            return [...user, action.payload]

        case "SIGNUP_FAIL":
            return { error: action.payload }

        case "LOGOUT":
            return [...user, null]

        case "REFRESH_ACCESS_TOKEN_SUCCESS":
            return [...user, action.payload];

        default:
            return user
    }
}

export default userReducer;