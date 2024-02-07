import {serverRequests} from "../../redditData/data.js";
import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit";



export const fetchingData = createAsyncThunk(
    'homeThreads/fetchData',
    async (searchParamsObject, thunkAPI) => {
        const {searchParam, after} = searchParamsObject;
        const data = await serverRequests.getPosts(searchParam, after);
        return data;
    }
)




const feedAreaSlice = createSlice({
    name: "homeThreads",
    initialState: {
        after: "",
        posts: [],
        isLoaded: false,
        failedToLoad: false

    },
    reducers: {
        clearPosts(state, action){
            state.posts = [];
        }
    },
    extraReducers: (builder)=>{
            builder
                .addCase(fetchingData.pending, (state, action) =>{
                    state.isLoaded = false;
                    state.failedToLoad = false;
                })
                .addCase(fetchingData.fulfilled, (state, action) => {
                    state.isLoaded = true;
                    state.failedToLoad = false;
                    state.after = action.payload.data.after;
                    state.posts.push(...action.payload.data.children);

                })
                .addCase(fetchingData.rejected, (state, action) => {
                    state.isLoaded= false;
                    state.failedToLoad = true;
                })
        }

    

})

export const {clearPosts} = feedAreaSlice.actions;

export default feedAreaSlice.reducer;