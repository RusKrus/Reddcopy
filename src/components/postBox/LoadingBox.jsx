import React from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from "./loadingBox.module.css";
import LikesCounter from "../likesCounter/LikesCounter.jsx";

const LoadingBox = () => {
    return(
        <div className={styles.loadingPostContainer}>
            <div className={styles.loadingActionContainer}> 
                <LikesCounter containerType="postBoxLoading" />
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
                <Skeleton height = {"15rem"}containerClassName={styles.skeletonContainerMedia}/>
               
                
            </div>
            
        </div>
    )
}

export default LoadingBox
