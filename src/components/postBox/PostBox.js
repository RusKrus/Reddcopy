import React, {useState, useEffect, useRef} from "react";
import styles from "./postBox.module.css";
import dashjs from 'dashjs';
import {serverRequests} from "../../redditData/data.js";

function PostBox(props){
    
    const {subredditName, author, title, score, media, time, video, mediaType, iconUrlWithSearchParam, reserverIconUrl, selfText, numComments, forbidden, isGallery, thumbnail, galleryInfo} = props;

    

    const date = new Date(time*1000);
    const hoursAgo = date.getHours();
    const minutesAgo = date.getMinutes();
    const daysAgo = date.getMinutes();
    const searchParamStart = iconUrlWithSearchParam?iconUrlWithSearchParam.indexOf("?"):null;
    const iconUrl = searchParamStart?iconUrlWithSearchParam.slice(0, searchParamStart):iconUrlWithSearchParam;


    const videoRef = useRef(null);
    const [dashUrl, setDashUrl] = useState('');
    const [changedScore, setChangedScore] = useState(score);
    const [isLikeClicked, setIsLikeClicked] = useState(false);
    const [isDislikeClicked, setIsDislikeClicked] = useState(false);
    

    
    

    
    useEffect(()=>{
        
        setDashUrl(video);
        const player = dashjs.MediaPlayer().create();
        player.initialize(videoRef.current, dashUrl, true);
        
    },[dashUrl, video])


    
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

    let mediaContainer;
    switch (mediaType){
        case "link":
            mediaContainer = <a href={media} className={styles.link}>{media.substring(0,18)}... 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.linkIcon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
          </a>;
            break;
        case "image":
            mediaContainer = <img src={media} className={styles.postMedia} alt="Post media"/>;
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



    
    return (
            <div className={styles.postContainer}>
                <div className={styles.actionContainer}>
                    <div className={styles.likesContainer}>
                       
                        <svg onClick={onLikeClick} stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" className={isLikeClicked?styles.clickedLikeBtn:styles.likeBtn} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21c-1.654 0-3-1.346-3-3v-4.764c-1.143 1.024-3.025.979-4.121-.115-1.17-1.169-1.17-3.073 0-4.242l7.121-7.121 7.121 7.121c1.17 1.169 1.17 3.073 0 4.242-1.094 1.095-2.979 1.14-4.121.115v4.764c0 1.654-1.346 3-3 3zm-1-12.586v9.586c0 .551.448 1 1 1s1-.449 1-1v-9.586l3.293 3.293c.379.378 1.035.378 1.414 0 .391-.391.391-1.023 0-1.414l-5.707-5.707-5.707 5.707c-.391.391-.391 1.023 0 1.414.379.378 1.035.378 1.414 0l3.293-3.293z"></path>
                        </svg>

                        {(changedScore<1000)?<span className={styles.likesCounter}>{changedScore}</span>:<span className={styles.likesCounter}>{(changedScore/1000).toFixed(1)}k</span>}

                        <svg onClick={onDislikeClick} stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" className={isDislikeClicked?styles.clickedDislikeBtn:styles.dislikeBtn} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.312l-7.121-7.121c-1.17-1.17-1.17-3.073 0-4.242 1.094-1.094 2.978-1.138 4.121-.115v-4.834c0-1.654 1.346-3 3-3s3 1.346 3 3v4.834c1.143-1.023 3.027-.979 4.121.115 1.17 1.169 1.17 3.072 0 4.242l-7.121 7.121zm-5-10.242c-.268 0-.518.104-.707.293-.391.39-.391 1.023 0 1.414l5.707 5.707 5.707-5.707c.391-.391.391-1.024 0-1.414-.379-.379-1.035-.379-1.414 0l-3.293 3.293v-9.656c0-.551-.448-1-1-1s-1 .449-1 1v9.656l-3.293-3.293c-.189-.189-.439-.293-.707-.293z"></path>
                        </svg>
                    
                    </div>
                    <div className={styles.commentsContainer}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.commentsButton}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>
                        {(numComments<1000)?<span className={styles.commentsCounter}>{numComments}</span>:<span className={styles.commentsCounter}>{(numComments/1000).toFixed(1)}k</span>}
                    </div>
                </div>

                <div className={styles.postDataContainer}> 
                    <div className={styles.postInfoContainer}>
                        <div className={styles.postData}>
                            <img className={styles.subredditPhoto} src={iconUrl?iconUrl:reserverIconUrl} alt="Subreddit avatar"/>
                            <p className={styles.postCredits}>  <span className={styles.subredditName}>{subredditName} </span>by <span className={styles.userName}>u/{author}</span></p>
                            {hoursAgo<24&&hoursAgo>0?<p className={styles.timeAgo}>{hoursAgo}h ago</p>:hoursAgo<1?<p className={styles.timeAgo}>{minutesAgo}min ago</p>:<p className={styles.timeAgo}>{daysAgo}d ago</p>}
                        </div>
                        <hr className={styles.hr}/>
                           
                    </div>
                        <div className={(isGallery&&thumbnail!=="default")?styles.mediaContainerForGallery:styles.mediaContainer}>
                            <p className={styles.title}>{title}</p>  
                            {mediaContainer?mediaContainer:null}
                        </div>
                    
                </div>
            </div>
        
        
    )
}

export default PostBox;