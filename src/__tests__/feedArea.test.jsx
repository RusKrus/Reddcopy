import FeedArea from '../components/feedArea/FeedArea';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { testingTools } from "../helperFuncs/testingTools";
import { serverRequests } from "../redditData/data.js";




describe("feedArea behaviour", () =>{
    it("must render feedArea correctly", ()=>{
        testingTools.renderWithReduxRouter(<FeedArea/>);
        screen.debug();
    })
}) 