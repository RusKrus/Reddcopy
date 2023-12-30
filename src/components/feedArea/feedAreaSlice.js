import {serverRequests} from "../../redditData/data.js";
import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit";



export const fetchingData = createAsyncThunk(
    'homeThreads/fetchData',
    async (searchParam, thunkAPI) => {
        const data = await serverRequests.popularPosts(searchParam);
        return data;
    }
)



const feedAreaSlice = createSlice({
    name: "homeThreads",
    initialState: {
        after: "",
        posts: [],
        isLoading: false,
        failedToLoad: false

    },
    reducers: {
        clearPosts(state,value){
            state.posts = [];
        }
    },
    extraReducers: (builder)=>{
            builder
                .addCase(fetchingData.pending, (state, action) =>{
                    state.isLoading = true;
                    state.failedToLoad = false;
                })
                .addCase(fetchingData.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.failedToLoad = false;
                    state.after = action.payload.data.after;
                    state.posts.push(...state.posts, ...action.payload.data.children);

                })
                .addCase(fetchingData.rejected, (state, action) => {
                    state.isLoading = false;
                    state.failedToLoad = true;
                })
        }

    

})

export const {clearPosts} = feedAreaSlice.actions;

export default feedAreaSlice.reducer;