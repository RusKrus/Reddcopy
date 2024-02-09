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
    name: "post",
    initialState:{
        postData:{},
        
    },
    reducers:{
        clearPostData(state){
            state.postInfo = [];
            state.postComments = [];    
    }},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchingPostData.pending, (state)=>{
                state.status = "loading";
            })
            .addCase(fetchingPostData.fulfilled,(state, action)=>{
                state.status = "loaded";
                if (!state.postData[action.payload.postId]){
                    state.postData[action.payload.postId]={}
                    state.postData[action.payload.postId].postInfo=action.payload.answer[0].data.children;
                    state.postData[action.payload.postId].postComments=action.payload.answer[1].data.children;
                }
                
            })
            .addCase(fetchingPostData.rejected, (state, action)=>{
                state.status = "rejected";
            }) 
    }
})

export const {clearPostData} = postAreaSlice.actions;

export default postAreaSlice.reducer;