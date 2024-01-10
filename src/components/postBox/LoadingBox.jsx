import React from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from "./loadingBox.module.css";

const LoadingBox = () => {
    return(
        <div className={styles.loadingPostContainer}>
            <div className={styles.loadingActionContainer}> 
                <div className={styles.likesContainer}>
                    <svg  stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" className={styles.likeBtn} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21c-1.654 0-3-1.346-3-3v-4.764c-1.143 1.024-3.025.979-4.121-.115-1.17-1.169-1.17-3.073 0-4.242l7.121-7.121 7.121 7.121c1.17 1.169 1.17 3.073 0 4.242-1.094 1.095-2.979 1.14-4.121.115v4.764c0 1.654-1.346 3-3 3zm-1-12.586v9.586c0 .551.448 1 1 1s1-.449 1-1v-9.586l3.293 3.293c.379.378 1.035.378 1.414 0 .391-.391.391-1.023 0-1.414l-5.707-5.707-5.707 5.707c-.391.391-.391 1.023 0 1.414.379.378 1.035.378 1.414 0l3.293-3.293z"></path>
                    </svg>
                    <Skeleton width="100%"/>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" className={styles.dislikeBtn} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.312l-7.121-7.121c-1.17-1.17-1.17-3.073 0-4.242 1.094-1.094 2.978-1.138 4.121-.115v-4.834c0-1.654 1.346-3 3-3s3 1.346 3 3v4.834c1.143-1.023 3.027-.979 4.121.115 1.17 1.169 1.17 3.072 0 4.242l-7.121 7.121zm-5-10.242c-.268 0-.518.104-.707.293-.391.39-.391 1.023 0 1.414l5.707 5.707 5.707-5.707c.391-.391.391-1.024 0-1.414-.379-.379-1.035-.379-1.414 0l-3.293 3.293v-9.656c0-.551-.448-1-1-1s-1 .449-1 1v9.656l-3.293-3.293c-.189-.189-.439-.293-.707-.293z"></path>
                    </svg>
                </div>
                <div className={styles.commentsContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.commentsButton}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                    <Skeleton width="100%"/>

                </div>
            </div>
            <div className={styles.loadingPostDataContainer}>
                <div className={styles.loadingPostInfoContainer}>
                    <div className={styles.skeletonContainerAbout}>
                        <Skeleton style={{width:"100%", height:"0", paddingTop:"100%"}}circle  containerClassName={styles.skeletonContainerPhoto}  /> 
                        <Skeleton style={{lineHeight: ".9rem", width:"50%", marginLeft:"0.3rem"}} containerClassName={styles.skeletonContainerName}/>
                        <Skeleton  style={{lineHeight: ".9rem", width:"50%"}} containerClassName={styles.skeletonContainerTime}/>
                    </div>
                    
                    
                    <hr className={styles.hr}/>
                    <Skeleton style={{lineHeight: "1.3rem"}} containerClassName={styles.skeletonContainerTitle} />
                </div>
                <Skeleton style={{height:"53%", width:"100%", borderRadius:"0"}} containerClassName={styles.skeletonContainerMedia}/>
               
                
            </div>
            
        </div>
    )
}

export default LoadingBox
