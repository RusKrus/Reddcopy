import { configureStore } from '@reduxjs/toolkit'
import feedAreaReducer from "../feedArea/feedAreaSlice"

export default configureStore({
    reducer: {
        feedArea: feedAreaReducer,
    },
  })