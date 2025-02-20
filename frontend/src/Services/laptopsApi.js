import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const laptopsApi = createApi({
    reducerPath:"laptopsApi",
    baseQuery:fetchBaseQuery({baseUrl:'http://127.0.0.1:8000/api/v1/laptops'}),
    endpoints:(build)=>({
        getLaptops:build.query({
            query:(query)=>({url:`/${query?query:' '}`})
        }),
        getStats:build.query({
            query:()=>({url:`/get-stats`})
        }),
        getLaptop:build.query({
            query:(id)=>({url:`/${id}`})
        })
   
    })
})

export const {useGetLaptopsQuery,useGetStatsQuery,useGetLaptopQuery} = laptopsApi
export default laptopsApi