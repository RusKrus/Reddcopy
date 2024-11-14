import he from 'he';
import { Post, GalleryInfoType, ImageGalleryProp, imgResolutions } from "./types"




//fucntion for preparing data for ImageGallery 
export const imageGalleryPrepared = (galleryInfo: GalleryInfoType): ImageGalleryProp[] => {
    const urlArrayToDecode: string[] = [];
    for (const imageKey in galleryInfo){
        urlArrayToDecode.push(galleryInfo[imageKey].s.u)
    }

    const decodedArray: string[] = [];
    for(const url of urlArrayToDecode){
        const decodedUrl: string = he.decode(url);
        decodedArray.push(decodedUrl);
    }
    
    const imageGalleryProps: ImageGalleryProp[] = [];

    for (const decodedUrl of decodedArray){
        imageGalleryProps.push({
            original:decodedUrl,
            thumbnail: decodedUrl,
            originalAlt: "gallery image",
            thumbnailAlt: "gallery image thumbnail",
        })
    } 

    return imageGalleryProps;
}

//getting HTML element from coded string
export const domElementObtainer = (htmlString:string): ChildNode | null=> {
    const decodedHtml: string = he.decode(htmlString);
    const parser: DOMParser = new DOMParser();
    const doc: Document = parser.parseFromString(decodedHtml, "text/html");
    const domElement: ChildNode | null = doc.body.firstChild; 
    
    return domElement ;
}

export const iframeElementObtainer= (htmlString: string, iframeDivRefValue: HTMLDivElement | null): void =>{
    const iframe: ChildNode | null = domElementObtainer(htmlString);
    if(iframe instanceof HTMLIFrameElement){
        iframe.width="100%";
        iframe.height="500px";
        iframe.style.position="relative";
        if(iframeDivRefValue instanceof HTMLDivElement&&iframeDivRefValue.children.length<1){
            iframeDivRefValue.appendChild(iframe);
        }
    }
    
}

export const aToImgLinkReplacer = (selfText: HTMLDivElement): void => {
    const elementChilds: HTMLCollection = selfText.children;
    const anchorParagraphsArray: Element[] = [];
    for(const child of elementChilds){
        if (child.querySelector('a') instanceof HTMLAnchorElement){
            anchorParagraphsArray.push(child);
        }
    }

    for(const child of anchorParagraphsArray){
        const anchorElement = child.querySelector('a');
        if(anchorElement instanceof HTMLAnchorElement && (anchorElement.href.includes(".jpg")|| anchorElement.href.includes("png"))){
            const tempRefContainer: string = anchorElement.href;
            const imgElement: HTMLImageElement = document.createElement("img");
            imgElement.src = tempRefContainer;
            imgElement.style.maxWidth = "100%";
            child.replaceChild(imgElement, anchorElement);
        }
    }
}

//creating decoded HTML for post area or post box (with fog or without)
export const selfTextElementObtainer = (htmlString: string, styles: { [className: string]: string }, selfTextRefValue: HTMLDivElement | null, mediaBoxType: string) => {
    const selfText: ChildNode | null = domElementObtainer(htmlString);
    if(selfText instanceof HTMLDivElement){
        aToImgLinkReplacer(selfText);
    }
    if(selfTextRefValue&&selfTextRefValue.children.length===0&&selfText instanceof HTMLElement){
        if(mediaBoxType==="postArea"){
            selfTextRefValue.className = styles.selfTextForPostArea;
            selfTextRefValue.appendChild(selfText);
        }
        else{
            if(htmlString.length>500){
                selfTextRefValue.className = styles.selfTextForPostBox;
                const fogDiv: HTMLDivElement = document.createElement("div");
                fogDiv.className = styles.fogEffectContainer;
                selfTextRefValue.appendChild(selfText);
                selfTextRefValue.appendChild(fogDiv);
            }
            else{
                selfTextRefValue.className = styles.selfTextForPostBox;
                selfTextRefValue.appendChild(selfText);
            }
        }
    }
    return selfText;
}

export const timeDecoder: (time: number)=> string = time => {
    const timePostedUtc: Date = new Date(time * 1000);
    const timePostedUtcUnix: number = timePostedUtc.getTime();
    const timeNowUtc: Date = new Date();
    const timeNowUtcUnix: number = timeNowUtc.getTime();
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
    else{
        return `Some time ago`
    }


}

export const searchFilter = (searchValue: string, postInfo: Post) => {
    const postData = postInfo.data;
    const valueToCheck: string = searchValue.toLowerCase();
    return (
        postData.subreddit_name_prefixed.toLowerCase().includes(valueToCheck) ||
        postData.author.toLowerCase().includes(valueToCheck) ||
        postData.title.toLowerCase().includes(valueToCheck) ||
        postData.selftext.toLowerCase().includes(valueToCheck))
}

export const imageDefiner = (url: string): boolean =>{
    const imageExtensionArray: string[] = ["jpg", "jpeg", "png", "gif", "webp", "avif"];

    if (typeof url !== "string"){
        return false;
    }

    for (const extension of imageExtensionArray){
        if (url.includes(extension)){
            return true;
        }
    }

    return false;
}


export const srcsetMaker = (imgResolutions: imgResolutions): string=>{
    let srcset: string = `${he.decode(imgResolutions.source.url)} ${imgResolutions.source.width}w` 
    for (const resolution of imgResolutions.resolutions){
        srcset = `${srcset}, ${he.decode(resolution.url)} ${resolution.width}w`
    }
    return srcset;
}