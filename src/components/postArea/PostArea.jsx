import React, { useEffect, useRef,useState } from "react";
import {useParams} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchingPostData } from "./postAreaSlice";
import { clearPostData } from "./postAreaSlice"
import styles from "./postArea.module.css"
import { timeDecoder } from "../../helperFuncs/helperFuncs";
import dashjs from 'dashjs';
import CommentsArea from "../commentsArea/CommentsArea.jsx";
import { Link } from "react-router-dom"; 

function PostArea(){



    const dispatch = useDispatch();
    const postData = useSelector(state=>state.postArea.postInfo[0]?.data);
    const postComments = useSelector(state=>state.postArea.postComments);
    const isLoaded = useSelector(state=>state.postArea.isLoaded);
    const { postId } = useParams();


    useEffect(()=>{
        dispatch(clearPostData())
        dispatch(fetchingPostData(postId))
    },[])
//defining all required data for post
    
    const subredditName=postData?.subreddit_name_prefixed;
    const author=postData?.author;
    const title=postData?.title;
    const score=postData?.score;
    const media=postData?.url;
    const time=postData?.created_utc;
    const video=postData?.media?.reddit_video?.dash_url;
    const mediaType=postData?.post_hint;
    const iconUrlWithSearchParam=postData?.sr_detail.community_icon;
    const reserveIconUrl=postData?.sr_detail.icon_img;
    const selfText=postData?.selftext;
    const numComments=postData?.num_comments;
    //forbidden is data about post type which I can't show in my app
    const forbidden=postData?.link_flair_css_class;
    const isGallery=postData?.is_gallery;
    const thumbnail=postData?.thumbnail;
    const galleryInfo=postData?.media_metadata;
    const subredditDescription=postData?.sr_detail.public_description;
    const followers=postData?.sr_detail.subscribers;
    


    //working with dash video type
    const videoRef = useRef(null);
    const [dashUrl, setDashUrl] = useState('');

    useEffect(()=>{ 
        setDashUrl(video);
        const player = dashjs.MediaPlayer().create();
        player.initialize(videoRef.current, dashUrl, true);  
        }, [dashUrl, video])
    
    //working on score logic
    const [changedScore, setChangedScore] = useState(null);
    const [isLikeClicked, setIsLikeClicked] = useState(false);
    const [isDislikeClicked, setIsDislikeClicked] = useState(false);
    
    
    //useEffect is used because in case of refreshing the page score passed to setChangedScore is undefined and is not re-rendered when data is fethced 
    useEffect(()=>{
        setChangedScore(score);
    },[score])
    
    const onLikeClick=()=>{

        setIsLikeClicked(!isLikeClicked);
        setIsDislikeClicked(false);
        if (changedScore===score){
            setChangedScore(changedScore=>changedScore+1)
        }
        else if(changedScore>score){
            setChangedScore(score)
        }
        else if(changedScore<score){
            setChangedScore(changedScore=>changedScore+2)
        }
    }
        
    const onDislikeClick=()=>{

        setIsDislikeClicked(!isDislikeClicked);
        setIsLikeClicked(false);
        if (changedScore===score){
            setChangedScore(changedScore=>changedScore-1)
        }
        else if(changedScore<score){
            setChangedScore(score)
        }
        else if(changedScore>score){
            setChangedScore(changedScore=>changedScore-2)
        }
        
    }
    
    //media container definer, handling logic for some kinds of containers
    const [isZoomed, setIsZoomed] = useState(false)
    const handlePhotoClick = () =>{
        setIsZoomed(!isZoomed);
    }
    let mediaContainer;
    if(isLoaded){
        switch (mediaType){
            case "link":
                mediaContainer = <a href={media} className={styles.link}>{media.substring(0,18)}... 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.linkIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
            </a>;
                break;
            case "image":
                mediaContainer = 
                <>
                    {isZoomed&&<div className={styles.activeOverlay}></div>}
                    <img onClick={handlePhotoClick} src={media} className={isZoomed?styles.zoomedPostMediaPhoto:styles.postMediaPhoto} alt="Post media"/> 
                </>
                   
                break;
            case "text":
                mediaContainer = <p>{media}</p>;
                break;
            case "self":
                if (forbidden==="postgamethread"||forbidden==="postgame"){
                    mediaContainer=<a href="#">You can find detail about this post on reddit website</a>;
                    break;
                }
                mediaContainer = <p className={styles.selfText}>{selfText.substring(0,500)}... <a className={styles.postLink} href="#">read more</a></p>;
                break;
            case "rich:media":
                mediaContainer = <p><strong>I dont know how to handle rich:media yet...</strong></p>;
                break;
            case "rich:video":
                mediaContainer = <video ref={videoRef} controls className={styles.postMedia}><source src={video} alt="Post media" /> Video is not avaliable</video>;
                break;
            case "hosted:video":
                mediaContainer = <video ref={videoRef} controls className={styles.postMedia}><source src={video} alt="Post media" /> Video is not avaliable</video>;
                break;
            
            default:
                if (forbidden==="postgamethread"||forbidden==="postgame"){
                    mediaContainer=<a href="#" >You can find detail about this post on reddit website</a>;
                    break;
                }
                else if(isGallery){
                    if(thumbnail!=="default"){
                        mediaContainer=<img src={thumbnail}/>;
                        break;
                    }
                    else{
                        mediaContainer = <a href={media} className={styles.link}>{media.substring(0,18)}...</a>
                    }
            
                }
                else{
                    selfText?mediaContainer = <p className={styles.selfText}>{selfText.substring(0,500)}...<a className={styles.postLink} href="#">read more</a></p>:mediaContainer=null;
                    break;
                }
        }
    }



    //getting time posted ago
    const timeAgo = timeDecoder(time);

    return isLoaded?(
        <div className={styles.postArea}>
            <Link to="/"className={styles.backButton}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.backArrow}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                </svg>
                <h4 className={styles.backButtonText}>Back</h4>
            </Link>
            <div className={styles.postBox}>
                <div className={styles.mediaContainer}>
                    <h3 className={styles.title}>{title}</h3>
                    {mediaContainer?mediaContainer:null}
                </div>
                <hr className={styles.hrPostBox}></hr>
                <div className={styles.postInfoContainer}>
                    <div className={styles.likesContainer}>
                        <svg onClick = {onLikeClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isLikeClicked?styles.clickedLikeBtn:styles.likeBtn} >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                        {(changedScore<1000)?<span className={isLikeClicked?styles.likesCounterGreen:isDislikeClicked?styles.likesCounterRed:styles.likesCounter}>{changedScore}</span>:<span className={isLikeClicked?styles.likesCounterGreen:isDislikeClicked?styles.likesCounterRed:styles.likesCounter}>{(changedScore/1000).toFixed(1)}k</span>}
                        <svg onClick = {onDislikeClick}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isDislikeClicked?styles.clickedDislikeBtn:styles.dislikeBtn} >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                        </svg>
                    </div>
                    <p className={styles.postDescription} >Posted by <span>{author}</span> <span className={styles.timeAgo}>{timeAgo}</span></p>
                </div>
            </div>
            <div className={styles.subredditInfoBox}>
                <p className={styles.subredditMainInfo}><img className={styles.subredditAvatar} src={reserveIconUrl}/>{subredditName}</p>
                <hr className={styles.hrSrInfo}></hr>
                <p className={styles.subredditDescription}>{subredditDescription}</p>
                <hr className={styles.hrSrInfo}></hr>
                <p className={styles.followersNumber}>{followers} followers</p>
            </div>
            <div className={styles.commentsArea}>
                <h3 className={styles.commentsCounter}>{numComments} comments</h3>
                <hr className={styles.hr}/>
                {postComments.map(comment=><CommentsArea comment={comment}/>)}
            </div>
        </div>
    ):<h1>loading</h1>;
    }




export default PostArea;