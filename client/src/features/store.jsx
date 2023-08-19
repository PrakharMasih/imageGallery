import { configureStore } from "@reduxjs/toolkit";
import photoSlice from "./photos/photoSlice";

const store = configureStore({
    reducer:{
        photos: photoSlice
    }
})

export default store;