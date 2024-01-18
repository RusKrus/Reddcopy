export const timeDecoder = time =>{
    const timePostedUtcUnix = new Date(time*1000);
    const timeNowUtc = new Date;
    const timeNowUtcUnix = timeNowUtc.getTime();
    const seconds = Math.floor((timeNowUtcUnix - timePostedUtcUnix)/1000)
    const minutes = Math.floor(seconds/60);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);
    const months = Math.floor(days/30);
    const years = Math.floor(months/12);

    if (years){
        if (years===1)
        {
            return `${years} year ago`
        }
        else {
            return `${years} years ago`
        }
    }
    else if (months){
        if (months===1){
            return `${months} month ago`
        }
        else {
            return `${months} months ago`
        }
    }
    else if (days){
        if (days===1){
            return `${days} day ago`
        }
        else {
            return `${days} days ago`
        }
    }
    else if(hours){
        if (hours===1){
            return `${hours} hour ago`
        }
        else {
            return `${hours} hours ago`
        }
    }
    else if(minutes){
        if (minutes===1){
            return `${minutes} minute ago`
        }
        else {
            return `${minutes} minutes ago`
        }
    }
    else if(seconds){
        if (seconds===1){
            return `${seconds} second ago`
        }
        else {
            return `${seconds} seconds ago`
        }
    }
    
    
}



