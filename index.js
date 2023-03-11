require('util').inspect.defaultOptions.depth = null;
const  store = require("./app/store");
const { fetchVideo } = require("./features/videoSlice");
const { fetchRelatedVideos } = require('./features/relatedVideosSlice');



store.subscribe(() => {

    const {video: { video }, relatedVideos} = store.getState();

    if(video && !relatedVideos.isLoading && !relatedVideos.videos &&  !relatedVideos.isError) {
        store.dispatch(fetchRelatedVideos([...video.tags]));
    }

    if(relatedVideos.videos){
        console.log('anda')
    }
})

store.dispatch(fetchVideo());

