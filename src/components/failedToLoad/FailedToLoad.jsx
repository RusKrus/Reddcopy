import React from "react";
import styles from "./failedToLoad.module.css";



function FailedToLoad(){
    return (
        <div className={styles.failedDiv}>
            <h1 className={styles.goneWrongText}>Something gone wrong 😔</h1>
            <button className={styles.reTryButton}>Try again</button>
        </div>
    )
}