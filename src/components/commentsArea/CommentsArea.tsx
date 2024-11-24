import { useEffect, useRef} from "react";
import styles from "./commentsArea.module.css"
import { timeDecoder, domElementObtainer } from "../../helperData/helperFuncs";
import LikesCounter from "../likesCounter/LikesCounter";
import { v4 as uuidv4 } from 'uuid';
import { CommentProps, Comment } from "../../helperData/types"


function CommentsArea({comment}: CommentProps){
    //getting comment info from props 
    const author: string=comment.data.author;
    const postedAgo: string=timeDecoder(comment.data.created_utc);
    const rawText=comment.data.body_html;
    const score=comment.data.score;
    const replies=comment.data.replies !== ""?comment.data.replies?.data.children: null;
    //parsing and inputing html text
    const textBoxRef = useRef<HTMLDivElement>(null);
    
    const textHTML: ChildNode | null = domElementObtainer(rawText);
    if (textHTML instanceof HTMLDivElement){
        textHTML.className = styles.textBox;
    }
    //useEffect is used here because first time page loaded - no elementToReplace is created and textHTML(text of a comment) is not generated
    useEffect(()=>{
        if (textBoxRef.current instanceof HTMLDivElement){
            const elementToReplace: HTMLDivElement | null = textBoxRef.current.querySelector(".toReplace");
            if(elementToReplace instanceof HTMLElement  && textHTML instanceof HTMLDivElement ){
                textBoxRef.current.replaceChild(textHTML, elementToReplace);
            }
        }
    }, [textHTML])

    return (
        <div className={styles.commentBox} ref={textBoxRef} >
            <p className={styles.commentInfo}>{author}<span className={styles.postedAgo}>• {postedAgo}</span></p>
            <p className="toReplace" data-testid="toReplace"></p>
            <LikesCounter score={score} containerType={"comments"}/>
            <div className={styles.reply} >
                {replies&&replies.filter((comment: Comment)=>comment.kind==="t1").map((reply: Comment)=><CommentsArea comment={reply} key={uuidv4()}  />)}
            </div>
            
        </div>
    )
}

export default CommentsArea;