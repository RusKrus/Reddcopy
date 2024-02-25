import he from 'he';

export const domElementObtainer = (htmlString) =>{
    const decodedHtml = he.decode(htmlString);
    const parser = new DOMParser();
    const doc = parser.parseFromString(decodedHtml, "text/html");
    const domElement = doc.body.firstChild; 
    return domElement;
}

export const iframeElementObtainer = (htmlString, iframeRef) =>{
    const iframe = domElementObtainer(htmlString);
    iframe.width="100%";
    iframe.height="500px"
    if(iframeRef.current&&iframeRef.current.children.length<1){
        iframeRef.current.appendChild(iframe);
    }
}

export const selfTextElementObtainer = (htmlString, styles, selfTextRef, mediaBoxType) =>{
    const selfText = domElementObtainer(htmlString);
    if(selfTextRef.current&&selfTextRef.current.children.length===0){
        if(mediaBoxType==="postArea"){
            selfText.className = styles.selfTextForPostArea;
            selfTextRef.current.appendChild(selfText);
        }
        else{
            if(htmlString.length>500){
                selfText.className = styles.selfTextForPostBox;
                const fogDiv = document.createElement("div");
                fogDiv.className = styles.fogEffectContainer;
                selfTextRef.current.appendChild(selfText);
                selfTextRef.current.appendChild(fogDiv);
            }
            else{
                selfText.className = styles.selfTextForPostBox;
                selfTextRef.current.appendChild(selfText);
            }
            
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



export const intersectHandler = async (entries) =>{
    
    const videoElement = entries[0].target.querySelector('video');
    try{
        if(entries[0].isIntersecting){
            await videoElement.play();
        }
        else{
            videoElement.pause();
        }
    }
    catch(e){
        console.log(e);
    }
    
}   