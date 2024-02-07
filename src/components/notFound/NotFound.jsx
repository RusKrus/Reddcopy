import React from "react";
import styles from "./notFound.module.css";
import { clearFilterValue, clearInputValue }  from "../header/headerSlice"
import {  useDispatch } from 'react-redux';

function NotFound({text}){
    const dispatch = useDispatch();

    const handleBackClick = () =>{
        dispatch(clearFilterValue());
        dispatch(clearInputValue());
    }


    return(
    <div className={styles.notFounded}>
        <h1 className={styles.notFoundedInfo}>{text}</h1>
        <button onClick={handleBackClick} className={styles.goBackBtn}>Go back</button>
    </div>
    )
};


export default NotFound;