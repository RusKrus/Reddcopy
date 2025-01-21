import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import feedAreaReducer from "../components/feedArea/feedAreaSlice";
import postAreaReducer from "../components/postArea/postAreaSlice";
import headerReducer from "../components/header/headerSlice";
import { MockedPostServerAnswerParams, Comment, ReceivedSinglePostData, PostBoxProps } from "./types";

//setup data for tests
//DO NOT USE "NO DATA" AS AUTHOR NAME/ BODY_HTML TEXT, IN PURPOSE OF TYPING TESTS FILES, THIS STRING IN MOST CASES IS USED IF REPLIES IS EMPTY STRING, NOT OBJECT WITH ANOTHER COMMENT. THIS IS HOW I HANDLE MISTAKE WHEN COMMENTSDATA.DATA.REPLIES.CHILDREN... WHEN REPLIES ARE EMPTY STRING WILL CAUSE ERROR IN TYPES WHEN TESTING.
//LOOKING BY TEXT FOR THIS STRING SHOULD ALWAYS RETURN NOTHING
const commentsData: Comment = {   
    kind: "t1",
    data:{
        author: "John Weak",
        created_utc: 1680962338,
        body_html: `&lt;div class="md"&gt;&lt;p&gt;Blurry you looks enough like me that I&amp;#39;m going to tell people I met Tobey Maguire&lt;/p&gt; &lt;/div&gt;`,
        score: 273,
        replies: {
            kind: "Listing",
            data:{
                children:[
                    {
                        kind: "t1",
                        data:
                        {
                            author: "John Weak 2",
                            created_utc: 1712672507,
                            body_html: `&lt;div class="md"&gt;&lt;p&gt;Won’t appear on Leo’s Hinge anymore.&lt;/p&gt; &lt;/div&gt;`,
                            score: 25,
                            replies: ""
                        }
                    },
                    {
                        kind: "more",
                        data:
                        {
                            author: "John Weak 3",
                            created_utc: 1600000000,
                            body_html: `&lt;div class="md"&gt;&lt;p&gt;I am should not be rendered.&lt;/p&gt; &lt;/div&gt;`,
                            score: 28,
                            replies: ""
                        }
                    }
                ]
            }
        }
    }
}

//setup functions for test

export const createMockStore = () => {
    const store = configureStore({
        reducer:{
            feedArea: feedAreaReducer,
            postArea: postAreaReducer,
            header: headerReducer
        }
    })

    return store;
};

export const renderWithReduxRouter = ( component: React.JSX.Element, store = createMockStore(), previousPages: string[] = ["/","/top"]) => {
    const renderedComponent = render (
        <MemoryRouter initialEntries={previousPages}> 
            <Provider store={store}>
                {component}
            </Provider>
        </MemoryRouter>
    )

    const rerender = (component: React.JSX.Element) => {
        renderedComponent.rerender(
            <MemoryRouter initialEntries={previousPages}> 
                <Provider store={store}>
                    {component}
                </Provider>
            </MemoryRouter>
            )
    } 

    return { renderedComponent, store, rerender };
};


export function isHTMLImageElement(value: Element): asserts value is HTMLImageElement {
    if (!(value instanceof HTMLImageElement)) {
        throw new Error("Element is not an HTMLImageElement");
    }
};

//for postArea
export const mockedPostServerAnswer = ({publicDescription = "you, me, us, irl, reddit style", 
                                        comments=[commentsData], 
                                        iconUrl="https://b.thumbs.redditmedia.com/4ADRnu2cwKIkpQt0N-g36-iq6EfTNFVV1RComMcEZiU.png", 
                                        iconUrlSpare="https://b.thumbs.redditmedia.com/4ADRnu2cwKIkpQt0N-g36-iq6EfTNFVV1RComMcEZiU.png",
                                        numComments=555,
                                        media,
                                        postHint,
                                        isSelf=true,
                                        selfText}: MockedPostServerAnswerParams = {}): ReceivedSinglePostData =>{
    return [
            //post data
            {   
                kind: "Listing",
                data:{
                    children:[
                        {
                            kind: "Listing",
                            data:{
                                subreddit_name_prefixed:"r/meirl", //for feed area
                                subreddit: "meirl",
                                author: "unsunglory",
                                title: "meirl",
                                score: 10990,
                                url: "https://i.redd.it/an4snz6o2zwc1.jpeg",
                                created_utc: 1714202011,
                                post_hint: postHint,
                                selftext_html: selfText,
                                num_comments: numComments,
                                thumbnail: "https://b.thumbs.redditmedia.com/ga4F7GOYCPz2jUY0Aqd3VyoBIm5eMwQVXsY7nLpr5EY.jpg",
                                is_gallery: false,
                                is_self: isSelf,
                                over_18: false,
                                media_metadata: undefined,
                                media: media, 
                                link_flair_text: "",
                                link_flair_text_color: "",
                                link_flair_background_color: "",
                                sr_detail: {
                                    community_icon:iconUrl,
                                    icon_img: iconUrlSpare,
                                    public_description: publicDescription,
                                    subscribers: 2732296
                                },
                                id: "12345",
                            }
                        }
                    ]
                }
            },
            //comments data
            {
                kind: "Listing",
                data:{
                    children: comments
                }
            }
        ]
    
};
//for feedArea
export const mockedPostsServerAnswer = () =>{
    const post = mockedPostServerAnswer();
    const posts = Array(25).fill(post[0].data.children[0]);
    return{
        kind: "Listing",
        data: {
            after: "t3_1da2n25",
            children: posts
        }
    }
};

//for postBox
export const postBoxData= ({  
                                    publicDescription = "you, me, us, irl, reddit style", 
                                    comments=[commentsData], 
                                    iconUrl="https://b.thumbs.redditmedia.com/4ADRnu2cwKIkpQt0N-g36-iq6EfTNFVV1RComMcEZiU.png", 
                                    iconUrlSpare="https://b.thumbs.redditmedia.com/4ADRnu2cwKIkpQt0N-g36-iq6EfTNFVV1RComMcEZiU.png",
                                    numComments=555,
                                    media,
                                    postHint,
                                    isSelf=true,
                                    selfText}: MockedPostServerAnswerParams = {}): PostBoxProps => {
    
    const resolvedValue = mockedPostServerAnswer({
        publicDescription, 
        comments, 
        iconUrl, 
        iconUrlSpare,
        numComments,
        media,
        postHint,
        isSelf,
        selfText
    });

    const postData = resolvedValue[0].data.children[0].data;

    return {
        deviceData: { type: "desktop" },
        subredditName: postData.subreddit,
        author: postData.author,
        title: postData.title,
        score: postData.score,
        url: postData.url,
        time: postData.created_utc,
        video: postData.media?.reddit_video?.hls_url,
        mediaType: postData.post_hint,
        iconUrlWithSearchParam: postData.sr_detail.community_icon,
        reserverIconUrl: postData.sr_detail.icon_img,
        selfTextHTML: postData.selftext_html,
        numComments: postData.num_comments,
        isGallery: postData.is_gallery,
        thumbnail: postData.thumbnail,
        isNsfw: postData.over_18,
        isSelf: postData.is_self,
        htmlStringIframe: postData?.media?.oembed?.html,
        flairText: postData.link_flair_text,
        flairTextColor: postData.link_flair_text_color,
        flairBackgroundColor: postData.link_flair_background_color,
        id: postData.id
    };
} 




