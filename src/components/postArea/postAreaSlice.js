import {serverRequests} from "../../redditData/data.js";
import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit";


export const fetchingPostData = createAsyncThunk(
    'post/fetchingData',
    async (postId, thunkAPI) =>{
        const data = await serverRequests.getPostInfo(postId);
        return {postId:postId, answer:data};
    }
)


const postAreaSlice = createSlice({
    name:"post",
    initialState:{
        postData:{},
        isLoaded: false,
        failedToLoad: false,
        
    },
    reducers:{
        clearPostData(state, action){
            state.postInfo = [];
            state.postComments = [];    
    }},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchingPostData.pending, (state, action)=>{
                state.isLoaded = false;
                state.failedToLoad = false;
            })
            .addCase(fetchingPostData.fulfilled,(state, action)=>{
                state.isLoaded = true;
                state.failedToLoad = false;
                if (!state.postData[action.payload.postId]){
                    state.postData[action.payload.postId]={}
                    state.postData[action.payload.postId].postInfo=action.payload.answer[0].data.children;
                    state.postData[action.payload.postId].postComments=action.payload.answer[1].data.children;
                }
                
            })
            .addCase(fetchingPostData.rejected, (state, action)=>{
                state.isLoaded = false;
                state.failedToLoad = true;
            }) 
    }
})

export const {clearPostData} = postAreaSlice.actions;

export default postAreaSlice.reducer;