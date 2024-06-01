import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/ApiSlice";
import { authSlice } from "./features/auth/authSlice";


export const Store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authSlice.reducer
    },
    middleware:(getDefualtMiddleware)=>getDefualtMiddleware().concat(apiSlice.middleware)
})
const initializeApp=async()=>{
await Store.dispatch(apiSlice.endpoints.loadUser.initiate({},{forceRefetch:true}))
}


initializeApp();