import {serverRequests} from "../../redditData/data.js";
import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit";


export const fetchingPostData = createAsyncThunk(
    'post/fetchingData',
    async (postId, thunkAPI) =>{
        const data = await serverRequests.getPostInfo(postId);
        return data;
    }
)


const postAreaSlice = createSlice({
    name:"post",
    initialState:{
        postInfo:[],
        postComments:[],
        isLoading: false,
        failedToLoad: false
    },
    reducers:{
        clearComments(state, action){
        state.comments = [];
    }},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchingPostData.pending, (state, action)=>{
                state.isLoading = true;
                state.failedToLoad = false;
            })
            .addCase(fetchingPostData.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.failedToLoad = false;
                state.postInfo.push(...action.payload[0].data.children)
                state.postComments.push(...action.payload[1].data.children)
            })
            .addCase(fetchingPostData.rejected, (state, action)=>{
                state.isLoading = false;
                state.failedToLoad = true;
            }) 
    }
})

export const {clearComments} = postAreaSlice.actions;

export default postAreaSlice.reducer;