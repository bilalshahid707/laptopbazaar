import { configureStore } from "@reduxjs/toolkit";
import { laptopsApi } from "../Services/laptopsApi";
import { reviewsApi } from "../Services/reviewsApi";

export const Store = configureStore({
    reducer:{
        [laptopsApi.reducerPath]:laptopsApi.reducer,
        [reviewsApi.reducerPath]:reviewsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(laptopsApi.middleware,reviewsApi.middleware),
})

export default Store