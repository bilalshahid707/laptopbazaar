import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const suppliersApi = createApi({
    reducerPath:'suppliersApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://127.0.0.1:8000/api/v1/suppliers'}),
    endpoints:(build)=>({
        getSupplier:build.query({
            query:(slug)=>({
                url:`/${slug}`
            })
        }),
        getSupplierLaptops:build.query({
            query:(slug)=>({
                url:`/${slug}/all-laptops`
            })
        }),
    })
})

export const {useGetSupplierQuery,useGetSupplierLaptopsQuery} = suppliersApi
export default suppliersApi