import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchingPostData } from "./postAreaSlice";
import { clearComments } from "./postAreaSlice"


function PostArea(){
    const dispatch = useDispatch();
    const postInfo = useSelector(state=>state.postArea)
    const { postId } = useParams();
    useEffect(()=>{
        dispatch(clearComments())
        dispatch(fetchingPostData(postId))
    },[])
    
    return (
        <div></div>
    );
}


export default PostArea;