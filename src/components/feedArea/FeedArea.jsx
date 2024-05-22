import React, { useEffect, useRef } from "react";
import styles from "./feedArea.module.css";
import PostBox from "../postBox/PostBox";
import LoadingBox from "../postBox/LoadingBox";
import UpBtn from "../upBtn/UpButton.jsx";
import ContentFilter from "../contentFilter/ContentFilter.jsx"
import ContentFilterMobile from "../contentFilter/ContentFilterMobile.jsx"
import NotFound from "../notFound/NotFound.jsx";
import FailedToLoad from "../failedToLoad/FailedToLoad.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { fetchingData } from "../feedArea/feedAreaSlice.js";
import { v4 as uuidv4 } from 'uuid';
import { searchFilter } from "../../helperFuncs/helperFuncs.js";
import {useParams} from "react-router-dom"; 


function FeedArea() {

    const filterValue = useSelector(state => state.header.filterValue);
    const itemToLoadContent = useRef(null);
    const observerLoader = useRef(null);
    const {postFilterParam} = useParams();
    const activeParam = postFilterParam||"top";
    const postsInfo = useSelector(state => state.feedArea);
    const dispatch = useDispatch();
    const after = postsInfo.after;
    const status = postsInfo.status;

    useEffect(() => {
        if(postsInfo.posts[activeParam].length===0){
            dispatch(fetchingData({ searchParam: activeParam }));
        }
        
        // eslint-disable-next-line
    }, [activeParam])








    useEffect(()=>{
        const newPostsLoader=(entries)=>{
            if (entries[0].isIntersecting){
                dispatch(fetchingData({searchParam: activeParam, after}));
            };
    
        }

        if(observerLoader.current){
            observerLoader.current.disconnect();
        }
        observerLoader.current = new IntersectionObserver(newPostsLoader);
        if(itemToLoadContent.current){
            observerLoader.current.observe(itemToLoadContent.current);
        }
    }, [after, dispatch, activeParam])







    const filteredPosts = postsInfo.posts[activeParam].filter(postInfo => searchFilter(filterValue, postInfo))
    return (
        <main className={styles.feedArea}>
            <ContentFilter />
            <ContentFilterMobile/>
            {(status === "loading"&&filteredPosts.length===0) && Array(Math.floor(Math.random() * 5 + 3)).fill(0).map((ceil, num) => <LoadingBox key={num} />)}
            {(status === "loaded"||filteredPosts.length>0)&&
            <>
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
                                video={postData.media?.reddit_video?.hls_url}
                                mediaType={postData.post_hint}
                                iconUrlWithSearchParam={postData.sr_detail.community_icon}
                                reserverIconUrl={postData.sr_detail.icon_img}
                                selfTextHTML={postData.selftext_html}
                                numComments={postData.num_comments}
                                isGallery={postData.is_gallery}
                                thumbnail={postData.thumbnail}
                                isNsfw={postData.over_18}
                                isSelf={postData.is_self}
                                htmlStringIframe = {postData?.media?.oembed?.html}
                                flairText={postData.link_flair_text}
                                flairTextColor={postData.link_flair_text_color}
                                flairBackgroundColor={postData.link_flair_background_color}
                                id={postData.id}
                                ref={num + 3 === postsInfo.posts[activeParam].length ? itemToLoadContent : null}
                                key={uuidv4()} />
                        })}
                        <UpBtn />
                    </> :
                <NotFound text={"Sorry, no posts found"} />}
            </>
            }
            {status === "rejected" && <FailedToLoad reloadAction={fetchingData} actionParam={activeParam} />}
        </main>
    )
}

export default FeedArea; 