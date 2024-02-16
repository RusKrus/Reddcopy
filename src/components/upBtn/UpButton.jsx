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
            <span className={styles.upWord}>Go to the top</span>
        </div>
    )
}

export default UpBtn;