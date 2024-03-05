import {serverRequests} from "../../redditData/data.js";
import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit";



export const fetchingData = createAsyncThunk(
    'homeThreads/fetchData',
    async (searchParamsObject, thunkAPI) => {
        const {searchParam, after} = searchParamsObject;
        const data = await serverRequests.getPosts(searchParam, after);
        
        return {data, searchParam};
    }
)




const feedAreaSlice = createSlice({
    name: "homeThreads",
    initialState: {
        after: "",
        status:"",
        posts: {
            top:[],
            hot:[],
            new:[],
            rising: []
        }

    },
    reducers: {
        clearPosts(state, action){
            state.posts = [];
        }
    },
    extraReducers: (builder)=>{
            builder
                .addCase(fetchingData.pending, (state, action) =>{
                    state.status="loading";
                })
                .addCase(fetchingData.fulfilled, (state, action) => {
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
                .addCase(fetchingData.rejected, (state, action) => {
                    state.status="rejected";
                })
        }

    

})

export const {clearPosts} = feedAreaSlice.actions;

export default feedAreaSlice.reducer;