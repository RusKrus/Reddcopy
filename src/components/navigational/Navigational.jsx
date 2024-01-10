import React from "react";
import Header from "../header/Header";
import CommunitiesArea from "../communitiesArea/CommunitiesArea"
import { Outlet } from "react-router-dom"
import styles from "./navigational.module.css"


function Navigational(){
    return (
    <div className={styles.blank}>
        <Header/>
        <Outlet/>
    </div>
    )
}

export default Navigational;