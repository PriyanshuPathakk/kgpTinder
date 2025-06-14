import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice.js"
const appStore = configureStore({
    reducer : {
        User : UserReducer
    }
})
export default appStore;