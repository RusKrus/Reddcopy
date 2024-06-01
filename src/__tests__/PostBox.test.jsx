import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Postbox from "../components/postBox/PostBox.jsx";
import { testingTools, mockedServerAnswer } from "../helperFuncs/testingTools"
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}))

describe("post box behaviour", ()=>{
    it("must render post box, and post box must direct to post area correctly", ()=>{
        const resolvedValue = mockedServerAnswer();
        const postData = resolvedValue[0].data.children[0].data;
        const mockedNavigate = jest.fn();
        useNavigate.mockReturnValue(mockedNavigate);
        testingTools.renderWithReduxRouter(<Postbox 
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
        const postBoxContainer = screen.getByTestId('postContainer');
        expect(postBoxContainer).toBeInTheDocument();
        userEvent.click(postBoxContainer);
        expect(mockedNavigate).toHaveBeenCalledWith(`/${postData.subreddit}/${postData.id}`,expect.objectContaining({state: true}))
    })

    it("must use correct img link - spare if main is absent", ()=>{
        const resolvedValue = mockedServerAnswer({iconUrl:null, iconUrlSpare:"http://spareiconurl/"});
        const postData = resolvedValue[0].data.children[0].data;
        testingTools.renderWithReduxRouter(<Postbox 
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
        const resolvedValue = mockedServerAnswer({iconUrl:null, iconUrlSpare:"http://mainiconurl/"});
        const postData = resolvedValue[0].data.children[0].data;
        testingTools.renderWithReduxRouter(<Postbox 
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
})
