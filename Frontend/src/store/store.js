import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/UserSlice.js";
import commissionReducer from "./slices/commissionSlice.js"
export const store=configureStore({
    reducer:{
        user:userReducer,
        commission :commissionReducer

    }
})