import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from "./postAreaLoading.module.css";



function PostAreaLoading() {
   return (
      <div className={styles.loadingAreaSkeleton}>
         <div>
            <h3></h3>
         </div>
      </div>
   )
}




export default PostAreaLoading;