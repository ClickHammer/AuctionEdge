import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/UserSlice.js";
import commissionReducer from "./slices/commissionSlice.js"
import auctionReducer from "./slices/auctionSlice.js"
import bidReducer from "./slices/bidSlice.js"
import superAdminSlice from "./slices/superAdminSlice.js"
export const store=configureStore({
    reducer:{
        user:userReducer,
        commission :commissionReducer,
        auction :auctionReducer,
        bid: bidReducer,
        superAdmin:superAdminSlice

    }
})