import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Postbox from "../components/postBox/PostBox";
import { renderWithReduxRouter, mockedPostServerAnswer } from "../helperData/testingTools"
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}))
 
describe("post box behaviour", ()=>{
    it("must render post box, and post box must direct to post area correctly", ()=>{
        const resolvedValue = mockedPostServerAnswer();
        const postData = resolvedValue[0].data.children[0].data;
        const mockedNavigate = jest.fn();
        useNavigate.mockReturnValue(mockedNavigate);
        renderWithReduxRouter(<Postbox 
                                        deviceData = {{type:"desktop"}}
                                        subredditName={postData.subreddit}
                                        author={postData.author}
                                        title={postData.title}
                                        score={postData.score}
                                        media={postData.url}
                                        time={postData.created_utc}
                                        video={postData.media?.reddit_video?.hls_url}
                                        mediaType={postData.post_hint}
                                        iconUrlWithSearchParam={postData.sr_detail.community_icon} //main icon
                                        reserverIconUrl={postData.sr_detail.icon_img} //spare icon
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
                                        />)
        const postBoxContainer = screen.getByTestId('postContainer');
        expect(postBoxContainer).toBeInTheDocument();
        userEvent.click(postBoxContainer);
        expect(mockedNavigate).toHaveBeenCalledWith(`/${postData.subreddit}/${postData.id}`,expect.objectContaining({state: true}));
        
    })

    it("must use correct img link - spare if main is absent", ()=>{
        const resolvedValue = mockedPostServerAnswer({iconUrl:null, iconUrlSpare:"http://spareiconurl/"});
        const postData = resolvedValue[0].data.children[0].data;
        renderWithReduxRouter(<Postbox 
                                            deviceData = {{type:"desktop"}}
                                            subredditName={postData.subreddit}
                                            author={postData.author}
                                            title={postData.title}
                                            score={postData.score}
                                            media={postData.url}
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
                                            />)
        const img = screen.getByAltText("Subreddit avatar");
        expect(img.src).toBe("http://spareiconurl/");
    })

    it("must use correct img link - main link is avaliable", () =>{
        const resolvedValue = mockedPostServerAnswer({iconUrl:"http://mainiconurl/", iconUrlSpare:null});
        const postData = resolvedValue[0].data.children[0].data;
        renderWithReduxRouter(<Postbox 
                                            deviceData = {{type:"desktop"}}
                                            subredditName={postData.subreddit}
                                            author={postData.author}
                                            title={postData.title}
                                            score={postData.score}
                                            media={postData.url}
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
                                            />)
        const img = screen.getByAltText("Subreddit avatar");
        expect(img.src).toBe("http://mainiconurl/");
        
    })

    it("must show correct style if post is only title (selfAlone)", async ()=>{
        //selfAlone example
        let resolvedValue = mockedPostServerAnswer({postHint: "self", isSelf: true, selfText: null});
        let postData = resolvedValue[0].data.children[0].data;
        const {renderedComponent} = renderWithReduxRouter(<Postbox 
                                                                deviceData = {{type:"desktop"}}
                                                                subredditName={postData.subreddit}
                                                                author={postData.author}
                                                                title={postData.title}
                                                                score={postData.score}
                                                                media={postData.url}
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
                                                                />);
        let postBoxContainer = screen.getByTestId('postContainer');
        expect(postBoxContainer.style.alignContent).toBe("space-between");
        //not self text alone example
        resolvedValue = mockedPostServerAnswer({postHint: "image", isSelf: false, selfText: null});
        postData = resolvedValue[0].data.children[0].data;
        renderedComponent.rerender(<Postbox 
                        deviceData = {{type:"desktop"}}
                        subredditName={postData.subreddit}
                        author={postData.author}
                        title={postData.title}
                        score={postData.score}
                        media={postData.url}
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
                        />);
        postBoxContainer = screen.getByTestId('postContainer');
        expect(postBoxContainer.style.alignContent).toBe("first baseline");

    })

    it("must show correct comments counter work", async ()=>{
        let resolvedValue = mockedPostServerAnswer({numComments:999});
        let postData = resolvedValue[0].data.children[0].data;
        const {renderedComponent} = renderWithReduxRouter(<Postbox 
                                                                deviceData = {{type:"desktop"}}
                                                                subredditName={postData.subreddit}
                                                                author={postData.author}
                                                                title={postData.title}
                                                                score={postData.score}
                                                                media={postData.url}
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
                                                                />)
        let commentsCounter = screen.getByText(999);
        expect(commentsCounter).toBeInTheDocument();
        resolvedValue = mockedPostServerAnswer({numComments:1000});
        postData = resolvedValue[0].data.children[0].data;
        renderedComponent.rerender(<Postbox 
                    deviceData = {{type:"desktop"}}
                    subredditName={postData.subreddit}
                    author={postData.author}
                    title={postData.title}
                    score={postData.score}
                    media={postData.url}
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
                    />)
        commentsCounter = screen.getByText("1.0k");
        expect(commentsCounter).toBeInTheDocument();

        //unmountComponentAtNode(container);
    })
})
