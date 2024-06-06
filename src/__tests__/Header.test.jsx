import { screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from "../components/header/Header";
import { testingTools } from "../helperFuncs/testingTools"



jest.spyOn(window, "scrollTo");

describe("Header behaviour", () => {
    it("must render header component", ()=>{
        testingTools.renderWithReduxRouter(<Header/>)
        const headerElement = screen.getByRole("banner");
        expect(headerElement).toBeInTheDocument();
    })


   it("must show correct work with <Link/>", async () => {
        testingTools.renderWithReduxRouter(<Header/>)
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        await act(async ()=>{
            userEvent.click(link);
        })
        expect(window.location.pathname).toBe("/")
    })

  it("must show correct form element behaviour", () => {
        testingTools.renderWithReduxRouter(<Header/>)
        const form = screen.getByRole("form");
        expect(form).toBeInTheDocument();
        const handleSubmit = jest.fn();
        form.onsubmit = handleSubmit;
        fireEvent.submit(form);
        expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

      it("must show correct input field behaviour", () => {
        testingTools.renderWithReduxRouter(<Header/>)
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        const handleChange = jest.fn();
        input.onchange = handleChange;
        fireEvent.change(input);
        expect(handleChange).toHaveBeenCalledTimes(1);
    })

   it("must not show clear button", () => {
        testingTools.renderWithReduxRouter(<Header/>)
        const clearButton = screen.queryByText("x");
        expect(clearButton).not.toBeInTheDocument();
    })

     it("must show clear button and button should work correct", async () => {
        expect.assertions(2)
        testingTools.renderWithReduxRouter(<Header/>)
        const input = screen.getByRole("textbox");
        await act(async ()=>{
            userEvent.type(input, "Something");
        })
        const clearButton = screen.queryByText("x");
        expect(clearButton).toBeInTheDocument();
        await act(async ()=>{
            userEvent.click(clearButton);
        })
        expect(input).not.toHaveTextContent();
    })
})