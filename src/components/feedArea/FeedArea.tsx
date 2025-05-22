import { useEffect, useRef } from "react";
import styles from "./feedArea.module.css";
import LoadingBox from "../postBox/LoadingBox";
import UpBtn from "../upBtn/UpButton";
import ContentFilter from "../contentFilter/ContentFilter"
import ContentFilterMobile from "../contentFilter/ContentFilterMobile"
import NotFound from "../notFound/NotFound";
import FailedToLoad from "../failedToLoad/FailedToLoad";
import { useAppSelector, useAppDispatch } from '../../helperData/customHooks';
import { fetchingData } from "./feedAreaSlice";
import { searchFilter } from "../../helperData/helperFuncs";
import { useParams } from "react-router-dom"; 
import UAParser from "ua-parser-js";
import { switchHeaderVisibility }  from "../header/headerSlice";
import { ObserverEntryType, ParserResult, DeviceData, initialFeedAreatState, Post } from "../../helperData/types";
import NewsFeed from './NewsFeed';



function FeedArea() {

    const itemToLoadContent = useRef<HTMLDivElement>(null);
    const observerLoader = useRef <IntersectionObserver| null >  (null);
    const {postFilterParam} = useParams();
    const dispatch = useAppDispatch();
    
    const filterValue: string = useAppSelector(state => state.header.filterValue);
    const postsInfo: initialFeedAreatState = useAppSelector(state => state.feedArea);
    const after: string = postsInfo.after;
    const status: string = postsInfo.status;
    const activeParam: string = postFilterParam||"top";


    //getting user's device data
    const UAresults: ParserResult = new UAParser();
    const deviceData: DeviceData = UAresults.getDevice();

    const endReachedCallback = () => {
        if(status!=='loading'){
            dispatch(fetchingData({searchParam: activeParam, after}));
        }
        
    };

    useEffect(() => {
        if( postsInfo.posts[activeParam].length===0){  
            dispatch(fetchingData({ searchParam: activeParam }));
        }
        dispatch(switchHeaderVisibility(true));        
    }, [activeParam, dispatch, postsInfo.posts]);

    


    useEffect(()=>{
        const newPostsLoader=(entries: ObserverEntryType[]): void=>{
            if (entries[0].isIntersecting){
                dispatch(fetchingData({searchParam: activeParam, after}));
            };
        }

        if(observerLoader.current instanceof IntersectionObserver){
            observerLoader.current.disconnect();
        }
        observerLoader.current = new IntersectionObserver(newPostsLoader);
        if(itemToLoadContent.current instanceof HTMLDivElement){
            observerLoader.current.observe(itemToLoadContent.current);
        }
    }, [after, dispatch, activeParam])

    const filteredPosts = postsInfo.posts[activeParam].filter((postInfo: Post) => searchFilter(filterValue, postInfo));
    
    return (
        <main className={styles.feedArea}>
            <ContentFilter />
            <ContentFilterMobile/>
            {(status === "loading"&&filteredPosts.length===0) && Array(Math.floor(Math.random() * 5 + 3)).fill(0).map((ceil, num) => <LoadingBox key={num} />)}
            {(status === "loaded"||filteredPosts.length>0)&&
            <section className='feedSection'>
                {
                    filteredPosts.length > 0 ?
                    <>  
                        <NewsFeed 
                            filteredPosts = {filteredPosts}
                            deviceData = {deviceData}
                            endReachedCallback={endReachedCallback}
                        />
                        <UpBtn />
                    </> :
                <NotFound text={"Sorry, no posts found"} />}
            </section>
            }
            {status === "rejected" && <FailedToLoad reloadAction={fetchingData} actionParam={activeParam}/>}
        </main>
    )
}

export default FeedArea; 


