import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getPhotos = createAsyncThunk(
    'photos/getPhotos',
    async () => {
        try {
            const response = await fetch('http://localhost:8000/api/posts/', {
                method: 'get',
                headers: new Headers({
                    'Authorization': localStorage.getItem('auth'),
                    'Content-Type': 'application/json'
                }),
            });
            const formattedResponse = await response.json();
            return formattedResponse;
        } catch (error) {
            console.error(error);
        }
    }
)

export const photoSlice = createSlice({
    name: 'photos',
    initialState: {
        photo: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPhotos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPhotos.fulfilled, (state, action) => {
                state.photo = action.payload;
                state.isLoading = false;
            })
            .addCase(getPhotos.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export default photoSlice.reducer;