import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import feedAreaReducer from "../components/feedArea/feedAreaSlice";
import postAreaReducer from "../components//postArea/postAreaSlice";
import headerReducer from "../components//header/headerSlice";





export const testingTools = {
    createMockStore(){
        const store = configureStore({
            reducer:{
                feedArea: feedAreaReducer,
                postArea: postAreaReducer,
                header: headerReducer
            }
        })

        return store;
    },
    renderWithReduxRouter(component, store=this.createMockStore(), previousPages=["/","/top"]){
        const renderedComponent = render(
            <MemoryRouter initialEntries={previousPages}> 
                <Provider store={store}>
                    {component}
                </Provider>
            </MemoryRouter>
        )
        return renderedComponent;
    }
}

const commentsData = 
[{   
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
                            replies: {}
                        }
                    },
                    {
                        kind: "more",
                        data:
                        {
                            author: "John Weak 3",
                            created_utc: 1700000000,
                            body_html: `&lt;div class="md"&gt;&lt;p&gt;I am should not be rendered.&lt;/p&gt; &lt;/div&gt;`,
                            score: 28,
                            replies: {}
                        }
                    }
                ]
            }
        }
    }
}]

export const mockedPostServerAnswer = ({publicDescription = "you, me, us, irl, reddit style", 
                                        comments=commentsData, 
                                        iconUrl=null, 
                                        iconUrlSpare="https://b.thumbs.redditmedia.com/4ADRnu2cwKIkpQt0N-g36-iq6EfTNFVV1RComMcEZiU.png",
                                        numComments=555,
                                        postHint=null,
                                        isSelf=true,
                                        selfText=null}={}) =>{
    return [
            //post data
            {
                data:{
                    children:[
                        {
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
                                media: null,
                                link_flair_text: null,
                                ink_flair_text_color: null,
                                link_flair_background_color: null,
                                sr_detail: {
                                    community_icon:iconUrl,
                                    icon_img: iconUrlSpare,
                                    public_description: publicDescription,
                                    subscribers: 2732296
                                },
                                id: 12345
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
    
}

export const mockedPostsServerAnswer = ({}={}) =>{
    const post = mockedPostServerAnswer();
    const posts = Array(25).fill(post[0].data.children[0]);
    return{
        kind: "Listing",
        data: {
            after: "t3_1da2n25",
            children: posts
        }
    }
}