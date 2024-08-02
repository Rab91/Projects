import {configureStore,combineReducers}from "@reduxjs/toolkit"
import authReducers from "./slices/authSlice"
import patientReducers from "./slices/patientSlice"

const rootReducer = combineReducers({
    authReducers,patientReducers
})
const store = configureStore({
    reducer:rootReducer
});

export default store;