import React, { useEffect, useState, useRef } from "react";
import styles from "./feedArea.module.css";
import PostBox from "../postBox/PostBox";
import LoadingBox from "../postBox/LoadingBox";
import UpBtn from "../upBtn/UpButton.jsx";
import ContentFilter from "../contentFilter/ContentFilter.jsx"
import NotFound from "../notFound/NotFound.jsx";
import FailedToLoad from "../failedToLoad/FailedToLoad.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { fetchingData, clearPosts } from "../feedArea/feedAreaSlice.js";
import { v4 as uuidv4 } from 'uuid';
import { searchFilter } from "../../helperFuncs/helperFuncs.js";
import {useParams} from "react-router-dom"; 


function FeedArea() {

    const filterValue = useSelector(state => state.header.filterValue);
    const itemToLoadContent = useRef();
    //const observerLoader = useRef();
    const {postFilterParam} = useParams();
    const postsInfo = useSelector(state => state.feedArea);
    const dispatch = useDispatch();
    //const after = postsInfo.after;
    const status = useSelector(state=>state.feedArea.status);


    useEffect(() => {
        if(postsInfo.posts[postFilterParam].length===0){
            dispatch(fetchingData({ searchParam: postFilterParam }));
        }
        
        // eslint-disable-next-line
    }, [postFilterParam])






    //-----------------------------------------------------------------------
    /*infinity scroll, not ended (eats a lot of memory)

    const newPostsLoader=(entries)=>{
        if (entries[0].isIntersecting){
            dispatch(fetchingData({searchParam: searchParam, after}));
        };
    }
    useEffect(()=>{
        if(observerLoader.current){
            observerLoader.current.disconnect();
        }
        observerLoader.current = new IntersectionObserver(newPostsLoader);
        if(itemToLoadContent.current){
            observerLoader.current.observe(itemToLoadContent.current);
        }
    }, [after])*/

    //--------------------------------------------------------------------------



    const filteredPosts = postsInfo.posts[postFilterParam].filter(postInfo => searchFilter(filterValue, postInfo))
    return (
        <main className={styles.feedArea}>
            <ContentFilter />
            {status === "loading" && Array(Math.floor(Math.random() * 5 + 3)).fill(0).map((ceil, num) => <LoadingBox key={num} />)}
            {status === "loaded" && <>
                {
                    filteredPosts.length > 0 ?
                    <>
                        {filteredPosts.map((postInfo, num) => {
                            const postData = postInfo.data;
                            return <PostBox subredditName={postData.subreddit_name_prefixed}
                                author={postData.author}
                                title={postData.title}
                                score={postData.score}
                                media={postData.url}
                                time={postData.created_utc}
                                video={postData.media?.reddit_video?.dash_url}
                                mediaType={postData.post_hint}
                                iconUrlWithSearchParam={postData.sr_detail.community_icon}
                                reserverIconUrl={postData.sr_detail.icon_img}
                                selfText={postData.selftext}
                                numComments={postData.num_comments}
                                forbidden={postData.link_flair_css_class}
                                isGallery={postData.is_gallery}
                                thumbnail={postData.thumbnail}
                                galleryInfo={postData.media_metadata}
                                id={postData.id}
                                ref={num + 3 === postsInfo.posts.length ? itemToLoadContent : null}
                                key={uuidv4()} />
                        })}
                        <UpBtn />
                    </> :
                    <NotFound text={"Sorry, no posts found"} />}
                </>
            }
            {status === "rejected" && <FailedToLoad reloadAction={fetchingData} actionParam={postFilterParam} />}
        </main>
    )
}

export default FeedArea; 