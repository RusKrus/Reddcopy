import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { timeDecoder } from "../../helperData/helperFuncs";
import MediaContainer from "../mediaContainer/MediaContainer";
import LikesCounter from "../likesCounter/LikesCounter";
import styles from "./postBox.module.css";
import { PostBoxProps } from "../../helperData/types";



const PostBox = forwardRef<HTMLDivElement, PostBoxProps>((props, ref) => {
    
    //getting props
    const { deviceData,
            subredditName, 
            author, 
            title, 
            score, 
            imgResolutions,
            media, 
            time, 
            video, 
            mediaType, 
            iconUrlWithSearchParam, 
            reserverIconUrl, 
            selfTextHTML, 
            numComments, 
            isGallery, 
            thumbnail, 
            isNsfw, 
            htmlStringIframe, 
            flairText, 
            flairTextColor, 
            flairBackgroundColor, 
            isSelf, 
            id } = props;


    //getting time posted ago
    const timeAgo: string = timeDecoder(time);
    //getting alternative subreddit icon url
    const searchParamStart: number | null = iconUrlWithSearchParam ? iconUrlWithSearchParam.indexOf("?") : null;
    const iconUrl: string = searchParamStart ? iconUrlWithSearchParam.slice(0, searchParamStart) : iconUrlWithSearchParam;
    //selfAlone is a self media w/o selftext (only title) 
    const selfAlone: boolean = ((mediaType==="self"||isSelf)&&(!selfTextHTML))?true:false;


    const navigate = useNavigate();
    
        
    const handlePostBoxClick: () => void = () => {
        navigate("/"+subredditName+"/"+id, {state: true});
    }

    return (
        <div ref={ref} onClick={handlePostBoxClick} className={styles.postContainer} data-testid={"postBox"}>
            <div className={styles.actionContainer}>
                <LikesCounter score={score} containerType={"postBox"}/>
                <div className={styles.commentsContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.commentsButton}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                    {(numComments < 1000) ? <span className={styles.commentsCounter}>{numComments}</span> : <span className={styles.commentsCounter}>{(numComments / 1000).toFixed(1)}k</span>}
                </div>
            </div>

            <div data-testid="postContainer" className={styles.postDataContainer} style={{alignContent:selfAlone?"space-between":"first baseline"}}>
                <div className={styles.postInfoContainer}>
                    <div className={styles.postData}>
                        {(iconUrl||reserverIconUrl)&&<img className={styles.subredditPhoto} src={iconUrl ? iconUrl : reserverIconUrl} alt="Subreddit avatar" />}
                        <p className={styles.postCredits}>  <span className={styles.subredditName}>{subredditName} </span>by <span className={styles.userName}>u/{author}</span></p>
                        <p className={styles.timeAgo}>{timeAgo}</p>
                    </div>
                    <hr className={styles.hr} />

                </div>
                <MediaContainer containerType = "postBox"
                                deviceData={deviceData}
                                title = {title}
                                mediaType = {mediaType}
                                imgResolutions = {imgResolutions}
                                media = {media} 
                                video={video}
                                isGallery = {isGallery} 
                                thumbnail = {thumbnail}
                                isNsfw = {isNsfw}
                                isSelf={isSelf}
                                htmlDataForParseSelfText = {{selfTextHTML, htmlStringIframe}}
                                flairProps={{flairText, flairTextColor, flairBackgroundColor}}/>
            </div>
        </div>


    )
});

export default PostBox;

