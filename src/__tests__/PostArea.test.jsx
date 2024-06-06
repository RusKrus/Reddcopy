import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostArea from "../components/postArea/PostArea";
import { testingTools, mockedServerAnswer } from "../helperFuncs/testingTools"
import { serverRequests } from "../redditData/data.js";
import { useLocation, useNavigate } from "react-router-dom";



jest.mock("../redditData/data.js"); //inside of it block if .getPostInfo manually mocked with resolved value - this function always returns undefined, but in other blocks of code the function returns correct value. I can not find an issue. 
jest.mock("react-router-dom", ()=>({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useNavigate: jest.fn()
}))
jest.spyOn(window, "scrollTo");




describe("Post area behaviour", ()=>{
    describe("fullfilled post area behaviour", ()=>{
        it("must render returned data correctly", async ()=>{
            expect.assertions(1);
            const resolvedValue = mockedServerAnswer();
            useLocation.mockReturnValue({state:true})
            serverRequests.getPostInfo.mockResolvedValueOnce(resolvedValue);
            testingTools.renderWithReduxRouter(<PostArea/>);
            const postInfoContainer = await screen.findByTestId("postAndCommentsBox");
            expect(postInfoContainer).toBeInTheDocument();
        })


       it("must show back button in component", async ()=>{
            expect.assertions(1);
            const resolvedValue = mockedServerAnswer();
            useLocation.mockReturnValue({state:true})
            serverRequests.getPostInfo.mockResolvedValueOnce(resolvedValue);
            testingTools.renderWithReduxRouter(<PostArea/>);
            const backButton = await screen.findByTestId("backButton"); 
            expect(backButton).toBeInTheDocument();
        })



       it("must not show back button in component", async ()=>{
            //expect.assertions(1);
            const resolvedValue = mockedServerAnswer();
            useLocation.mockReturnValue({state:null})
            serverRequests.getPostInfo.mockResolvedValueOnce(resolvedValue);
            await act(async () => {
                testingTools.renderWithReduxRouter(<PostArea />);
            });
            let backButton;
            backButton = screen.queryByTestId("backButton");
            expect(backButton).toBeNull();
        })


 it("must show correct back button behaviour", async ()=>{
            expect.assertions(1);
            const resolvedValue = mockedServerAnswer();
            useLocation.mockReturnValue({state:true})
            serverRequests.getPostInfo.mockResolvedValueOnce(resolvedValue);
            testingTools.renderWithReduxRouter(<PostArea/>);
            const mockedNavigate = jest.fn();
            useNavigate.mockReturnValue(mockedNavigate);
            const backButton = await screen.findByTestId("backButton"); 
            userEvent.click(backButton);
            expect(mockedNavigate).toHaveBeenCalledWith(-1);
        })


       it("must show correct subreddit info behaviour", async ()=>{
            const resolvedValue = mockedServerAnswer({publicDescription: null});
            serverRequests.getPostInfo.mockResolvedValueOnce(resolvedValue);
            useLocation.mockReturnValue({state:null});
            testingTools.renderWithReduxRouter(<PostArea/>);
            const defaultdescription = await screen.findAllByText(/No info avaliable yet/);
            expect(defaultdescription).toHaveLength(2)
        })

        it("must show correct string if it is no comments array", async ()=>{
            const resolvedValue = mockedServerAnswer({comments:null});
            serverRequests.getPostInfo.mockResolvedValueOnce(resolvedValue);
            useLocation.mockReturnValue({state:null});
            testingTools.renderWithReduxRouter(<PostArea/>);
            const defaultCommentsString = await screen.findByText("Nobody left a comment yet :(")
            expect(defaultCommentsString).toBeInTheDocument();
        })

    it("must use correct img link - spare if main is absent", async ()=>{
            const resolvedValue = mockedServerAnswer({iconUrl:null, iconUrlSpare:"http://spareiconurl/"});
            serverRequests.getPostInfo.mockResolvedValueOnce(resolvedValue);
            useLocation.mockReturnValue({state:null});
            testingTools.renderWithReduxRouter(<PostArea/>);
            const img = await screen.findAllByAltText("Subreddit avatar");
            expect(img[0].src).toBe("http://spareiconurl/");
            expect(img[1].src).toBe("http://spareiconurl/");
        })

        
             it("must use correct img link - main link is avaliable", async () =>{
            const resolvedValue = mockedServerAnswer({iconUrl:"http://mainiconurl/", iconUrlSpare:"http://spareiconurl/"});
            serverRequests.getPostInfo.mockResolvedValueOnce(resolvedValue);
            useLocation.mockReturnValue({state:null});
            testingTools.renderWithReduxRouter(<PostArea/>);
            const img = await screen.findAllByAltText("Subreddit avatar");
            expect(img[0].src).toBe("http://mainiconurl/");
            expect(img[1].src).toBe("http://mainiconurl/");
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