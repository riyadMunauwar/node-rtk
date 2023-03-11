const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { fetchVideo } = require("./videoSlice");



const fetchRelatedVideos = createAsyncThunk('relatedVideos/fetchVideos', async (tags) => {
    const queryParams = tags.map(tag => `tags_like=${tag}`).join('&');
    const res =  await fetch(`http://localhost:9000/videos?${queryParams}&_sort=views&_order=desc`);
    return await res.json();
})



const initialState = {
    isLoading: false,
    isError: false,
    error: null,
    videos: null,
}


const relatedVideosSlice = createSlice({
    name: 'relatedVideos',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchRelatedVideos.pending, (state, action) => {
            state.isLoading = true;
        })

        builder.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.videos = action.payload;
        })

        builder.addCase(fetchRelatedVideos.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error;
        })

    }
})

module.exports =  relatedVideosSlice.reducer;


module.exports.fetchRelatedVideos = fetchRelatedVideos;