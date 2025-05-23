import {serverRequests} from "../../redditData/data";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostAreaState, PostAreaPayload } from "../../helperData/types";

export const fetchingPostData = createAsyncThunk(
    'post/fetchingData',
    async (postId: string) =>{
        const data = await serverRequests.getPostInfo(postId);
        return {postId, data};
    }
)



const initialState: PostAreaState = {
    postsData:{}, 
    status: "idle"
}

const postAreaSlice = createSlice({
    name: "post",
    initialState,
    reducers:{
        clearPostData(state){
            state.postsData = {}; 
    }},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchingPostData.pending, (state)=>{
                state.status = "loading";
            })
            .addCase(fetchingPostData.fulfilled,(state, action: PayloadAction<PostAreaPayload>)=>{
                state.status = "loaded";
                if (!state.postsData[action.payload.postId]){
                    state.postsData[action.payload.postId] = {
                        postInfo: null,
                        postComments: null
                    }
                    state.postsData[action.payload.postId].postInfo=action.payload.data[0].data.children;
                    state.postsData[action.payload.postId].postComments=action.payload.data[1].data.children;
                }
            })
            .addCase(fetchingPostData.rejected, (state)=>{
                state.status = "rejected";
            }) 
    }
})

export const {clearPostData} = postAreaSlice.actions;

export default postAreaSlice.reducer;