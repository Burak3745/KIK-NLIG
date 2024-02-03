import movieReducer from './Reducers/movieReducer';
import seriesReducer from './Reducers/seriesReducer';
import postReducer from './Reducers/postReducer';
import actorsReducer from './Reducers/actorsReducer'
import userReducer from './Reducers/userReducer'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    movie: movieReducer,
    series: seriesReducer,
    posts: postReducer,
    actors: actorsReducer,
    users: userReducer,
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;