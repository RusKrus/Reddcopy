import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from "./postAreaLoading.module.css";
import LoadingCommentsArea from "../commentsArea/LoadingCommentsArea.jsx";



function PostAreaLoading() {
   return (
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
   )
}




export default PostAreaLoading;