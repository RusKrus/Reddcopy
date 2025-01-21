import {serverRequests} from "../../redditData/data";
import { createAsyncThunk, createSlice, PayloadAction }  from "@reduxjs/toolkit";
import { initialFeedAreatState, feedAreaPayload } from "../../helperData/types";



export const fetchingData = createAsyncThunk(
    'homeThreads/fetchData',
    async (searchParamsObject: {searchParam: string, after?: string}) => {
        const {searchParam, after} = searchParamsObject;
        const data = await serverRequests.getPosts(searchParam, after);
        return {data, searchParam};
    }
)

const initialState: initialFeedAreatState = {
    after: "",
    status:"",
    posts: {
        top: [],
        hot:[],
        new:[],
        rising: []
    }
}

const feedAreaSlice = createSlice({
    name: "homeThreads",
    initialState, 
    reducers: {
        clearPosts(state){
            state.posts = { 
                top: [],
                hot:[],
                new:[],
                rising: []
            };
        }
    },
    extraReducers: (builder)=>{
            builder
                .addCase(fetchingData.pending, (state) =>{
                    state.status="loading";
                })
                .addCase(fetchingData.fulfilled, (state, action: PayloadAction<feedAreaPayload>) => {
                    if (action.payload.searchParam==="top"){
                        state.status="loaded";
                        state.after = action.payload.data.data.after;
                        state.posts[action.payload.searchParam].push(...action.payload.data.data.children);
                    }
                    else if (action.payload.searchParam==="hot"){
                        state.status="loaded";
                        state.after = action.payload.data.data.after;
                        state.posts[action.payload.searchParam].push(...action.payload.data.data.children);
                    }
                    else if (action.payload.searchParam==="new"){
                        state.status="loaded";
                        state.after = action.payload.data.data.after;
                        state.posts[action.payload.searchParam].push(...action.payload.data.data.children);
                    }
                    else if (action.payload.searchParam==="rising"){
                        state.status="loaded";
                        state.after = action.payload.data.data.after;
                        state.posts[action.payload.searchParam].push(...action.payload.data.data.children);
                    }
                })
                .addCase(fetchingData.rejected, (state) => {
                    state.status="rejected";
                })
        }

    

})

export const {clearPosts} = feedAreaSlice.actions;
export default feedAreaSlice.reducer;