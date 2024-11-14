import React, {useState, useEffect} from "react";
import styles from "./likesCounter.module.css";
import Skeleton from 'react-loading-skeleton';
import { LikesCounterProps } from "../../helperData/types";


function LikesCounter(props: LikesCounterProps){
    const {score=0, containerType} = props;
    //working on score logic
    const [changedScore, setChangedScore] = useState<number>(0);
    const [isLikeClicked, setIsLikeClicked] = useState<boolean>(false);
    const [isDislikeClicked, setIsDislikeClicked] = useState<boolean>(false);



    //useEffect is used because in case of refreshing the page score passed to setChangedScore is undefined and is not re-rendered when data is fethced 
    useEffect(() => {
        setChangedScore(score);
    }, [score])

    const onLikeClick = (e: React.MouseEvent<SVGElement>): void => {
        e.stopPropagation();
        setIsLikeClicked(!isLikeClicked);
        setIsDislikeClicked(false);
        if (changedScore === score) {
            setChangedScore(changedScore => changedScore + 1)
        }
        else if (changedScore > score) {
            setChangedScore(score)
        }
        else if (changedScore < score) {
            setChangedScore(changedScore => changedScore + 2)
        }
    }

    const onDislikeClick = (e: React.MouseEvent<SVGElement>): void => {
        e.stopPropagation()
        setIsDislikeClicked(!isDislikeClicked);
        setIsLikeClicked(false);
        if (changedScore === score) {
            setChangedScore(changedScore => changedScore - 1)
        }
        else if (changedScore < score) {
            setChangedScore(score)
        }
        else if (changedScore > score) {
            setChangedScore(changedScore => changedScore - 2)
        }

    }
    switch (containerType){
        case "postArea":
            return(
                <div className={styles.likesContainerPostArea}>
                    <svg onClick={onLikeClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isLikeClicked ? styles.clickedLikeBtnPostArea : styles.likeBtnPostArea} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                    {(changedScore < 1000) ? <span className={isLikeClicked ? styles.likesCounterGreen : isDislikeClicked ? styles.likesCounterRed : styles.likesCounter}>{changedScore}</span> : <span className={isLikeClicked ? styles.likesCounterGreen : isDislikeClicked ? styles.likesCounterRed : styles.likesCounter}>{(changedScore / 1000).toFixed(1)}k</span>}
                    <svg onClick={onDislikeClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isDislikeClicked ? styles.clickedDislikeBtnPostArea : styles.dislikeBtnPostArea} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                    </svg>
                </div>
            )
        case "comments":
            return (
                <div className={styles.likesContainerComments}>
                    <svg onClick={onLikeClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isLikeClicked ? styles.clickedLikeBtnComments : styles.likeBtnComments} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                    {(changedScore < 1000) ? <span className={isLikeClicked ? styles.likesCounterGreen : isDislikeClicked ? styles.likesCounterRed : styles.likesCounter}>{changedScore}</span> : <span className={isLikeClicked ? styles.likesCounterGreen : isDislikeClicked ? styles.likesCounterRed : styles.likesCounter}>{(changedScore / 1000).toFixed(1)}k</span>}
                    <svg onClick={onDislikeClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isDislikeClicked ? styles.clickedDislikeBtnComments : styles.dislikeBtnComments} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                    </svg>
                </div>
            )
        case "postBox":
            return(
                <div className={styles.likesContainerPostBox}>

                    <svg onClick={onLikeClick} stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" className={isLikeClicked ? styles.clickedLikeBtnPostBox : styles.likeBtnPostBox} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21c-1.654 0-3-1.346-3-3v-4.764c-1.143 1.024-3.025.979-4.121-.115-1.17-1.169-1.17-3.073 0-4.242l7.121-7.121 7.121 7.121c1.17 1.169 1.17 3.073 0 4.242-1.094 1.095-2.979 1.14-4.121.115v4.764c0 1.654-1.346 3-3 3zm-1-12.586v9.586c0 .551.448 1 1 1s1-.449 1-1v-9.586l3.293 3.293c.379.378 1.035.378 1.414 0 .391-.391.391-1.023 0-1.414l-5.707-5.707-5.707 5.707c-.391.391-.391 1.023 0 1.414.379.378 1.035.378 1.414 0l3.293-3.293z"></path>
                    </svg>

                    {(changedScore < 1000) ? <span className={isLikeClicked ? styles.likesCounterGreenPostBox : isDislikeClicked ? styles.likesCounterRedPostBox : styles.likesCounterPostBox}>{changedScore}</span> : <span className={isLikeClicked ? styles.likesCounterGreenPostBox : isDislikeClicked ? styles.likesCounterRedPostBox : styles.likesCounterPostBox}>{(changedScore / 1000).toFixed(1)}k</span>}

                    <svg onClick={onDislikeClick} stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" className={isDislikeClicked ? styles.clickedDislikeBtnPostBox : styles.dislikeBtnPostBox} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.312l-7.121-7.121c-1.17-1.17-1.17-3.073 0-4.242 1.094-1.094 2.978-1.138 4.121-.115v-4.834c0-1.654 1.346-3 3-3s3 1.346 3 3v4.834c1.143-1.023 3.027-.979 4.121.115 1.17 1.169 1.17 3.072 0 4.242l-7.121 7.121zm-5-10.242c-.268 0-.518.104-.707.293-.391.39-.391 1.023 0 1.414l5.707 5.707 5.707-5.707c.391-.391.391-1.024 0-1.414-.379-.379-1.035-.379-1.414 0l-3.293 3.293v-9.656c0-.551-.448-1-1-1s-1 .449-1 1v9.656l-3.293-3.293c-.189-.189-.439-.293-.707-.293z"></path>
                    </svg>

                </div>
            )
        case "postBoxLoading":
            return(
                <div className={styles.likesContainer}>
                    <svg  stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" className={styles.likeBtn} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21c-1.654 0-3-1.346-3-3v-4.764c-1.143 1.024-3.025.979-4.121-.115-1.17-1.169-1.17-3.073 0-4.242l7.121-7.121 7.121 7.121c1.17 1.169 1.17 3.073 0 4.242-1.094 1.095-2.979 1.14-4.121.115v4.764c0 1.654-1.346 3-3 3zm-1-12.586v9.586c0 .551.448 1 1 1s1-.449 1-1v-9.586l3.293 3.293c.379.378 1.035.378 1.414 0 .391-.391.391-1.023 0-1.414l-5.707-5.707-5.707 5.707c-.391.391-.391 1.023 0 1.414.379.378 1.035.378 1.414 0l3.293-3.293z"></path>
                    </svg>
                    <Skeleton containerClassName={styles.counterSkeleton}/>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" className={styles.dislikeBtn} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.312l-7.121-7.121c-1.17-1.17-1.17-3.073 0-4.242 1.094-1.094 2.978-1.138 4.121-.115v-4.834c0-1.654 1.346-3 3-3s3 1.346 3 3v4.834c1.143-1.023 3.027-.979 4.121.115 1.17 1.169 1.17 3.072 0 4.242l-7.121 7.121zm-5-10.242c-.268 0-.518.104-.707.293-.391.39-.391 1.023 0 1.414l5.707 5.707 5.707-5.707c.391-.391.391-1.024 0-1.414-.379-.379-1.035-.379-1.414 0l-3.293 3.293v-9.656c0-.551-.448-1-1-1s-1 .449-1 1v9.656l-3.293-3.293c-.189-.189-.439-.293-.707-.293z"></path>
                    </svg>
                </div>
            )
        default: 
            console.log("It is not possible to define container type for likes counter");
            return <div> Broken, check the console </div>
    }
}


export default LikesCounter; 