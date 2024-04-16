import React, { useEffect, useRef} from "react";
import styles from "./commentsArea.module.css"
import { timeDecoder, domElementObtainer } from "../../helperFuncs/helperFuncs";
import LikesCounter from "../likesCounter/LikesCounter.jsx";
import { v4 as uuidv4 } from 'uuid';


function CommentsArea({comment}){
    //getting comment info from props 
    const author=comment.data.author;
    const postedAgo=timeDecoder(comment.data.created_utc);
    const rawText=comment.data.body_html;
    const score=comment.data.score;
    const replies=comment.data.replies?.data?.children;

    //parsing and inputing html text
    const textBoxRef = useRef(null);
    
    const textHTML = domElementObtainer(rawText);
    textHTML.className = styles.textBox;
   
    //useEffect is used here because first time page loaded - no elementToReplace is created and textHTML(text of a comment) is not generated
    useEffect(()=>{
        if (textBoxRef.current){
            const elementToReplace = textBoxRef.current.querySelector(".toReplace");
            if(elementToReplace){
                textBoxRef.current.replaceChild(textHTML, elementToReplace);
            }
        }
    }, [textBoxRef.current])

    return (
        <div className={styles.commentBox} ref={textBoxRef} >
            <p className={styles.commentInfo}>{author}<span className={styles.postedAgo}>• {postedAgo}</span></p>
            <p className="toReplace" ></p>
            <LikesCounter score={score} containerType={"comments"}/>
            <div className={styles.reply} >
                {replies&&replies.filter(comment=>comment.kind==="t1").map(reply=><CommentsArea comment={reply} key={uuidv4()}  />)}
            </div>
            
        </div>
    )
}


export default CommentsArea;