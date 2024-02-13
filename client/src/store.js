import movieReducer from './Reducers/movieReducer';
import seriesReducer from './Reducers/seriesReducer';
import actorsReducer from './Reducers/actorsReducer'
import userReducer from './Reducers/userReducer'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    movie: movieReducer,
    series: seriesReducer,
    actors: actorsReducer,
    users: userReducer,
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;