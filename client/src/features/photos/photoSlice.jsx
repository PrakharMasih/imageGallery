import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPhotos = createAsyncThunk(
    'photos/getPhotos',
    async () => {
        const response = await fetch('http://localhost:8000/api/posts/');
        const formattedResponse = await response.json();
        return formattedResponse;
        
    }
)

export const photoSlice = createSlice({
    name:'photos',
    initialState:{
        photo:[],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPhotos.pending ,(state) => {
            state.isLoading = true;
        })
        .addCase(getPhotos.fulfilled ,(state, action) => {
            state.photo = action.payload;
            state.isLoading = false;
        })
        .addCase( getPhotos.rejected, (state) => {
            state.isLoading = false;
        } )
    }
});

export default photoSlice.reducer;