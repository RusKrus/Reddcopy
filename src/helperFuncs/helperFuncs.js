import he from 'he';

export const domElementObtainer = (htmlString) =>{
    const decodedHtml = he.decode(htmlString);
    const parser = new DOMParser();
    const doc = parser.parseFromString(decodedHtml, "text/html");
    const domElement = doc.body.firstChild; 
    return domElement;
}

const iframeElementObtainer = (htmlString, iframeRef) =>{
    const iframe = domElementObtainer(htmlString);
    iframe.width="100%";
    iframe.height="500px"
    if(iframeRef.current&&iframeRef.current.children.length<1){
        iframeRef.current.appendChild(iframe);
    }
}

const selfTextElementObtainer = (htmlString, styles, selfTextRef, mediaBoxType) =>{
    const selfText = domElementObtainer(htmlString);
    if(selfTextRef.current&&selfTextRef.current.children.length===0){
        if(mediaBoxType==="postArea"){
            selfText.className = styles.selfTextForPostArea;
            selfTextRef.current.appendChild(selfText);
        }
        else{
            selfText.className = styles.selfTextForPostBox;
            const fogDiv = document.createElement("div");
            fogDiv.className = styles.fogEffectContainer;
            selfTextRef.current.appendChild(selfText);
            selfTextRef.current.appendChild(fogDiv);
        }
        
    }
    return selfText;
}


export const timeDecoder = time => {
    const timePostedUtcUnix = new Date(time * 1000);
    const timeNowUtc = new Date();
    const timeNowUtcUnix = timeNowUtc.getTime();
    const seconds = Math.floor((timeNowUtcUnix - timePostedUtcUnix) / 1000)
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years) {
        if (years === 1) {
            return `${years} year ago`
        }
        else {
            return `${years} years ago`
        }
    }
    else if (months) {
        if (months === 1) {
            return `${months} month ago`
        }
        else {
            return `${months} months ago`
        }
    }
    else if (days) {
        if (days === 1) {
            return `${days} day ago`
        }
        else {
            return `${days} days ago`
        }
    }
    else if (hours) {
        if (hours === 1) {
            return `${hours} hour ago`
        }
        else {
            return `${hours} hours ago`
        }
    }
    else if (minutes) {
        if (minutes === 1) {
            return `${minutes} minute ago`
        }
        else {
            return `${minutes} minutes ago`
        }
    }
    else if (seconds) {
        if (seconds === 1) {
            return `${seconds} second ago`
        }
        else {
            return `${seconds} seconds ago`
        }
    }


}



export const searchFilter = (searchValue, postInfo) => {
    const postData = postInfo.data;
    const valueToCheck = searchValue.toLowerCase();
    return (postData.subreddit_name_prefixed.toLowerCase().includes(valueToCheck) ||
        postData.author.toLowerCase().includes(valueToCheck) ||
        postData.title.toLowerCase().includes(valueToCheck) ||
        postData.selftext.toLowerCase().includes(valueToCheck))
}


export const mediaContainerDefiner = (mediaBoxType ,styles, mediaType, media, forbidden, videoRef, isGallery, thumbnail, dataForParseSelfText, dataForParseIref, dataForPhotoZoom ) => {
    const {isZoomed, handlePhotoClick} = dataForPhotoZoom?dataForPhotoZoom:{};
    const {selfTextHTML, selfTextRef} = dataForParseSelfText;
    const {htmlStringIframe, iframeRef}= dataForParseIref;
    htmlStringIframe&&iframeElementObtainer(htmlStringIframe, iframeRef);
    selfTextHTML&&selfTextElementObtainer(selfTextHTML, styles, selfTextRef, mediaBoxType);
    const selfText = selfTextHTML; 


    let mediaContainer;
    switch (mediaType) {
        case "link":
            mediaContainer =
                <a href={media} className={styles.link}>{media.substring(0, 18)}...
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.linkIcon}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>
                </a>;
            break;
        case "image":
            if (mediaBoxType==="postArea") {
                mediaContainer =
                    <>
                        {isZoomed && <div onClick={handlePhotoClick} className={styles.activeOverlay}></div>}
                        <img onClick={handlePhotoClick} src={media} className={isZoomed ? styles.zoomedPostMediaPhoto : styles.postMediaPhoto} alt="Post media" />
                    </>
                break
            }
            else {
                mediaContainer = <img src={media} className={styles.postMedia} alt="Post media" />;
                break;
            }
        case "text":
            mediaContainer = <p>{media}</p>;
            break;
        case "self":
            if (forbidden === "postgamethread" || forbidden === "postgame") {
                mediaContainer = <a href="#">You can find detail about this post on reddit website</a>;
                break;
            }
            else if(selfText) {
                mediaContainer = <div className={styles.selfTextWithFogContainer} ref={selfTextRef}></div>;
            }
            
            
        case "rich:media":
            mediaContainer = <p><strong>I dont know how to handle rich:media yet...</strong></p>;
            break;
        case "rich:video":
            mediaContainer = <div  ref={iframeRef}></div>
            break;
        case "hosted:video":
            mediaContainer = <video ref={videoRef} controls className={styles.postMedia} alt="Post video">  Video is not avaliable</video>;
            break;

        default:
            console.log("default");
            if (forbidden === "postgamethread" || forbidden === "postgame") {
                mediaContainer = <a href="#" >You can find detail about this post on reddit website</a>;
                break;
            }
            else if (isGallery) {
                if (thumbnail !== "default") {
                    mediaContainer = <img src={thumbnail} />;
                    break;
                }
                else {
                    mediaContainer = <a href={media} className={styles.link}>{media.substring(0, 18)}...</a>
                }
            }
            else if(selfText) {
                mediaContainer = <div className={styles.selfTextWithFogContainer} ref={selfTextRef}></div>
            }
            else{
                mediaContainer=null;
                break;
            }
            
    }
    return mediaContainer;
}




