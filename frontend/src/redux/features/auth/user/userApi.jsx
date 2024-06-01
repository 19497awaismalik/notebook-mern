import {apiSlice} from '../../api/ApiSlice'


export const userApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        updateAvatar:builder.mutation({
            query:({avatar})=>({
                url:"update-avatar",
                method:"PUT",
                credentials:"include",
                body:{avatar}
            })
        }),
        editProfile:builder.mutation({
            query:({name})=>({
                url:"update-user-info",
                method:"PUT",
                credentials:"include",
                body:{name}
            })
        }),
        updatePassword:builder.mutation({
            query:({oldpassword,newpassword})=>({
                url:"update-user-password",
                method:"PUT",
                credentials:"include",
                body:{oldpassword,newpassword}
            })
        })
    })
})

export const {useEditProfileMutation,useUpdateAvatarMutation,useUpdatePasswordMutation}=userApi