import FeedArea from '../components/feedArea/FeedArea';
import { screen, act } from '@testing-library/react';
import { testingTools } from "../helperData/testingTools";
import { serverRequests } from "../redditData/data.js";
import { mockedPostsServerAnswer } from "../helperData/testingTools.js";

jest.mock("../redditData/data.js");
 
class mockIntersectionObserver {
    constructor(callback, options){
        this.callback = callback;
        this.options = options;
        this.observe = jest.fn();
        this.unobserve = jest.fn();
        this.disconnect = jest.fn();
    }

    triggerIntersect(entries){
        this.callback(entries, this)
    }
}

global.IntersectionObserver = mockIntersectionObserver; 

describe("feedArea behaviour", () =>{

    describe("rejected feed area status",  ()=>{
        it ("must render try again button", async ()=>{
            expect.assertions(1)
            serverRequests.getPosts.mockRejectedValueOnce("Something hapenned");
            testingTools.renderWithReduxRouter(<FeedArea/>);
            const reloadBtn = await screen.findByText(/Something gone wrong/);
            expect(reloadBtn).toBeInTheDocument();
        })
    })

    describe("loading feed area status", ()=>{
        it("must render loading box containers", async ()=>{
            serverRequests.getPosts.mockReturnValueOnce(new Promise(()=>{}));
            testingTools.renderWithReduxRouter(<FeedArea/>);
            const loadingBox = await screen.findAllByTestId("loading box");
            expect(loadingBox.length>2&&loadingBox.length<8).toBeTruthy();
        })
    })

    describe("loaded feed area status", ()=>{
        it("must render feedArea correctly", async ()=>{
            const postsData = mockedPostsServerAnswer();
            serverRequests.getPosts.mockResolvedValueOnce(postsData);
            await act (async ()=>{
                testingTools.renderWithReduxRouter(<FeedArea/>);
            })
            const posts = screen.getAllByTestId("postBox");
            expect(posts.length).toBe(25)
        })
    })
}) 