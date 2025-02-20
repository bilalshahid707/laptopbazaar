import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const reviewsApi = createApi({
    reducerPath:'reviewsApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://127.0.0.1:8000/api/v1/reviews'}),
    tagTypes: ['reviews'],
    endpoints:(build)=>({
        getLaptopReviews:build.query({
            query:(id)=>({
                url:`/${id}`
            }),
            providesTags:['reviews']
        }),
        createReview:build.mutation({
            query:(review)=>({
                url:"/",
                method:'POST',
                body:review,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags:['reviews'],
        })
    })
})

export const { useGetLaptopReviewsQuery,useCreateReviewMutation } = reviewsApi;
export default reviewsApi
