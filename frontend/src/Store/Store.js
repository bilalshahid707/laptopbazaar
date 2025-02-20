import { configureStore } from "@reduxjs/toolkit";
import { laptopsApi } from "../Services/laptopsApi";
import { reviewsApi } from "../Services/reviewsApi";
import { suppliersApi} from "../Services/suppliersApi"

export const Store = configureStore({
    reducer:{
        [laptopsApi.reducerPath]:laptopsApi.reducer,
        [reviewsApi.reducerPath]:reviewsApi.reducer,
        [suppliersApi.reducerPath]:suppliersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(laptopsApi.middleware,reviewsApi.middleware,suppliersApi.middleware),
})

export default Store