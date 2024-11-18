import {serverRequests} from "../../redditData/data";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostAreaState, ServerAnswerPostArea } from "../../helperData/types";

export const fetchingPostData = createAsyncThunk(
    'post/fetchingData',
    async (postId: string) =>{
        const data = await serverRequests.getPostInfo(postId);
        return {postId, data};
    }
)



const initialState: PostAreaState = {
    postData:{}, 
    status: "idle"
}

const postAreaSlice = createSlice({
    name: "post",
    initialState,
    reducers:{
        clearPostData(state){
            state.postData = {}; 
    }},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchingPostData.pending, (state)=>{
                state.status = "loading";
            })
            .addCase(fetchingPostData.fulfilled,(state, action: PayloadAction<ServerAnswerPostArea>)=>{
                state.status = "loaded";
                if (!state.postData[action.payload.postId]){
                    state.postData[action.payload.postId] = {
                        postInfo: null,
                        postComments: null
                    }
                    state.postData[action.payload.postId].postInfo=action.payload.data[0].data.children;
                    state.postData[action.payload.postId].postComments=action.payload.data[1].data.children;
                }
            })
            .addCase(fetchingPostData.rejected, (state)=>{
                state.status = "rejected";
            }) 
    }
})

export const {clearPostData} = postAreaSlice.actions;

export default postAreaSlice.reducer;