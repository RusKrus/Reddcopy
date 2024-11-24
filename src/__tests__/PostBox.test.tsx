import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Postbox from "../components/postBox/PostBox";
import { renderWithReduxRouter, postBoxData, isHTMLImageElement } from "../helperData/testingTools"
import { useNavigate } from "react-router-dom";
import { PostBoxProps } from "../helperData/types";
jest.mock("react-router-dom", ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

const mockedUseNavigate = jest.mocked(useNavigate);

describe("post box behaviour", ()=>{
    it("must render post box, and post box must direct to post area correctly", ()=>{
        const mockedNavigate = jest.fn();
        mockedUseNavigate.mockReturnValue(mockedNavigate);
        const testPostBoxProps: PostBoxProps = postBoxData();

        renderWithReduxRouter(<Postbox {...testPostBoxProps} />)
        const postBoxContainer: HTMLElement = screen.getByTestId('postContainer');
        userEvent.click(postBoxContainer);
        
        expect(mockedNavigate).toHaveBeenCalledWith(`/${testPostBoxProps.subredditName}/${testPostBoxProps.id}`,expect.objectContaining({state: true}));
    })

    it("must use correct img link - spare if main is absent", () => {
        const testPostBoxProps: PostBoxProps = postBoxData({iconUrl: "", iconUrlSpare:"http://spareiconurl/"});

        renderWithReduxRouter(<Postbox {...testPostBoxProps} />);
        
        const img: HTMLElement = screen.getByAltText("Subreddit avatar");
        isHTMLImageElement(img);
        expect(img.src).toBe("http://spareiconurl/");
    })

    it("must use correct img link - main link is avaliable", () =>{
        const testPostBoxProps: PostBoxProps = postBoxData({iconUrl:"http://mainiconurl/", iconUrlSpare:""});

        renderWithReduxRouter(<Postbox {...testPostBoxProps} />)

        const img: HTMLElement = screen.getByAltText("Subreddit avatar");
        isHTMLImageElement(img);
        expect(img.src).toBe("http://mainiconurl/");
        
    })

    describe("must show correct style if post is only title (selfAlone)", ()=>{
        it("must render selfAlone container type", ()=>{
            const testPostBoxProps: PostBoxProps = postBoxData({postHint: "self", isSelf: true, selfText: ""});

            renderWithReduxRouter(<Postbox {...testPostBoxProps} />);
    
            const postBoxContainer: HTMLElement = screen.getByTestId('postContainer');
            expect(postBoxContainer.style.alignContent).toBe("space-between");
        });

        it("must not render selfAlone container type", ()=>{
            const testPostBoxProps: PostBoxProps = postBoxData({postHint: "image", isSelf: false, selfText: ""});

            renderWithReduxRouter(<Postbox {...testPostBoxProps} />);

            const postBoxContainer: HTMLElement = screen.getByTestId('postContainer');
            expect(postBoxContainer.style.alignContent).toBe("first baseline");
        })
    })

    it("must show correct comments counter work", async ()=>{
        let testPostBoxProps: PostBoxProps = postBoxData({numComments:999});

        const { rerender } = renderWithReduxRouter(<Postbox {...testPostBoxProps} />);

        let commentsCounter: HTMLElement = screen.getByText(999);
        expect(commentsCounter).toBeInTheDocument();

        testPostBoxProps = postBoxData({numComments:1000});

        rerender(<Postbox {...testPostBoxProps} />)

        commentsCounter = screen.getByText("1.0k");
        expect(commentsCounter).toBeInTheDocument();
    })
})
