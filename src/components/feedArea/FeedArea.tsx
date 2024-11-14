import React, { useEffect, useRef } from "react";
import styles from "./feedArea.module.css";
import PostBox from "../postBox/PostBox";
import LoadingBox from "../postBox/LoadingBox";
import UpBtn from "../upBtn/UpButton";
import ContentFilter from "../contentFilter/ContentFilter"
import ContentFilterMobile from "../contentFilter/ContentFilterMobile"
import NotFound from "../notFound/NotFound";
import FailedToLoad from "../failedToLoad/FailedToLoad";
import { useAppSelector, useAppDispatch } from '../../helperData/customHooks';
import { fetchingData } from "./feedAreaSlice";
import { searchFilter } from "../../helperData/helperFuncs";
import {useParams} from "react-router-dom"; 
import UAParser from "ua-parser-js";
import { switchHeaderVisibility }  from "../header/headerSlice";
import { ObserverEntryType, ParserResult, DeviceData, initialFeedAreatState, Post } from "../../helperData/types"


function FeedArea() {

    const itemToLoadContent = useRef<HTMLDivElement>(null);
    const observerLoader = useRef <IntersectionObserver| null >  (null);
    const {postFilterParam} = useParams();
    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state);
    
    const filterValue: string = appState.header.filterValue;
    const postsInfo: initialFeedAreatState = appState.feedArea;
    const after: string = postsInfo.after;
    const status: string = postsInfo.status;
    const activeParam: string = postFilterParam||"top";


    //getting user's device data
    const UAresults: ParserResult = new UAParser();

    const deviceData: DeviceData = UAresults.getDevice();

    useEffect(() => {
        if( postsInfo.posts[activeParam].length===0){  
            dispatch(fetchingData({ searchParam: activeParam }));
        }
        dispatch(switchHeaderVisibility(true));        
    }, [activeParam, dispatch, postsInfo.posts])


    useEffect(()=>{
        const newPostsLoader=(entries: ObserverEntryType[]): void=>{
            if (entries[0].isIntersecting){
                dispatch(fetchingData({searchParam: activeParam, after}));
            };
        }

        if(observerLoader.current instanceof IntersectionObserver){
            observerLoader.current.disconnect();
        }
        observerLoader.current = new IntersectionObserver(newPostsLoader);
        if(itemToLoadContent.current instanceof HTMLDivElement){
            observerLoader.current.observe(itemToLoadContent.current);
        }
    }, [after, dispatch, activeParam])

    const filteredPosts = postsInfo.posts[activeParam].filter((postInfo: Post) => searchFilter(filterValue, postInfo))
    
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
                            
                            return <PostBox 
                                deviceData={deviceData}
                                subredditName={postData.subreddit_name_prefixed}
                                author={postData.author}
                                title={postData.title}
                                score={postData.score}
                                media={postData.url}
                                imgResolutions={postData.preview?.images[0]} 
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
                                key={num} />
                        })}
                        <UpBtn />
                    </> :
                <NotFound text={"Sorry, no posts found"} />}
            </>
            }
            {status === "rejected" && <FailedToLoad reloadAction={fetchingData} actionParam={activeParam}/>}
        </main>
    )
}

export default FeedArea; 