import React, { useEffect, useState } from "react";
import styles from "./upBtn.module.css"

function UpBtn():React.JSX.Element{

    const [isScrolledEnough, setIsScrolledEnough] = useState<boolean>(false)

    const handleScroll: ()=>void = () =>{
        const heightToTop: number = document.documentElement.scrollTop;
        if(heightToTop>2*document.documentElement.clientHeight){
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.upWord}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>
        </div>
    )
};

export default UpBtn;