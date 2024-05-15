jest.mock("../redditData/data.js");
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostArea from "../components/postArea/PostArea";
import testingTools from "../helperFuncs/testingTools"
import { serverRequests } from "../redditData/data.js";



const mockedScrollFunc = jest.spyOn(window, "scrollTo");



describe("Post area behaviour", ()=>{

    describe("loading post area behaviour", ()=>{
        it("must show loading screen", async ()=>{
            serverRequests.getPostInfo.mockReturnValueOnce(new Promise(()=>{}));
            const postAreaLoading = testingTools.renderWithReduxRouter(<PostArea/>);
            const loadingScreen = await screen.findByTestId("loading screen");
        })

    })

    describe("Rejected post area behaviour", ()=>{
        it("must render error message if fetch request is rejected", async ()=>{
            expect.assertions(2);
            serverRequests.getPostInfo.mockRejectedValueOnce("Something hapenned");
            const postArea = testingTools.renderWithReduxRouter(<PostArea/>);
            const errorMessage = await screen.findByText(/Something gone wrong/)
            const tryAgainBtn = await screen.findByText("Try again");
            expect(errorMessage).toBeInTheDocument();
            expect(tryAgainBtn).toBeInTheDocument();
        })
    })  
    
    describe("fullfilled post area behaviour", ()=>{
        it("", async ()=>{
            const answer = await serverRequests.getPostInfo();
            console.log(serverRequests.getPostInfo("id"))
        })
    })
})