import FeedArea from '../components/feedArea/FeedArea';
import { screen } from '@testing-library/react';
import { renderWithReduxRouter, mockedPostsServerAnswer } from "../helperData/testingTools";
import { serverRequests } from "../redditData/data";


jest.mock("../redditData/data");
const mockedServerRequest = jest.mocked(serverRequests)


 
class MockIntersectionObserver implements IntersectionObserver {
    root: Element | null = null;
    rootMargin: string = "0px";
    thresholds: number[] = [];

    callback: IntersectionObserverCallback;
    options?: IntersectionObserverInit;

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        this.callback = callback;
        this.options = options;
    }

    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords = jest.fn();

    triggerIntersect(entries: IntersectionObserverEntry[]): void {
        this.callback(entries, this);
    }
}

global.IntersectionObserver = MockIntersectionObserver; 

describe("feedArea behaviour", () =>{
    describe("rejected feed area status",  ()=>{
        it ("must render try again button", async ()=>{
            mockedServerRequest.getPosts.mockRejectedValueOnce("Something hapenned");

            renderWithReduxRouter(<FeedArea/>);

            expect(await screen.findByText(/Something gone wrong/)).toBeInTheDocument();
            expect.assertions(1);
        })
    })

    describe("loading feed area status", ()=>{
        it("must render loading box containers", async ()=>{
            mockedServerRequest.getPosts.mockReturnValueOnce(new Promise(()=>{}));

            renderWithReduxRouter(<FeedArea/>);
            
            const loadingBoxes: HTMLElement[] = await screen.findAllByTestId("loading box");
            expect(loadingBoxes.length>2&&loadingBoxes.length<8).toBeTruthy();
            expect.assertions(1);
        })
    })

    describe("loaded feed area status", ()=>{
        it("must render feedArea correctly", async ()=>{
            const postsData = mockedPostsServerAnswer();
            mockedServerRequest.getPosts.mockResolvedValueOnce(postsData);

            renderWithReduxRouter(<FeedArea/>);
   
            const posts: HTMLElement[] = await screen.findAllByTestId("postBox");
            expect(posts.length).toBe(25)
        })
    })
}) 