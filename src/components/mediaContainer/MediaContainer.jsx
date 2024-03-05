import React, { useEffect, useRef } from "react";
import VideoJS from '../../videojs/VideoJS.jsx';
import {iframeElementObtainer, selfTextElementObtainer, imageGalleryPrepared} from "../../helperFuncs/helperFuncs.js" ;
import styles from "./mediaContainer.module.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";


function MediaContainer({containerType, galleryInfo, title, mediaType, media, video, isGallery, thumbnail, isSelf, htmlDataForParseSelfText, flairProps}){


    const {selfTextHTML, htmlStringIframe} = htmlDataForParseSelfText;
    const {flairText, flairTextColor, flairBackgroundColor} = flairProps
    const iframeRef = useRef(null);
    const selfTextRef = useRef(null);
    
    useEffect(()=>{
        htmlStringIframe&&iframeElementObtainer(htmlStringIframe, iframeRef);
        selfTextHTML&&selfTextElementObtainer(selfTextHTML, styles, selfTextRef, containerType);
    }, [selfTextRef.current, iframeRef.current])
    

    const flairTextStyle={
        width: 'fit-content',
        backgroundColor: flairBackgroundColor, 
        color: flairTextColor==="light"?"white":"black", 
        fontSize:"0.8rem", 
        borderRadius:"3px", 
        padding:"1px 1px 2px 1px",
    }

    const handleClick=e=>{
        if(document.fullscreenElement ){
            document.exitFullscreen() 
        }
        else{
            e.target.requestFullscreen();
 
        }
    }

    const preparedImageGalleryProperty = imageGalleryPrepared(galleryInfo, styles);


    //setting up video JS
    const playerRef = useRef(null);
    const handlePlayerReady = (player) => {
        playerRef.current = player;
    }
    
    const videoJsOptions = {
        muted:containerType==="postBox"?true:false,
        autoplay: true,
        controls: true,
        responsive: true,
        sources: [{
            src: video,
            type: 'application/x-mpegURL'
        }]
        };

    switch (mediaType) {
        case "link":
            if(containerType==="postArea"){
                
                return(
                    <div className={styles.mediaContainerForLink+" "+styles.defaultPostBox}> 
                        <div className={styles.linkPostTextInfoContainer}>
                            <h3 className={styles.title}>{title}</h3>
                            <p style={flairTextStyle}>{flairText}</p>
                            {selfTextHTML&&<div ref={selfTextRef}></div>}
                            <a href={media} rel="noreferrer" target="_blank" className={styles.link}>{media.substring(0, 26)}...
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.linkIcon}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>
                            </a>
                        </div>
                        <a href={media} rel="noreferrer" target="_blank" className={styles.anchorForImg}>
                            {thumbnail!=="default"?<img src={thumbnail} className={styles.linkImg}/>:
                            <div className={styles.linkImg}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.defaultImage}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>
                            </div>}
                        </a>
                    </div>
                )
            }
            else{
                return(
                    <div className={styles.mediaContainerForLink+" "+styles.defaultPostBox}> 
                        <div className={styles.linkPostTextInfoContainer}>
                            <h3 className={styles.title}>{title}</h3>
                            <p style={flairTextStyle}>{flairText}</p>
                            {selfTextHTML&&<div className={styles.selfTextWithFogContainer} ref={selfTextRef}></div>}
                            <a href={media} rel="noreferrer" target="_blank" className={styles.link}>{media.substring(0, 26)}...
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.linkIcon}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>
                            </a>
                        </div>
                        <a href={media} rel="noreferrer" target="_blank" className={styles.anchorForImg}>
                            {thumbnail!=="default"?<img src={thumbnail} className={styles.linkImg}/>:
                            <div className={styles.linkImg}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.defaultImage}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>
                            </div>}
                        </a>
                    </div>
                )
            }
        case "image":
            if (containerType==="postArea") {
                return(            
                    <div className={styles.defaultPostBox}> 
                        <h3 className={styles.title}>{title}</h3>
                        <p style={flairTextStyle}>{flairText}</p>
                        {selfTextHTML&&<div ref={selfTextRef}></div>}
                        <div className={styles.postMediaPhotoContainer}>
                            <img  onClick={handleClick} src={media} className={styles.postAreaMediaPhoto} alt="Post media" />
                        </div>
                    </div>
                )    
            }
            else {
                return(            
                    <div className={styles.defaultPostBox}> 
                        <h3 className={styles.title}>{title}</h3>
                        <p style={flairTextStyle}>{flairText}</p>
                        {selfTextHTML&&<div className={styles.selfTextWithFogContainer} ref={selfTextRef}></div>}
                        <div className={styles.postMediaPhotoContainer}>
                            <img src={media} className={styles.postBoxMediaPhoto} alt="Post media" />
                        </div>
                    </div>
                )    
            }
        case "self":
            if(containerType==="postArea"){
                return (            
                    <div className={styles.defaultPostBox}> 
                        <h3 className={styles.title}>{title} </h3>
                        <p style={flairTextStyle}>{flairText}</p>
                        {selfTextHTML&&<div ref={selfTextRef}></div>}
                    </div>
                )
            }
            else{
                return (         
                    <div className={styles.defaultPostBox}> 
                        <h3 className={styles.title}>{title} </h3>
                        <p style={flairTextStyle}>{flairText}</p>
                        {selfTextHTML&&<div className={styles.selfTextWithFogContainer} ref={selfTextRef}></div>}
                    </div>
                )   
            }
                
        case "rich:video":
            console.log("this")
            return (
                <div className={styles.defaultPostBox}> 
                    <h3 className={styles.title}>{title}</h3>
                    <p style={flairTextStyle}>{flairText}</p>
                    {selfTextHTML&&<div ref={selfTextRef} className={styles.videoAndFogContainer}></div>}
                    <div  className={styles.iframeContainer} ref={iframeRef}></div>
                </div>
            )
        case "hosted:video":
           
            return (
                <div className={styles.defaultPostBox}> 
                    <h3 className={styles.title}>{title}</h3>
                    <p style={flairTextStyle}>{flairText}</p>
                    {selfTextHTML&&<div ref={selfTextRef} className={styles.videoAndFogContainer}></div>}
                    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} classNames={[styles.postMediaVideoJS, styles.videoJSContainer]}/>
                </div>)

        default:
            if (isGallery) {
                if(containerType==="postArea"){
                    return(
                        <div className={styles.defaultPostBox}>
                            <h3 className={styles.title}>{title}</h3>
                            <p style={flairTextStyle}>{flairText}</p>
                            {selfTextHTML&&<div ref={selfTextRef}></div>}
                            <ImageGallery
                            items={preparedImageGalleryProperty}
                            infinite={false}
                            showPlayButton={false}
                            />
                        </div>
                    )
                }
                else{
                    
                    if (thumbnail.includes(".png")||thumbnail.includes(".jpg")) {
                        return (
                            <div className={styles.defaultPostBox+" "+styles.galleryContainerPostBox}> 
                                <div className={styles.titleAndFlairFlexPostBox}>
                                    <h3 className={styles.title}>{title}</h3>
                                    <p style={flairTextStyle}>{flairText}</p>
                                    {selfTextHTML&&<div className={styles.selfTextWithFogContainer} ref={selfTextRef}></div>}
                                </div>
                                <img src={thumbnail} className={styles.thumbnailGalleryPostBox}/>
                            </div>
                        )
                    }
                    else if(thumbnail==="default") {
                        return (
                            <div className={styles.defaultPostBox}> 
                                <h3 className={styles.title}>{title}</h3>
                                <p style={flairTextStyle}>{flairText}</p>
                                {selfTextHTML&&<div ref={selfTextRef} className={styles.selfTextWithFogContainer}></div>}
                            </div>
                        )
                    }
                    else{
                        return (
                            <div className={styles.defaultPostBox}> 
                                <h3 className={styles.title}>{title}</h3>
                                <p style={flairTextStyle}>{flairText}</p>
                                {selfTextHTML&&<div className={styles.selfTextWithFogContainer} ref={selfTextRef}></div>}
                                <a href={media} className={styles.link} rel="noreferrer" target="_blank">{media.substring(0, 26)}...</a>
                            </div>
                        )
                    }
                }
            }
            

            else if(isSelf) {
                
                if (thumbnail==="self"||thumbnail==="default"||thumbnail==="spoiler"){
                    if(containerType==="postArea"){
                        return (            
                            <div className={styles.defaultPostBox}> 
                                <h3 className={styles.title}>{title}</h3>
                                <p style={flairTextStyle}>{flairText}</p>
                                {selfTextHTML&&<div ref={selfTextRef}></div>}
                            </div>
                        )
                    }
                    else{
                        return (         
                            
                            <div className={styles.defaultPostBox}> 
                                <h3 className={styles.title}>{title} </h3>
                                <p style={flairTextStyle}>{flairText}</p>
                                {selfTextHTML&&<div className={styles.selfTextWithFogContainer} ref={selfTextRef}></div>}
                            </div>
                        )   
                    }
                }
                else if(thumbnail.includes(".png")||thumbnail.includes(".jpg")){
                    
                    return (
                        
                        <div className={styles.defaultPostBox}> 
                            <h3 className={styles.title}>{title}</h3>
                            <p style={flairTextStyle}>{flairText}</p>
                            {selfTextHTML&&<div ref={selfTextRef} className={styles.selfWithPhotoPostArea}></div>}
                        </div>
                    )
                }
                else{
                    return(
                        <div className={styles.defaultPostBox}> 
                    
                            <h3 className={styles.title}>{title}</h3>
                            <p style={flairTextStyle}>{flairText}</p>
                            {selfTextHTML&&<div ref={selfTextRef}></div>}
                            <a href={thumbnail} rel="noreferrer" target="_blank" className={styles.link}>{media.substring(0, 26)}...
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.linkIcon}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>
                            </a>
                        </div>
                    )
                    
                }
            }
            else{
                return (
                    <div className={styles.defaultPostBox}> 
                        <h3 className={styles.title}>{title}</h3>
                        <p style={flairTextStyle}>{flairText}</p>
                        {selfTextHTML&&<div ref={selfTextRef}></div>}
                        {media&&<a href={media} target="_blank" rel="noreferrer" className={styles.link}>{media.substring(0, 26)}...</a>}
                    </div>
                );

            }
            
    }
}


export default MediaContainer;