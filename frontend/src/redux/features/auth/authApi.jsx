import { apiSlice } from "../api/ApiSlice";
import {userLogOut, userLoggedIn} from './authSlice'

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: ({ name, email, password }) => ({
                url: "register",
                method: "POST",
                credentials: "include",
                body: {
                    name, email, password
                }
            })
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "login",
                method: "POST",
                credentials: "include",
                body: { email, password}
            }),
          async onQueryStarted(arg,{queryFulfilled,dispatch}){
            let result=await queryFulfilled;
             dispatch(
                userLoggedIn({
                    token:result.data.token,
                    user:result.data.user
                })
             )
               
          }
        }),
       logout:builder.query({
          query:()=>({
            url:"logout",
            method:"GET",
            credentials:"include"
          }),
          async onQueryStarted(arg,{queryFulfilled,dispatch}){
            try {
              let result=await queryFulfilled;
                dispatch(userLogOut());
            } catch (error) {
              console.log(error)
            }
          }
       }),
        loadUser:builder.query({
           query:()=>({
            url:"me",
            method:"GET",
            credentials:"include",

           }),
           async onQueryStarted(arg,{queryFulfilled,dispatch}){
            try {
              const result=await queryFulfilled;
              dispatch(
                  userLoggedIn({
                      token:result.data.user.accessToken,
                      user:result.data.user
                  })
              )
            } catch (error) {
              console.log(error);
            }
          } 
        })
    }),
    

})

export const { useRegisterMutation, useLoginMutation, useLogoutQuery,useLoadUserQuery} = authApi