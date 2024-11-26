import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from "../components/header/Header";
import { renderWithReduxRouter } from "../helperData/testingTools"
import { switchHeaderVisibility } from "../components/header/headerSlice";


jest.spyOn(window, "scrollTo");


describe("Header behaviour", () => {
    it("must render header component", ()=>{
        renderWithReduxRouter(<Header/>)
        expect(screen.getByRole("banner")).toBeInTheDocument();
    })


   it("must show correct work with <Link/>", async () => {
        renderWithReduxRouter(<Header/>)
        userEvent.click(screen.getByRole("link"));
        expect(screen.getByRole("link")).toBeInTheDocument();
        expect(window.location.pathname).toBe("/")
    })

    it("must show correct form element behaviour", () => {
        const handleSubmit = jest.fn();

        renderWithReduxRouter(<Header/>)

        const form: HTMLElement = screen.getByTestId("form");
        form.onsubmit = handleSubmit;
        fireEvent.submit(form);

        expect(form).toBeInTheDocument();
        expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    it("must show correct input field behaviour on feedArea", () => {
        const handleChange = jest.fn();

        const {store} = renderWithReduxRouter(<Header/>)

        const input: HTMLElement = screen.getByRole("textbox");
        input.onchange = handleChange;
        fireEvent.change(input);

        expect(store.getState().header.showHeader).toBeTruthy();
        expect(input).toBeInTheDocument();
        expect(input).toBeEnabled();
        expect(handleChange).toHaveBeenCalledTimes(1);

    })

    it("must show correct input field behaviour on postArea", () => {
        const {store, rerender} = renderWithReduxRouter(<Header/>)
        store.dispatch(switchHeaderVisibility(false));

        rerender(<Header/>)
        
        const input = screen.getByRole("textbox");
        expect(store.getState().header.showHeader).toBeFalsy();
        expect(input).toBeDisabled();
    })

   it("must not show clear button", () => {
        renderWithReduxRouter(<Header/>)
        expect(screen.queryByText("x")).not.toBeInTheDocument();
    })

    it("must show clear button and button should work correct", async () => {
    
    renderWithReduxRouter(<Header/>)

    const input: HTMLElement = screen.getByRole("textbox");
    userEvent.type(input, "Something");
    const clearButton: HTMLElement | null= screen.queryByText("x");
    
    
    expect(clearButton).toBeInTheDocument();
    clearButton&&userEvent.click(clearButton);
    expect(input).toHaveTextContent("");
    expect.assertions(2);
    })
})