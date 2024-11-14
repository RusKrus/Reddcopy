import React from "react";
import styles from "./notFound.module.css";
import { clearFilterValue, clearInputValue }  from "../header/headerSlice"
import { useAppDispatch } from '../../helperData/customHooks';
import { NotFoundProps } from "../../helperData/types";

function NotFound(props: NotFoundProps){
    const { text } = props
    const dispatch = useAppDispatch();

    const handleBackClick = (): void =>{
        dispatch(clearFilterValue());
        dispatch(clearInputValue());
    }


    return(
    <div className={styles.notFound } data-testid = "not-found-button">
        <h1 className={styles.notFoundedInfo}>{text}</h1>
        <button onClick={handleBackClick} className={styles.goBackBtn}>Go back</button>
    </div>
    )
};


export default NotFound;