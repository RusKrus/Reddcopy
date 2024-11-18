import { render, screen } from '@testing-library/react';
import CommentsArea from "../components/commentsArea/CommentsArea";
import React from "react";
import { timeDecoder, domElementObtainer } from '../helperData/helperFuncs';
import { v4 as uuidv4 } from 'uuid';
import { mockedPostServerAnswer } from "../helperData/testingTools"

const serverRequest = mockedPostServerAnswer();
const commentsProp = serverRequest[1].data.children[0];
console.log(commentsProp)


 
describe("comments area behaviour", ()=>{

    it("must not render any comment text if useRef is null",()=>{
        const {rerender} = render(<CommentsArea comment={commentsProp} key={uuidv4()}/>);
        const originalSelector = jest.spyOn(Element.prototype, "querySelector");
        originalSelector.mockReturnValue(null);
        rerender(<CommentsArea comment={commentsProp} key={uuidv4()}/>);
        originalSelector.mockRestore();
        //checking main comment text 
        const correctString = domElementObtainer(commentsProp.data.body_html).children[0].innerHTML;
        const correctCommentTextElement = screen.queryByText(correctString);
        expect(correctCommentTextElement).toBeNull();
        //checking reply comment text 
        const correctStringReply = domElementObtainer(commentsProp.data.replies.data.children[0].data.body_html).children[0].innerHTML;
        const correctReplyCommentTextElement = screen.queryByText(correctStringReply);
        expect(correctReplyCommentTextElement).toBeNull();
        
    })

    it("must render first comment correctly", ()=>{
        render(<CommentsArea comment={commentsProp} key={uuidv4()}/>);
        const authorNameElement = screen.getByText(commentsProp.data.author);
        expect(authorNameElement).toBeInTheDocument();
        const correctTime = timeDecoder(commentsProp.data.created_utc);
        const timeElement = screen.getByText("• "+correctTime);
        expect(timeElement).toBeInTheDocument(); 
        const correctString = domElementObtainer(commentsProp.data.body_html).children[0].innerHTML;
        const correctCommentTextElement = screen.getByText(correctString);
        expect(correctCommentTextElement).toBeInTheDocument();
        const elementToReplace = screen.queryByTestId(".toReplace");
        expect(elementToReplace).not.toBeInTheDocument();

    })
    
    it("must render reply on first comment correctly", () =>{
        render(<CommentsArea comment={commentsProp} key={uuidv4()}/>);
        const authorNameElement = screen.getByText(commentsProp.data.replies.data.children[0].data.author);
        expect(authorNameElement).toBeInTheDocument();
        const correctTime = timeDecoder(commentsProp.data.replies.data.children[0].data.created_utc);
        const timeElement = screen.getByText("• "+correctTime);
        expect(timeElement).toBeInTheDocument(); 
        const correctString = domElementObtainer(commentsProp.data.replies.data.children[0].data.body_html).children[0].innerHTML;
        const correctCommentTextElement = screen.getByText(correctString);
        expect(correctCommentTextElement).toBeInTheDocument();
    })

    it("must not render reply with incorrect type", ()=>{
        render(<CommentsArea comment={commentsProp} key={uuidv4()}/>);
        const authorNameElement = screen.queryByText(commentsProp.data.replies.data.children[1].data.author);
        expect(authorNameElement).not.toBeInTheDocument();
        const correctTime = timeDecoder(commentsProp.data.replies.data.children[1].data.created_utc);
        const timeElement = screen.queryByText("• "+correctTime);
        expect(timeElement).not.toBeInTheDocument(); 
        const correctString = domElementObtainer(commentsProp.data.replies.data.children[1].data.body_html).children[0].innerHTML;
        const correctCommentTextElement = screen.queryByText(correctString);
        expect(correctCommentTextElement).not.toBeInTheDocument();
    })


    
})