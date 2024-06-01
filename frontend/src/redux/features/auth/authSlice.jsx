import { createSlice } from "@reduxjs/toolkit";



export const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:"",
        token:"",
    },
    reducers:{
        userLoggedIn:(state,action)=>{
            state.user=action.payload.user,
            state.token=action.payload.token
        },
        userLogOut:(state)=>{
            state.user="",
            state.token=""
            
        }
        
    },
})
export const {userLoggedIn,userLogOut}=authSlice.actions