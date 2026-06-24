import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice.js"
import feedReducer from "../utils/feedSlice"
import connectionReducer from "../utils/connectionSlice.js"
import requestReducer from "../utils/requestSlice.js"
const appStore = configureStore({
    reducer : {
        user : UserReducer,
        feed : feedReducer,
        connection : connectionReducer,
        request : requestReducer,
    }
})
export default appStore;