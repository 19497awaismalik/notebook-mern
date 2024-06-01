import { apiSlice } from "../api/ApiSlice";


export const noteApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getNote:builder.query({
            query:()=>({
                url:"get-note",
                method:"GET",
                credentials:"include"
            })
        }),
        addNote:builder.mutation({
            query:({title,description,tage})=>({
                url:"add-note",
                method:"POST",
                credentials:"include",
                body:{title,description,tage}
            })
        }),
        updateNote:builder.mutation({
            query:({id,title,description,tage})=>({
                url:`update-note/${id}`,
                method:"PUT",
                credentials:"include",
                body:{title,description,tage}
            })
        }),
        deleteNote:builder.mutation({
            query:({id})=>({
                url:`delete-note/${id}`,
                method:"DELETE",
                credentials:"include"
            })
        })
    })
})

export const {useAddNoteMutation,useDeleteNoteMutation,useGetNoteQuery,useUpdateNoteMutation}=noteApi