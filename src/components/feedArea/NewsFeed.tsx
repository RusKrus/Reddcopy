import { Post, PostData, DeviceData } from '../../helperData/types';
import PostBox from '../postBox/PostBox';
import { Virtuoso } from 'react-virtuoso';


type FeedProps = {
    filteredPosts: Post[], 
    deviceData: DeviceData, 
    endReachedCallback: ()=>void
};

export default function NewsFeed({filteredPosts, deviceData, endReachedCallback}: FeedProps): React.JSX.Element {
    return (
        <Virtuoso
            useWindowScroll = {true}
            atBottomThreshold = {1800}
            endReached = {endReachedCallback}
            increaseViewportBy = {{top:0, bottom: 1800}}
            data={filteredPosts}
            itemContent={(index, post): React.JSX.Element=>{
                const postData: PostData = post.data;
                return <PostBox
                            deviceData={deviceData}
                            subredditName={postData.subreddit_name_prefixed}
                            author={postData.author}
                            title={postData.title}
                            score={postData.score}
                            url={postData.url}
                            imgResolutions={postData.preview?.images[0]} 
                            time={postData.created_utc}
                            video={postData.media?.reddit_video?.hls_url}
                            mediaType={postData.post_hint}
                            iconUrlWithSearchParam={postData.sr_detail.community_icon}
                            reserverIconUrl={postData.sr_detail.icon_img}
                            selfTextHTML={postData.selftext_html}
                            numComments={postData.num_comments}
                            isGallery={postData.is_gallery}
                            thumbnail={postData.thumbnail}
                            isNsfw={postData.over_18}
                            isSelf={postData.is_self}
                            htmlStringIframe = {postData?.media?.oembed?.html}
                            flairText={postData.link_flair_text}
                            flairTextColor={postData.link_flair_text_color}
                            flairBackgroundColor={postData.link_flair_background_color}
                            id={postData.id}      
                    />
            }}
        />
    )
}