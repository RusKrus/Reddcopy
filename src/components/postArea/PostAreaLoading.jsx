import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from "./postAreaLoading.module.css";
import LoadingCommentsArea from "../commentsArea/LoadingCommentsArea.jsx";



function PostAreaLoading() {
   return (
      <>
         <div className={styles.loadingAreaSkeleton}>
            <div className={styles.mediaSkeletonBox}>
               <Skeleton className={styles.titleSkeleton} />
               <Skeleton className={styles.mediaSkeleton} />
            </div>
            <div className={styles.postInfoSkeletonBox}>
               <Skeleton containerClassName={styles.likeSleketonBox} />
               <Skeleton containerClassName={styles.postInfoSkeleton} />
            </div>
            <div className={styles.commentsAreaSkeletonBox}>
               <Skeleton className={styles.commentsCounter} />
               <hr className={styles.hrCommentsSkeleton} />
               {Array(Math.floor(Math.random()*5+3)).fill(0).map((ceil, num) => <LoadingCommentsArea key={num} />)}
            </div>
         </div>
         <div className={styles.subredditInfoBoxLoading}>
            <div className={styles.srNameAndImageLoading}>
               <Skeleton circle width="32px" height="32px"/>
               <Skeleton containerClassName={styles.srNameSkeletonContainer}/>
            </div>
            <hr className={styles.hrSrInfoLoading}></hr>
            <Skeleton count={Math.floor(Math.random()*3+2)}/>
            <hr className={styles.hrSrInfoLoading}></hr>
            <Skeleton style={{marginLeft:"25%", width:"50%"}}/>
         </div>
      </>
   )
}




export default PostAreaLoading;