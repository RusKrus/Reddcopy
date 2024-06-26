import React, { useEffect, useRef, useState } from "react";
import VideoJS from '../../videojs/VideoJS.jsx';
import {iframeElementObtainer, selfTextElementObtainer, imageGalleryPrepared, imageDefiner, srcsetMaker} from "../../helperFuncs/helperFuncs.js" ;
import styles from "./mediaContainer.module.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";



const MediaContainer = function MediaContainer({containerType, deviceData, galleryInfo, title, mediaType, imgResolutions, media, video, isGallery, thumbnail, isNsfw, isSelf, htmlDataForParseSelfText, flairProps}){

    //getting data from props
    const {selfTextHTML, htmlStringIframe} = htmlDataForParseSelfText;
    const {flairText, flairTextColor, flairBackgroundColor} = flairProps
    //setting up refs for element obtainer funcs
    const iframeRef = useRef(null);
    const selfTextRef = useRef(null);
    
    useEffect(()=>{
        htmlStringIframe&&iframeElementObtainer(htmlStringIframe, iframeRef);
        selfTextHTML&&selfTextElementObtainer(selfTextHTML, styles, selfTextRef, containerType);
    }, [htmlStringIframe, iframeRef, selfTextHTML, containerType])
    

    const flairTextStyle={
        width: 'fit-content',
        backgroundColor: flairBackgroundColor, 
        color: flairTextColor==="light"?"white":"black", 
        fontSize:"0.8rem", 
        borderRadius:"3px", 
        padding:"1px 1px 2px 1px",
    }

    //photo click inside post area handler 
    const handleZoomClick=e=>{
        if(document.fullscreenElement ){
            document.exitFullscreen() 
        }
        else{
            e.target.requestFullscreen();
        }
    }
    
    //show nsfw button handler 
    const [isShowNsfwClicked, setIsShowNsfwClicked] = useState(!isNsfw);
    const handleSeeNsfwClickDiv =e=>{
        e.stopPropagation();
        e.target.remove();
        setIsShowNsfwClicked(true);
    }

    const handleSeeNsfwClickSpan =e=>{
        e.stopPropagation();
        e.target.parentNode.remove();
        setIsShowNsfwClicked(true);
    }

    
    //for gallery
    const preparedImageGalleryProperty = imageGalleryPrepared(galleryInfo, styles);

    //defining apple mobile device 
    const isAppleMobileDevice = (deviceData.type==="mobile"||deviceData.type==="tablet")&&deviceData.vendor==="Apple"?true:false;

    //image size defining and decoding
    
    const imgSrcDecoded = imgResolutions?srcsetMaker(imgResolutions):null ;

    //setting up video JS
    const playerRef = useRef(null);
    const handlePlayerReady = (player) => {
        playerRef.current = player;
    }
    
    const videoJsOptions = {
        muted:containerType==="postBox"?true:false,
        autoplay: false,
        controls: true,
        responsive: true,
        sources: [{
            src: video,
            type: 'application/x-mpegURL'
        }]
        };
        
    switch (mediaType) {
        case "link":
                return(
                    <div className={styles.mediaContainerForLink+" "+styles.defaultPostContainer}> 
                        {isNsfw&&<p className={styles.nsfwWarning}>NSFW content warning!</p>}
                        <div className={styles.linkPostTextInfoContainer}>
                            <h3 className={styles.title}>{title}</h3>
                            <p style={flairTextStyle}>{flairText}</p>
                            {selfTextHTML&&<div className={containerType==="postArea"?null:styles.selfTextWithFogContainer} ref={selfTextRef}></div>}
                            <a href={media} rel="noreferrer" target="_blank" className={styles.link}>{media.substring(0, 26)}...
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.linkIcon}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>
                            </a>
                        </div>
                        <a href={media} rel="noreferrer" target="_blank" className={styles.anchorForImg}>
                            {thumbnail!=="default"?<img src={thumbnail} className={styles.linkImg} alt="limk preview"/>:
                            <div className={styles.linkImg}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.defaultImage}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>
                            </div>}
                        </a>
                    </div>
                )
        case "image":
                return(            
                    <div className={styles.defaultPostContainer}> 
                        {isNsfw&&<p className={styles.nsfwWarning}>NSFW content warning!</p>}
                        <h3 className={styles.title}>{title}</h3>
                        <p style={flairTextStyle}>{flairText}</p>
                        {selfTextHTML&&<div className={styles.selfTextWithFogContainer} ref={selfTextRef} ></div>}
                        <div className={styles.postMediaPhotoContainer}>
                            <img  height={containerType==="postArea"?"600px":"512px"} onClick={containerType==="postArea"?handleZoomClick:null}  srcSet ={imgSrcDecoded} sizes="70vw" className={containerType==="postArea"?isShowNsfwClicked?styles.postAreaMediaPhoto:styles.postAreaNsfwPhoto:isShowNsfwClicked?styles.postBoxMediaPhoto:styles.postBoxNsfwPhoto} alt="Post media" />
                            {isNsfw&&
                                <div className={styles.nsfw_fog} onClick={handleSeeNsfwClickDiv}>
                                    <span className={styles.seePostButton} onClick={handleSeeNsfwClickSpan}>See the post</span>
                                </div>
                            }
                        </div>
                    </div>
                )    

        case "self":
                return (         
                    <div className={styles.defaultPostContainer}> 
                        {isNsfw&&<p className={styles.nsfwWarning}>NSFW content warning!</p>}
                        <h3 className={styles.title}>{title} </h3>
                        <p style={flairTextStyle}>{flairText}</p>
                        {selfTextHTML&&<div className={containerType==="postArea"?null:styles.selfTextWithFogContainer} ref={selfTextRef}></div>}
                    </div>
                )   
                
        case "rich:video":
            return (
                <div className={styles.defaultPostContainer}> 
                    {isNsfw&&<p className={styles.nsfwWarning}>NSFW content warning!</p>}
                    <h3 className={styles.title}>{title}</h3>
                    <p style={flairTextStyle}>{flairText}</p>
                    {selfTextHTML&&<div ref={selfTextRef} className={styles.videoAndFogContainer}></div>}
                    <div  className={styles.iframeContainer} ref={iframeRef} ></div>
                </div>
            )
        case "hosted:video":
            return (
                <div className={styles.defaultPostContainer}>
                    {isNsfw&&<p className={styles.nsfwWarning}>NSFW content warning!</p>} 
                    <h3 className={styles.title}>{title}</h3>
                    <p style={flairTextStyle}>{flairText}</p>
                    {selfTextHTML&&<div ref={selfTextRef} className={styles.videoAndFogContainer}></div>}
                    <div className={styles.videoJSContainer} >
                        <VideoJS  options={videoJsOptions} onReady={handlePlayerReady}  className={containerType==="postArea"?styles.postAreaMediaVideoJS:styles.postBoxMediaVideoJS} isShowNsfwClicked={isShowNsfwClicked} isAppleMobileDevice={isAppleMobileDevice}/>
                        {isNsfw&&
                            <div className={styles.nsfw_fog} onClick={handleSeeNsfwClickDiv}>
                                <span className={styles.seePostButton} onClick={handleSeeNsfwClickSpan}>See the post</span>
                            </div>
                        }
                    </div>
                    
                </div>)

        default:
            if (isGallery) {
                if(containerType==="postArea"){
                    return(
                        <div className={styles.defaultPostContainer}>
                            {isNsfw&&<p className={styles.nsfwWarning}>NSFW content warning!</p>}
                            <h3 className={styles.title}>{title}</h3>
                            <p style={flairTextStyle}>{flairText}</p>
                            {selfTextHTML&&<div ref={selfTextRef}></div>}
                            <ImageGallery
                            items={preparedImageGalleryProperty}
                            infinite={false}
                            showPlayButton={false}
                            showThumbnails={false}
                            slideDuration={200}
                            showBullets={true}
                            />
                        </div>
                    )
                }
                else if (containerType==="postBox"){
                    if (thumbnail.includes(".png")||thumbnail.includes(".jpg")) {
                        return (
                            <div className={styles.defaultPostContainer+" "+styles.galleryContainerPostBox}> 
                                {isNsfw&&<p className={styles.nsfwWarning}>NSFW content warning!</p>}
                                <div className={styles.titleAndFlairFlexPostBox}>
                                    <h3 className={styles.title}>{title}</h3>
                                    <p style={flairTextStyle}>{flairText}</p>
                                    {selfTextHTML&&<div className={styles.selfTextWithFogContainer} ref={selfTextRef}></div>}
                                </div>
                                <img src={thumbnail} className={styles.thumbnailGalleryPostBox} alt="gallery thumnail"/>
                            </div>
                        )
                    }
                    else if(thumbnail==="default") {
                        return (
                            <div className={styles.defaultPostContainer}> 
                                {isNsfw&&<p className={styles.nsfwWarning}>NSFW content warning!</p>}
                                <h3 className={styles.title}>{title}</h3>
                                <p style={flairTextStyle}>{flairText}</p>
                                {selfTextHTML&&<div ref={selfTextRef} className={styles.selfTextWithFogContainer}></div>}
                            </div>
                        )
                    }
                    else{
                        return (
                            <div className={styles.defaultPostContainer}> 
                                {isNsfw&&<p className={styles.nsfwWarning}>NSFW content warning!</p>}
                                <h3 className={styles.title}>{title}</h3>
                                <p style={flairTextStyle}>{flairText}</p>
                                {selfTextHTML&&<div className={styles.selfTextWithFogContainer} ref={selfTextRef}></div>}
                                <a href={imgSrcDecoded ?imgSrcDecoded :media} className={styles.link} rel="noreferrer" target="_blank">{media.substring(0, 26)}...</a>
                            </div>
                        )
                    }
                }
            }
            

            else if(isSelf) {
                if (thumbnail==="self"||thumbnail==="default"||thumbnail==="spoiler"){
                    return (   
                        <div className={styles.defaultPostContainer}> 
                            {isNsfw&&<p className={styles.nsfwWarning}>NSFW content warning!</p>}
                            <h3 className={styles.title}>{title} </h3>
                            <p style={flairTextStyle}>{flairText}</p>
                            {selfTextHTML&&<div className={containerType==="postArea"?null:styles.selfTextWithFogContainer} ref={selfTextRef}></div>}
                        </div>
                    )   
                }

                else if(thumbnail.includes(".png")||thumbnail.includes(".jpg")){
                    return (
                        <div className={styles.defaultPostContainer}> 
                            {isNsfw&&<p className={styles.nsfwWarning}>NSFW content warning!</p>}
                            <h3 className={styles.title}>{title}</h3>
                            <p style={flairTextStyle}>{flairText}</p>
                            {selfTextHTML&&<div ref={selfTextRef} className={styles.selfWithPhotoPostArea}></div>}
                        </div>
                    )
                }

                else{
                    return(
                        <div className={styles.defaultPostContainer}> 
                            <h3 className={styles.title}>{title}</h3>
                            <p style={flairTextStyle}>{flairText}</p>
                            {selfTextHTML&&<div ref={selfTextRef} className={styles.selfWithPhotoPostArea}></div>}
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
                    <div className={styles.defaultPostContainer}> 
                        {isNsfw&&<p className={styles.nsfwWarning}>NSFW content warning!</p>}
                        <h3 className={styles.title}>{title}</h3>
                        <p style={flairTextStyle}>{flairText}</p>
                        {selfTextHTML&&<div ref={selfTextRef}></div>}
                        {media?imageDefiner(media)?
                            <div className={styles.postMediaPhotoContainer}>
                                <img  onClick={containerType==="postArea"?handleZoomClick:null} src={media} className={containerType==="postArea"?isShowNsfwClicked?styles.postAreaMediaPhoto:styles.postAreaNsfwPhoto:isShowNsfwClicked?styles.postBoxMediaPhoto:styles.postBoxNsfwPhoto} alt="Post media" />
                                {isNsfw&&
                                    <div className={styles.nsfw_fog} onClick={handleSeeNsfwClickDiv}>
                                        <span className={styles.seePostButton} onClick={handleSeeNsfwClickSpan}>See the post</span>
                                    </div>
                                }
                            </div>:
                            <a href={imgSrcDecoded ?imgSrcDecoded :media} target="_blank" rel="noreferrer" className={styles.link}>{media.substring(0, 26)}...</a>:null}
                    </div>
                );
            }   
    }
}


export default MediaContainer;