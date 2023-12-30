import React from "react";
import Header from "../header/Header";
import FeedArea from "../feedArea/FeedArea";
import CommunitiesArea from "../communitiesArea/CommunitiesArea.js"
import { Outlet } from "react-router-dom"
import styles from "./navigational.module.css"


function Navigational(){
    return (
    <div className={styles.blank}>
        <Header/>
        <FeedArea />
        <Outlet/>
    </div>
    )
}

export default Navigational;