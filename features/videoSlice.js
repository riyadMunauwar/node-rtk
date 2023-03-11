const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const fetchVideo = createAsyncThunk('video/fetchVideo', async () => {
    const res = await fetch('http://localhost:9000/videos');
    return await res.json();
});

const initialState = {
    isLoading: false,
    isError: false,
    error: null,
    video: null,
}

const videoSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVideo.pending, (state, action) => {
            state.isLoading = true;
        })

        builder.addCase(fetchVideo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.video = action.payload;
        })

        builder.addCase(fetchVideo.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error;
        })
    }
})


module.exports =  videoSlice.reducer;

module.exports.fetchVideo = fetchVideo;