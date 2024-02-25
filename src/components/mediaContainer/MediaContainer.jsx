import React, { useEffect, useRef } from "react";
import VideoJS from '../../videojs/VideoJS.jsx';
import {iframeElementObtainer, selfTextElementObtainer} from "../../helperFuncs/helperFuncs.js" ;
import styles from "./mediaContainer.module.css";


function MediaContainer({mediaBoxType ,title, mediaType, media, forbidden, video, isGallery, thumbnail, isSelf, dataForParseSelfText, dataForParseIref, dataForPhotoZoom}){

    const {isZoomed, handlePhotoClick} = dataForPhotoZoom?dataForPhotoZoom:{};
    const {selfTextHTML, selfTextRef} = dataForParseSelfText;
    const {htmlStringIframe, iframeRef}= dataForParseIref;
    useEffect(()=>{
        htmlStringIframe&&iframeElementObtainer(htmlStringIframe, iframeRef);
        selfTextHTML&&selfTextElementObtainer(selfTextHTML, styles, selfTextRef, mediaBoxType);
    }, [selfTextRef.current, iframeRef.current])
    

    //setting up video JS
    const playerRef = useRef(null);
    const handlePlayerReady = (player) => {
        playerRef.current = player;
    }
    
    const videoJsOptions = {
        muted:mediaBoxType==="postBox"?true:false,
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
            if(mediaBoxType==="postArea"){
                return(
                    <div className={styles.mediaContainerForLink+" "+styles.defaultPostBox}> 
                        <div className={styles.linkPostTextInfoContainer}>
                            <h3 className={styles.title}>{title}</h3>
                            <a href={media} rel="noreferrer" target="_blank" className={styles.link}>{media.substring(0, 26)}...
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.linkIcon}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>
                            </a>
                        </div>
                        <a href={media} rel="noreferrer" target="_blank" className={styles.anchorForImg}>
                            {thumbnail!=="default"?<img src={thumbnail} className={styles.linkImg}/>:null}
                        </a>
                    </div>
                )
            }
            else{
                return(
                    <div className={styles.mediaContainerForLink+" "+styles.defaultPostBox}> 
                        <div className={styles.linkPostTextInfoContainer}>
                            <h3 className={styles.title}>{title}</h3>
                            <a href={media} rel="noreferrer" target="_blank" className={styles.link}>{media.substring(0, 26)}...
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.linkIcon}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>
                            </a>
                        </div>
                        <a href={media} rel="noreferrer" target="_blank" className={styles.anchorForImg}>
                            {thumbnail!=="default"?<img src={thumbnail} className={styles.linkImg}/>:null}
                        </a>
                    </div>
                )
            }
        case "image":
            if (mediaBoxType==="postArea") {
                return(            
                    <div className={styles.defaultPostBox}> 
                        <h3 className={styles.title}>{title}</h3>
                        <div className={styles.postMediaPhotoContainer}>
                            {isZoomed && <div onClick={handlePhotoClick} className={styles.activeOverlay}></div>}
                            <img onClick={handlePhotoClick} src={media} className={isZoomed ? styles.zoomedPostMediaPhoto : styles.postAreaMediaPhoto} alt="Post media" />
                        </div>
                    </div>
                )    
            }
            else {
                return(            
                    <div className={styles.defaultPostBox}> 
                        <h3 className={styles.title}>{title}</h3>
                        <div className={styles.postMediaPhotoContainer}>
                            <img src={media} className={styles.postBoxMediaPhoto} alt="Post media" />
                        </div>
                    </div>
                )    
            }
        case "self":
            if(mediaBoxType==="postArea"){
                return (            
                    <div className={styles.defaultPostBox}> 
                        <h3 className={styles.title}>{title} </h3>
                        <div ref={selfTextRef}></div>
                    </div>
                )
            }
            else{
                return (         
                    <div className={styles.defaultPostBox}> 
                        <h3 className={styles.title}>{title} </h3>
                        <div className={styles.selfTextWithFogContainer} ref={selfTextRef}></div>
                    </div>
                )   
            }
                
        case "rich:video":
            return (
                <div className={styles.defaultPostBox}> 
                    <h3 className={styles.title}>{title}</h3>
                    <div  className={styles.iframeContainer} ref={iframeRef}></div>
                </div>
            )
        case "hosted:video":
            return (
                <div className={styles.defaultPostBox}> 
                    <h3 className={styles.title}>{title}</h3>
                    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} classNames={[styles.postMediaVideoJS, styles.videoJSContainer]}/>
                </div>)

        default:
            
            if (isGallery) {
                if (thumbnail.includes("png")||thumbnail.includes("jpg")) {
                    console.log("FOUNDED")
                    return (
                        <div className={styles.defaultPostBox+" "+styles.galleryContainerPostBox}> 
                            <h3 className={styles.titleGalleryPostBox}>{title}</h3>
                            <img src={thumbnail} className={styles.thumbnailGalleryPostBox}/>
                        </div>
                    )
                }
                else if(thumbnail==="default") {
                    return (
                        <div className={styles.defaultPostBox}> 
                            <h3 className={styles.title}>{title}</h3>
                        </div>
                    )
                }
                else{
                    return (
                        <div className={styles.defaultPostBox}> 
                            <h3 className={styles.title}>{title}</h3>
                            <a href={media} className={styles.link} rel="noreferrer" target="_blank">{media.substring(0, 26)}...</a>
                        </div>
                    )
                }
            }
            else if(isSelf) {
                if (thumbnail==="self"||thumbnail==="default"||thumbnail==="spoiler"){
                    if(mediaBoxType==="postArea"){
                        return (            
                            <div className={styles.defaultPostBox}> 
                                <h3 className={styles.title}>{title}{thumbnail}</h3>
                                <div ref={selfTextRef}></div>
                                
                            </div>
                        )
                    }
                    else{
                        return (         
                            <div className={styles.defaultPostBox}> 
                                <h3 className={styles.title}>{title} </h3>
                                <div className={styles.selfTextWithFogContainer} ref={selfTextRef}></div>
                            </div>
                        )   
                    }
                }
                else if(thumbnail.includes("png")||thumbnail.includes("jpg")){
                    return (
                        <div className={styles.defaultPostBox}> 
                            <h3 className={styles.title}>{title}</h3>
                            <img src={thumbnail} />
                        </div>
                    )
                }
                else{
                    return(
                        <div className={styles.defaultPostBox}> 
                    
                        <h3 className={styles.title}>{title}</h3>
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
                        {media&&<a href={media} target="_blank" rel="noreferrer" className={styles.link}>{media.substring(0, 26)}...</a>}
                    </div>
                );

            }
            
    }
}


export default MediaContainer;