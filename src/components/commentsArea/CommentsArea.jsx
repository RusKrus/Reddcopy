import React from "react";
import styles from "./commentsArea.module.css"
import { timeDecoder } from "../../helperFuncs/helperFuncs";


function CommentsArea({comment}){
    //getting comment info from props 
    const author=comment.data.author;
    const postedAgo=timeDecoder(comment.data.created_utc);
    const text=comment.data.body;
    const score=comment.data.score;
    const replies=comment.data.replies?.data?.children;
    


    return (
        <div className={styles.commentBox}>
            <p>{author}<span> {postedAgo}</span></p>
            <p>{text}</p>
            <div><span>{score}</span></div>
            <div className={styles.reply}>
                {replies&&replies.map(reply=><CommentsArea comment={reply}/>)}
            </div>
            
        </div>
    )
}


export default CommentsArea;