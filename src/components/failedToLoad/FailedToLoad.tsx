import React from "react";
import styles from "./failedToLoad.module.css";
import { useAppDispatch } from '../../helperData/customHooks';
import { FailedToLoadProps } from "../../helperData/types";



function FailedToLoad(props: FailedToLoadProps){
    const {reloadAction, actionParam} = props
    const dispatch = useAppDispatch();
    const handleClick = (): void =>{
        dispatch(reloadAction(actionParam));
    }

    return (
        <div className={styles.failedDiv}>
            <h1 className={styles.goneWrongText}>Something gone wrong 😔</h1>
            <button className={styles.reTryBtn} onClick={handleClick}>Try again</button>
        </div>
    )
}

export default FailedToLoad;