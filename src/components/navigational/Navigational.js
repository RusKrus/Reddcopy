import React from "react";
import Header from "../header/Header";
import FeedArea from "../feedArea/FeedArea";
import CommentsArea from "../commentsArea/CommentsArea.js"
import CommunitiesArea from "../communitiesArea/CommunitiesArea.js"
import { Outlet } from "react-router-dom"
import styles from "./navigational.module.css"


function Navigational(){
    return (
    <div className={styles.blank}>
        <Header/>
        <CommentsArea/>
        <FeedArea />
        <CommunitiesArea/>
        <Outlet/>
    </div>
    )
}

export default Navigational;