import userReducer  from './userReducer'
import houseReducer from './houseReducer'
const {combineReducers} = require('redux')

const rootReducer = combineReducers({
    userRed: userReducer,
    houseRed: houseReducer
})


export default rootReducer