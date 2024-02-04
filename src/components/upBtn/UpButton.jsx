import React, { useEffect, useState } from "react";
import styles from "./upBtn.module.css"

function UpBtn(){

    const [isScrolledEnough, setIsScrolledEnough] = useState(false)

    const handleScroll = () =>{
        if(document.documentElement.scrollTop>2*document.documentElement.clientHeight){
            setIsScrolledEnough(true)
        }
        else{
            setIsScrolledEnough(false)
        }
    };

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
        
    });

    const handleClick=()=>{
        window.scrollTo({top:0, behavior:"smooth"})
    }

    return (
        <div  onClick={handleClick} className={styles.upBtn} style={{display:isScrolledEnough?"flex":"none"}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.upSign}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
            </svg>
            <span className={styles.upWord}>Up</span>

        </div>
    )
}

export default UpBtn;