import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostArea from "../components/postArea/PostArea";
import { renderWithReduxRouter, mockedPostServerAnswer, isHTMLImageElement } from "../helperData/testingTools"
import { serverRequests } from "../redditData/data";
import { useLocation, useNavigate } from "react-router-dom";



jest.mock("../redditData/data"); //inside of "it" block if .getPostInfo manually mocked with resolved value - this function always returns undefined, but in other blocks of code this function returns correct value. I can not find the issue. 
const mockedServerRequest = jest.mocked(serverRequests);

jest.mock("react-router-dom", ()=>({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));
const mockedUseLocation = jest.mocked(useLocation);
const mockedUseNavigate = jest.mocked(useNavigate);

jest.spyOn(window, "scrollTo");




describe("Post area behaviour", ()=>{
    describe("fullfilled post area behaviour", ()=>{
        it("must render returned data correctly", async ()=>{
            const resolvedValue = mockedPostServerAnswer();
            mockedUseLocation.mockReturnValue({state: true, key: "", pathname: "", search: "", hash: ""})
            mockedServerRequest.getPostInfo.mockResolvedValueOnce(resolvedValue);

            renderWithReduxRouter(<PostArea/>);
            
            const postInfoContainer: HTMLElement = await screen.findByTestId("postAndCommentsBox");
            expect(postInfoContainer).toBeInTheDocument();
            expect.assertions(1);
        })


       it("must show back button in component", async ()=>{
            const resolvedValue = mockedPostServerAnswer();
            mockedUseLocation.mockReturnValue({state: true, key: "", pathname: "", search: "", hash: ""})
            mockedServerRequest.getPostInfo.mockResolvedValueOnce(resolvedValue);

            renderWithReduxRouter(<PostArea/>);

            const backButton: HTMLElement = await screen.findByTestId("backButton"); 
            expect(backButton).toBeInTheDocument();
            expect.assertions(1);
        })



       it("must not show back button in component", async ()=>{
            //expect.assertions(1);
            const resolvedValue = mockedPostServerAnswer();
            mockedUseLocation.mockReturnValue({state: null, key: "", pathname: "", search: "", hash: ""})
            mockedServerRequest.getPostInfo.mockResolvedValueOnce(resolvedValue);

            renderWithReduxRouter(<PostArea />);

            const backButton: HTMLElement | null = screen.queryByTestId("backButton");
            expect(backButton).toBeNull();
        })


        it("must show correct back button behaviour", async ()=>{
            const resolvedValue = mockedPostServerAnswer();
            mockedUseLocation.mockReturnValue({state: true, key: "", pathname: "", search: "", hash: ""})
            const mockedNavigate = jest.fn();
            mockedUseNavigate.mockReturnValue(mockedNavigate);
            mockedServerRequest.getPostInfo.mockResolvedValueOnce(resolvedValue);

            renderWithReduxRouter(<PostArea/>);
            
            const backButton: HTMLElement = await screen.findByTestId("backButton"); 
            userEvent.click(backButton);
            expect(mockedNavigate).toHaveBeenCalledWith(-1);
            expect.assertions(1);
        })


       it("must show correct subreddit info behaviour", async ()=>{
            const resolvedValue = mockedPostServerAnswer({publicDescription: ""});
            mockedServerRequest.getPostInfo.mockResolvedValueOnce(resolvedValue);
            mockedUseLocation.mockReturnValue({state: null, key: "", pathname: "", search: "", hash: ""});

            renderWithReduxRouter(<PostArea/>);

            const defaultdescription: HTMLElement[] = await screen.findAllByText(/No info avaliable yet/);
            expect(defaultdescription).toHaveLength(2);
            expect.assertions(1);
        })

        it("must show correct string if it is no comments array", async ()=>{
            const resolvedValue = mockedPostServerAnswer({comments:[]});
            mockedServerRequest.getPostInfo.mockResolvedValueOnce(resolvedValue);
            mockedUseLocation.mockReturnValue({state: null, key: "", pathname: "", search: "", hash: ""});

            renderWithReduxRouter(<PostArea/>);

            const defaultCommentsString: HTMLElement = await screen.findByText("Nobody left a comment yet :(")
            expect(defaultCommentsString).toBeInTheDocument();
            expect.assertions(1);
        })

        it("must use correct img link - spare if main is absent", async ()=>{
            const resolvedValue = mockedPostServerAnswer({iconUrl: "", iconUrlSpare:"http://spareiconurl/"});
            mockedServerRequest.getPostInfo.mockResolvedValueOnce(resolvedValue);
            mockedUseLocation.mockReturnValue({state: null, key: "", pathname: "", search: "", hash: ""});

            renderWithReduxRouter(<PostArea/>);

            const img: HTMLElement[] = await screen.findAllByAltText("Subreddit avatar");
            isHTMLImageElement(img[0]);
            isHTMLImageElement(img[1]);
            expect(img[0].src).toBe("http://spareiconurl/");
            expect(img[1].src).toBe("http://spareiconurl/");
        })

        
        it("must use correct img link - main link is avaliable", async () =>{
            const resolvedValue = mockedPostServerAnswer({iconUrl:"http://mainiconurl/", iconUrlSpare:"http://spareiconurl/"});
            mockedServerRequest.getPostInfo.mockResolvedValueOnce(resolvedValue);
            mockedUseLocation.mockReturnValue({state: null, key: "", pathname: "", search: "", hash: ""});

            renderWithReduxRouter(<PostArea/>);

            const img: HTMLElement[] = await screen.findAllByAltText("Subreddit avatar");
            isHTMLImageElement(img[0]);
            isHTMLImageElement(img[1]);
            expect(img[0].src).toBe("http://mainiconurl/");
            expect(img[1].src).toBe("http://mainiconurl/");
        })
    })

    describe("loading post area behaviour", ()=>{
        it("must show loading screen when data is not loaded yet", async ()=>{
            mockedServerRequest.getPostInfo.mockReturnValueOnce(new Promise(()=>{}));
            
            renderWithReduxRouter(<PostArea/>);

            const loadingScreen: HTMLElement = await screen.findByTestId("loading screen");
            expect(loadingScreen).toBeInTheDocument();
            expect.assertions(1);
        })
    })

    describe("Rejected post area behaviour", ()=>{
        it("must render error message if fetch request is rejected", async ()=>{
            mockedServerRequest.getPostInfo.mockRejectedValueOnce("Something hapenned");

            renderWithReduxRouter(<PostArea/>);
            
            const errorMessage: HTMLElement = await screen.findByText(/Something gone wrong/)
            const tryAgainBtn: HTMLElement = await screen.findByText("Try again");
            expect(errorMessage).toBeInTheDocument();
            expect(tryAgainBtn).toBeInTheDocument(); 
            expect.assertions(2);
        })
    })  
})  