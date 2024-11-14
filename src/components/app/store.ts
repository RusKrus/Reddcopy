import { configureStore } from '@reduxjs/toolkit';
import feedAreaReducer from "../feedArea/feedAreaSlice";
import postAreaReducer from "../postArea/postAreaSlice";
import headerReducer from "../header/headerSlice";

const store = configureStore({
    reducer: {
        feedArea: feedAreaReducer,
        postArea: postAreaReducer,
        header: headerReducer
    },
  })

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;