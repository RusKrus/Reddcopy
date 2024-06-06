import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchingPostData } from "./postAreaSlice";
import styles from "./postArea.module.css"
import { timeDecoder } from "../../helperFuncs/helperFuncs";
import CommentsArea from "../commentsArea/CommentsArea.jsx";
import PostAreaLoading from "./PostAreaLoading.jsx";
import UpBtn from "../upBtn/UpButton.jsx";
import FailedToLoad from "../failedToLoad/FailedToLoad.jsx";
import MediaContainer from "../mediaContainer/MediaContainer.jsx";
import LikesCounter from "../likesCounter/LikesCounter.jsx";
import { v4 as uuidv4 } from 'uuid';
import 'react-loading-skeleton/dist/skeleton.css';

function PostArea() {



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    const postData = useSelector(state => state.postArea.postData[postId]);
    const postDetails = postData?.postInfo[0].data;
    const postComments = postData?.postComments;
    const status = useSelector(state => state.postArea.status);
    const location = useLocation();
    //refs for parsed data 



    useEffect(() => {
        if (!postData) {
            dispatch(fetchingPostData(postId));
        }
    }, [dispatch, postData, postId])
    
    //defining all required data for post
    const postProps = {
        subredditName: postDetails?.subreddit,
        author: postDetails?.author,
        title: postDetails?.title,
        score: postDetails?.score,
        media: postDetails?.url,
        time: postDetails?.created_utc,
        mediaType: postDetails?.post_hint,
        selfTextHTML: postDetails?.selftext_html,
        numComments: postDetails?.num_comments,
        thumbnail: postDetails?.thumbnail,
        //is_something info collection
        isGallery: postDetails?.is_gallery,
        isSelf: postDetails?.is_self,
        isNsfw:postDetails?.over_18,
        //media info collection
        galleryInfo: postDetails?.media_metadata,
        htmlStringIframe: postDetails?.media?.oembed?.html,
        video: postDetails?.media?.reddit_video?.hls_url,
        //link flair info collection
        flairText: postDetails?.link_flair_text,
        flairTextColor: postDetails?.link_flair_text_color,
        flairBackgroundColor: postDetails?.link_flair_background_color,
        //subreddit info collection
        iconUrlWithSearchParam: postDetails?.sr_detail.community_icon,
        reserveIconUrl: postDetails?.sr_detail.icon_img,
        subredditDescription: postDetails?.sr_detail.public_description,
        followers: postDetails?.sr_detail.subscribers
    }




    //getting alternative subreddit icon url
    const searchParamStart = postProps.iconUrlWithSearchParam ? postProps.iconUrlWithSearchParam.indexOf("?") : null;
    const iconUrl = searchParamStart ? postProps.iconUrlWithSearchParam.slice(0, searchParamStart) : postProps.iconUrlWithSearchParam;

    //to ensure that incase second load of the page scrol bar will be on the top
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [])

    const handleBacklick = () => {
        navigate(-1);
    }


    //getting time posted ago
    const timeAgo = timeDecoder(postProps.time);

    if (status === "loading") {
        return (
            <div className={styles.postArea}>
                <PostAreaLoading />
            </div>
        )
    }
    else if (status === "loaded") {
        return (
            <div className={styles.postArea}>
                
                {location.state ? <div onClick={handleBacklick} className={styles.backButton} data-testid="backButton">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.backSign}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                    </svg>
                </div> : <div></div>}
                <div className={styles.postAndCommentsBox} data-testid = "postAndCommentsBox">
                    <div className={styles.postBox}>
                        {/*mobile styles*/}
                        <p className={styles.subredditMainInfoMobile}>{(iconUrl || postProps.reserveIconUrl) && <img className={styles.subredditAvatarMobile} src={iconUrl ? iconUrl : postProps.reserveIconUrl} alt="Subreddit avatar" />}{postProps.subredditName}</p>
                        <details className={styles.srDetailsMobile}>
                            <summary className={styles.srMoreInfoMobile}>More info about subreddit</summary>
                            <p className={styles.subredditDescription}>{postProps.subredditDescription || <span style={{ fontStyle: 'italic' }}>No info avaliable yet</span>}</p>
                        </details>
                        <MediaContainer containerType="postArea"
                            galleryInfo={postProps.galleryInfo}
                            title={postProps.title}
                            styles={styles}
                            mediaType={postProps.mediaType}
                            media={postProps.media}
                            video={postProps.video}
                            isGallery={postProps.isGallery}
                            thumbnail={postProps.thumbnail}
                            isNsfw={postProps.isNsfw}
                            isSelf={postProps.isSelf}
                            htmlDataForParseSelfText={{ selfTextHTML: postProps.selfTextHTML, htmlStringIframe: postProps.htmlStringIframe }}
                            flairProps={{ flairText: postProps.flairText, flairTextColor: postProps.flairTextColor, flairBackgroundColor: postProps.flairBackgroundColor }}
                        />
                        <div className={styles.postInfoContainer}>
                            <LikesCounter score={postProps.score} containerType={"postArea"} />
                            <p className={styles.postDescription} >Posted by <span>{postProps.author}</span> <span className={styles.timeAgo}>{timeAgo}</span></p>
                        </div>
                    </div>
                    <div className={styles.commentsArea}>
                        <h3 className={styles.commentsCounter}>{postProps.numComments} comments</h3>
                        <hr className={styles.hrComments} />
                        {postComments && postComments.length > 0 ? postComments.filter(comment => comment.kind === "t1").map(comment => <CommentsArea comment={comment} key={uuidv4()} />) : <h2>Nobody left a comment yet :(</h2>}
                    </div>
                </div>

                <div className={styles.subredditInfoBox} >
                    <p className={styles.subredditMainInfo}>{(iconUrl || postProps.reserveIconUrl) && <img className={styles.subredditAvatar} src={iconUrl ? iconUrl : postProps.reserveIconUrl} alt="Subreddit avatar" />}{postProps.subredditName}</p>
                    <hr className={styles.hrSrInfo}></hr>
                    <p className={styles.subredditDescription}>{postProps.subredditDescription || <span style={{ fontStyle: 'italic' }}>No info avaliable yet</span>}</p>
                    <hr className={styles.hrSrInfo}></hr>
                    <p className={styles.followersNumber}>{postProps.followers} followers</p>
                </div>
                <UpBtn />

            </div>
        )
    }
    else if (status === "rejected") {
        return (
            <FailedToLoad reloadAction={fetchingPostData} actionParam={postId} />
        )
    }

}




export default PostArea;