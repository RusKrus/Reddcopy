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


export const mediaContainerDefiner = (styles, mediaType, media, isZoomed, handlePhotoClick, forbidden, videoRef, video, isGallery, thumbnail, selfText) => {
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
            if (isZoomed !== undefined) {
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
            mediaContainer = <p className={styles.selfText}>{selfText.substring(0, 500)}... <a className={styles.postLink} href="#">read more</a></p>;
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
            else {
                selfText ? mediaContainer = <p className={styles.selfText}>{selfText.substring(0, 500)}...<a className={styles.postLink} href="#">read more</a></p> : mediaContainer = null;
                break;
            }
    }
    return mediaContainer;
}



