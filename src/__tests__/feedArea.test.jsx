import FeedArea from '../components/feedArea/FeedArea';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { testingTools } from "../helperFuncs/testingTools";
import { serverRequests } from "../redditData/data.js";
import { mockedPostsServerAnswer } from "../helperFuncs/testingTools.js";

jest.mock("../redditData/data.js");
console.log(mockedPostsServerAnswer())



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
            serverRequests.getPosts.mockResolvedValueOnce(mockedPostsServerAnswer())
            testingTools.renderWithReduxRouter(<FeedArea/>);
        })
    })
}) 