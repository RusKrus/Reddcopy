import React from "react";
import styles from "./failedToLoad.module.css";
import { useDispatch } from "react-redux";



function FailedToLoad({reloadAction, actionParam}){
    const dispatch = useDispatch();
    const handleClick = () =>{
        dispatch(reloadAction(actionParam));
    }
    console.log(actionParam);

    return (
        <div className={styles.failedDiv}>
            <h1 className={styles.goneWrongText}>Something gone wrong 😔</h1>
            <button className={styles.reTryBtn} onClick={handleClick}>Try again</button>
        </div>
    )
}

export default FailedToLoad;