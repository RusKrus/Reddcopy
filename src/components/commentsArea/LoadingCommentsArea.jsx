import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from "./loadingCommentsContainer.module.css";

function LoadingCommentsArea(){
    return(
    <div className={styles.loadingCommentBox}>
        <Skeleton width="20%"/>
        <Skeleton count="2"/>
        <Skeleton width="10%"/>
    </div>
    )
}


export default LoadingCommentsArea;

