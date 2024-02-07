import { configureStore } from '@reduxjs/toolkit';
import feedAreaReducer from "../feedArea/feedAreaSlice";
import postAreaReducer from "../postArea/postAreaSlice";
import headerReducer from "../header/headerSlice";

export default configureStore({
    reducer: {
        feedArea: feedAreaReducer,
        postArea: postAreaReducer,
        header: headerReducer
    },
  })