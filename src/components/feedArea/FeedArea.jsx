import React, {useEffect, useState} from "react";
import styles from "./feedArea.module.css";
import PostBox from "../postBox/PostBox";
import LoadingBox from "../postBox/LoadingBox";
import { useSelector, useDispatch } from 'react-redux';
import {fetchingData, clearPosts} from "../feedArea/feedAreaSlice.js"
import {serverRequests} from "../../redditData/data.js";


function FeedArea(){



    const [searchParam, setSearchParam] = useState("top")
    const postsInfo = useSelector(state=>state.feedArea);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchingData(searchParam));
    }, [dispatch, searchParam])  

    const handleHotClick = () =>{
        const param = "hot"
        if(param!==searchParam){
            dispatch(clearPosts());
            setSearchParam(param);
        }
    } 

    const handleTopClick = () =>{
        const param = "top"
        if(param!==searchParam){
            dispatch(clearPosts());
            setSearchParam(param);
        }
    } 

    const handleRisingClick = () =>{
        const param = "rising"
        if(param!==searchParam){
            dispatch(clearPosts());
            setSearchParam(param);
        }
    } 

    const handleNewClick = () =>{
        const param = "new"
        if(param!==searchParam){
            dispatch(clearPosts());
            setSearchParam(param);
        }
    } 
    


   
    
    return (
        <div className={styles.feedArea}>
            <div className={styles.contentFilter}>
                <button className={styles.paramButton} onClick={handleTopClick}  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.filterIcon}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                    </svg>
                    <span className={styles.filterText}>Top</span>
                </button> 
                <button className={styles.paramButton} onClick={handleHotClick} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.filterIcon}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                    </svg>
                    <span className={styles.filterText}>Hot</span>
                </button>
                <button className={styles.paramButton} onClick={handleNewClick} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.filterIcon}>
                        <circle cx="12" cy="12" r="10"  />
                        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="12" fill="#fff">N</text>
                    </svg>
                    <span className={styles.filterText}>New</span>
                </button>
                <button className={styles.paramButton} onClick={handleRisingClick} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.filterIcon} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className={styles.filterTextLarge}>Rising</span>
                </button>
            </div>

            {postsInfo.isLoading&&Array(Math.floor(Math.random()*5+3)).fill(0).map((ceil,num)=><LoadingBox key={num}/>)}
            {postsInfo.posts.map((postInfo, num)=>{
                const postData =  postInfo.data;
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
                                key={num}/>
                                
            })}
            
        </div>
    )
}

export default FeedArea; 