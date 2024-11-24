import { render, screen } from '@testing-library/react';
import CommentsArea from "../components/commentsArea/CommentsArea";
import { timeDecoder, domElementObtainer } from '../helperData/helperFuncs';
import { v4 as uuidv4 } from 'uuid';
import { mockedPostServerAnswer } from "../helperData/testingTools"

const serverRequest = mockedPostServerAnswer();
const commentsProp = serverRequest[1].data.children[0];
 
describe("comments area behaviour", ()=>{
    beforeEach(()=>{
        
    })
    it("must not render any comment text if useRef is null",()=>{
        const mockedQuerySelector = jest.spyOn(Element.prototype, "querySelector").mockReturnValue(null); //selector is mocked because it is used inside useRef
        //checking main comment text 
        const mainCommentTextElement: ChildNode | null = domElementObtainer(commentsProp.data.body_html);
        const correctStringMainComment: string = mainCommentTextElement? mainCommentTextElement.children[0].innerHTML: "NO DATA";
        //checking reply comment text 
        const replyCommentTextElement: ChildNode | null = commentsProp.data.replies!==""?domElementObtainer(commentsProp.data.replies.data.children[0].data.body_html):null;
        const correctStringReplyComment: string = replyCommentTextElement? replyCommentTextElement.children[0].innerHTML: "NO DATA";
        
        render(<CommentsArea comment={commentsProp} key={uuidv4()}/>);
        
        expect(screen.queryByText(correctStringMainComment)).toBeNull();
        expect(screen.queryByText(correctStringReplyComment)).toBeNull();
        
        mockedQuerySelector.mockRestore();
        
    })

    it("must render first comment correctly", ()=>{
        //looking for time of comment
        const correctTime: string = timeDecoder(commentsProp.data.created_utc);
        //looking text body of comment
        const mainCommentTextElement: ChildNode | null = domElementObtainer(commentsProp.data.body_html);
        const correctStringMainComment: string = mainCommentTextElement? mainCommentTextElement.children[0].innerHTML: "NO DATA";
        
        render(<CommentsArea comment={commentsProp} key={uuidv4()}/>);
        
        expect(screen.getByText(commentsProp.data.author)).toBeInTheDocument();
        expect(screen.getByText("• "+correctTime)).toBeInTheDocument(); 
        expect(screen.getByText(correctStringMainComment)).toBeInTheDocument();
        expect(screen.queryByTestId(".toReplace")).not.toBeInTheDocument();

    })
    
    it("must render reply on main comment correctly", () =>{
        //looking for time of comment
        const correctTime: string = commentsProp.data.replies!==""?timeDecoder(commentsProp.data.replies.data.children[0].data.created_utc): "NO DATA";
        //looking text body of comment
        const replyCommentTextElement: ChildNode | null = commentsProp.data.replies!==""?domElementObtainer(commentsProp.data.replies.data.children[0].data.body_html):null;
        const correctString = replyCommentTextElement?replyCommentTextElement.children[0].innerHTML:"NO DATA";

        render(<CommentsArea comment={commentsProp} key={uuidv4()}/>);

        expect(screen.getByText(commentsProp.data.replies!==""?commentsProp.data.replies.data.children[0].data.author:"NO DATA")).toBeInTheDocument();
        expect(screen.getByText("• "+correctTime)).toBeInTheDocument(); 
        expect(screen.getByText(correctString)).toBeInTheDocument();
    })

    it("must not render reply comment with incorrect kind", ()=>{
        //looking for time of comment
        const correctTime: string = commentsProp.data.replies!==""?timeDecoder(commentsProp.data.replies.data.children[1].data.created_utc): "NO DATA";
        //looking text body of comment
        const replyCommentTextElement: ChildNode | null = commentsProp.data.replies!==""?domElementObtainer(commentsProp.data.replies.data.children[1].data.body_html): null;
        const correctString: string = replyCommentTextElement?replyCommentTextElement.children[0].innerHTML: "NO DATA";

        render(<CommentsArea comment={commentsProp} key={uuidv4()}/>);

        expect(screen.queryByText(commentsProp.data.replies!==""?commentsProp.data.replies.data.children[1].data.author: "NO DATA")).not.toBeInTheDocument();
        expect(screen.queryByText("• "+correctTime)).not.toBeInTheDocument(); 
        expect(screen.queryByText(correctString)).not.toBeInTheDocument();
    })

})