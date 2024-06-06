import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostArea from "../components/postArea/PostArea";
import { testingTools, mockedServerAnswer } from "../helperFuncs/testingTools"
import { serverRequests } from "../redditData/data.js";


jest.mock("../redditData/data.js"); //inside of it block if .getPostInfo manually mocked with resolved value - this function always returns undefined, but in other blocks of code the function returns correct value. I can not find an issue. 
jest.spyOn(window, "scrollTo");


describe("Post area behaviour", ()=>{
    describe("fullfilled post area behaviour", ()=>{
        it("must render returned data correctly", async ()=>{
            expect.assertions()
            const resolvedValue = mockedServerAnswer();
            serverRequests.getPostInfo.mockResolvedValueOnce(resolvedValue);
            testingTools.renderWithReduxRouter(<PostArea/>);
            const postInfoContainer = await screen.findByTestId("postAndCommentsBox");
            expect(postInfoContainer).toBeInTheDocument();
            console.log(screen)
            
            

        })
    })

    describe("loading post area behaviour", ()=>{
        it("must show loading screen", async ()=>{
            expect.assertions(1);
            serverRequests.getPostInfo.mockReturnValueOnce(new Promise(()=>{}));
            testingTools.renderWithReduxRouter(<PostArea/>);
            const loadingScreen = await screen.findByTestId("loading screen");
            expect(loadingScreen).toBeInTheDocument();
            
        })
    })

    describe("Rejected post area behaviour", ()=>{
        it("must render error message if fetch request is rejected", async ()=>{
            expect.assertions(2);
            serverRequests.getPostInfo.mockRejectedValueOnce("Something hapenned");
            testingTools.renderWithReduxRouter(<PostArea/>);
            const errorMessage = await screen.findByText(/Something gone wrong/)
            const tryAgainBtn = await screen.findByText("Try again");
            expect(errorMessage).toBeInTheDocument();
            expect(tryAgainBtn).toBeInTheDocument(); 
        })
    })  
})