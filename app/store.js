const { configureStore } = require("@reduxjs/toolkit");
const { createLogger } = require("redux-logger");
const videoReducer = require("../features/videoSlice");
const relatedVideosReducer = require("../features/relatedVideosSlice");

const logger = createLogger();

const store = configureStore({
    reducer: {
        video: videoReducer,
        relatedVideos: relatedVideosReducer, 
    },
    middleware: (getDefaultMiddlewares) => {
        return [...getDefaultMiddlewares(), logger];
    }
});


module.exports = store;
