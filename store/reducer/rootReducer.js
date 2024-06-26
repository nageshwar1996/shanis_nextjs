import { combineReducers } from "redux";
// 

// reducers
import authReducer from './authReducer'
import dashboardReducer from "./dashboardReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
})

export default rootReducer