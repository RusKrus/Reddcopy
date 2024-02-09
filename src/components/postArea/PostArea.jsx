import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchingPostData } from "./postAreaSlice";
import styles from "./postArea.module.css"
import { timeDecoder, mediaContainerDefiner } from "../../helperFuncs/helperFuncs";
import dashjs from 'dashjs';
import CommentsArea from "../commentsArea/CommentsArea.jsx";
import LoadingCommentsArea from "../commentsArea/LoadingCommentsArea.jsx";
import UpBtn from "../upBtn/UpButton.jsx"
import FailedToLoad from "../failedToLoad/FailedToLoad.jsx";
import { v4 as uuidv4 } from 'uuid';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function PostArea() {



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    const postData = useSelector(state => state.postArea.postData[postId]);
    const postDetails = postData?.postInfo[0].data;
    const postComments = postData?.postComments;
    const isLoaded = useSelector(state => state.postArea.isLoaded);


    useEffect(() => {
        if (!postData) {
            dispatch(fetchingPostData(postId));
        }

    }, [])


    //defining all required data for post

    const subredditName = postDetails?.subreddit_name_prefixed;
    const author = postDetails?.author;
    const title = postDetails?.title;
    const score = postDetails?.score;
    const media = postDetails?.url;
    const time = postDetails?.created_utc;
    const video = postDetails?.media?.reddit_video?.dash_url;
    const mediaType = postDetails?.post_hint;
    const iconUrlWithSearchParam = postDetails?.sr_detail.community_icon;
    const reserveIconUrl = postDetails?.sr_detail.icon_img;
    const selfText = postDetails?.selftext;
    const numComments = postDetails?.num_comments;
    //forbidden is data about post type which I can't show in my app
    const forbidden = postDetails?.link_flair_css_class;
    const isGallery = postDetails?.is_gallery;
    const thumbnail = postDetails?.thumbnail;
    const galleryInfo = postDetails?.media_metadata;
    const subredditDescription = postDetails?.sr_detail.public_description;
    const followers = postDetails?.sr_detail.subscribers;

    //getting alternative subreddit icon url
    const searchParamStart = iconUrlWithSearchParam ? iconUrlWithSearchParam.indexOf("?") : null;
    const iconUrl = searchParamStart ? iconUrlWithSearchParam.slice(0, searchParamStart) : iconUrlWithSearchParam;


    //working with dash video type. It was only one way to create video with sound in the app
    const videoRef = useRef(null);
    const [dashUrl, setDashUrl] = useState('');

    useEffect(() => {
        setDashUrl(video);
        const player = dashjs.MediaPlayer().create();
        player.initialize(videoRef.current, dashUrl, true);
    }, [dashUrl, video])

    //working on score logic
    const [changedScore, setChangedScore] = useState(null);
    const [isLikeClicked, setIsLikeClicked] = useState(false);
    const [isDislikeClicked, setIsDislikeClicked] = useState(false);


    //useEffect is used because in case of refreshing the page score passed to setChangedScore is undefined and is not re-rendered when data is fethced 
    useEffect(() => {
        setChangedScore(score);
    }, [score])

    //to ensure that incase second load of the page scrol bar will be on the top
    useEffect(() => {
        window.scrollTo({ top: 0 });
    })

    const onLikeClick = () => {

        setIsLikeClicked(!isLikeClicked);
        setIsDislikeClicked(false);
        if (changedScore === score) {
            setChangedScore(changedScore => changedScore + 1)
        }
        else if (changedScore > score) {
            setChangedScore(score)
        }
        else if (changedScore < score) {
            setChangedScore(changedScore => changedScore + 2)
        }
    }

    const onDislikeClick = () => {

        setIsDislikeClicked(!isDislikeClicked);
        setIsLikeClicked(false);
        if (changedScore === score) {
            setChangedScore(changedScore => changedScore - 1)
        }
        else if (changedScore < score) {
            setChangedScore(score)
        }
        else if (changedScore > score) {
            setChangedScore(changedScore => changedScore - 2)
        }

    }

    //media container definer, handling logic for some kinds of containers
    const [isZoomed, setIsZoomed] = useState(false)
    const handlePhotoClick = () => {
        setIsZoomed(!isZoomed);
    }

    //checker for isZoomed value
    useEffect(() => {
        document.body.style.overflow = isZoomed ? 'hidden' : 'auto';
        if (isZoomed) {
            window.scroll({ top: 0 })
        }
    }, [isZoomed])

    const handleBacklick = () => {
        navigate(-1);
    }
    //defining container type;
    const mediaContainer = isLoaded ? mediaContainerDefiner(styles, mediaType, media, isZoomed, handlePhotoClick, forbidden, videoRef, video, isGallery, thumbnail, selfText) : null;
    console.log(mediaContainer);
    //getting time posted ago
    const timeAgo = timeDecoder(time);


    return (
        <div className={styles.postArea}>
            <div onClick={handleBacklick} className={styles.backButton}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.backSign}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                </svg>

            </div>
            <div className={styles.postAndCommentsBox}>
                <div className={styles.postBox}>
                    <div className={styles.mediaContainer}>
                        <h3 className={styles.title}>{title || <Skeleton width="50%" />}</h3>
                        {mediaContainer ? mediaContainer : null || <Skeleton height="20rem" width="100%" />}
                    </div>

                    <div className={styles.postInfoContainer}>
                        {isLoaded ? <div className={styles.likesContainer}>
                            <svg onClick={onLikeClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isLikeClicked ? styles.clickedLikeBtn : styles.likeBtn} >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                            </svg>
                            {(changedScore < 1000) ? <span className={isLikeClicked ? styles.likesCounterGreen : isDislikeClicked ? styles.likesCounterRed : styles.likesCounter}>{changedScore}</span> : <span className={isLikeClicked ? styles.likesCounterGreen : isDislikeClicked ? styles.likesCounterRed : styles.likesCounter}>{(changedScore / 1000).toFixed(1)}k</span>}
                            <svg onClick={onDislikeClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isDislikeClicked ? styles.clickedDislikeBtn : styles.dislikeBtn} >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                            </svg>
                        </div> : <Skeleton containerClassName={styles.skeletonLikesContainer} width="5rem" />}
                        {isLoaded ? <p className={styles.postDescription} >Posted by <span>{author}</span> <span className={styles.timeAgo}>{timeAgo}</span></p> : <Skeleton containerClassName={styles.skeletonPostInfo} />}
                    </div>
                </div>
                <div className={styles.commentsArea}>
                    {isLoaded ? <h3 className={styles.commentsCounter}>{numComments} comments</h3> : <Skeleton style={{ textAlign: "center", width: "30%", margin: "1rem 0" }} />}
                    <hr className={styles.hrComments} />
                    {isLoaded ? postComments?.filter(comment => comment.kind === "t1").map(comment => <CommentsArea comment={comment} key={uuidv4()} />) : Array(Math.floor(Math.random() * 5 + 3)).fill(0).map((ceil, num) => <LoadingCommentsArea key={num} />)}
                </div>
            </div>

            <div className={styles.subredditInfoBox}>
                {isLoaded ? <p className={styles.subredditMainInfo}><img className={styles.subredditAvatar} src={iconUrl ? iconUrl : reserveIconUrl} alt="Subreddit avatar" />{subredditName}</p> : <div className={styles.srNameSkeleton}><Skeleton circle width="2rem" height="2rem" style={{ marginRight: ".3rem" }} /><Skeleton width="5rem" /></div>}
                <hr className={styles.hrSrInfo}></hr>
                {isLoaded ? <p className={styles.subredditDescription}>{subredditDescription || <span style={{ fontStyle: 'italic' }}>No info avaliable yet</span>}</p> : <Skeleton count={Math.floor(Math.random() * 2 + 2)} />}
                <hr className={styles.hrSrInfo}></hr>
                {isLoaded ? <p className={styles.followersNumber}>{followers} followers</p> : <p className={styles.followersNumber}><Skeleton width="7rem" /></p>}
            </div>

            <UpBtn />
        </div>
    )
}




export default PostArea;