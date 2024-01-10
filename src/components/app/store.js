import { configureStore } from '@reduxjs/toolkit'
import feedAreaReducer from "../feedArea/feedAreaSlice"
import postAreaReducer from "../postArea/postAreaSlice"

export default configureStore({
    reducer: {
        feedArea: feedAreaReducer,
        postArea: postAreaReducer
    },
  })