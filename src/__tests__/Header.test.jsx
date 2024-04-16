import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from "../components/header/Header";
import { Provider } from 'react-redux';
import store from "../components/app/store";
import { MemoryRouter } from 'react-router-dom';



jest.spyOn(window, "scrollTo");

describe("Header behaviour", () => {

    beforeEach(()=>{
        const header = act(()=>{
            render(
                <MemoryRouter>
                    <Provider store={store}>
                        <Header/>
                    </Provider>
                </MemoryRouter>
            )
        })
        
    })

    it("must render header component", ()=>{
        const headerElement = screen.getByRole("banner");
        expect(headerElement).toBeInTheDocument();
    })

    it("must show correct work with <Link/>", () => {
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        act(()=>{
            userEvent.click(link);
        })
        expect(window.location.pathname).toBe("/")
    })

    it("must show correct form element behaviour", () => {
        const form = screen.getByRole("form");
        expect(form).toBeInTheDocument();
        const handleSubmit = jest.fn();
        form.onsubmit = handleSubmit;
        act(()=>{
            fireEvent.submit(form);
        })
        
        expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    it("must show correct input field behaviour", () => {
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        const handleChange = jest.fn();
        input.onchange = handleChange;
        act(()=>{
            fireEvent.change(input);
        })
        
        expect(handleChange).toHaveBeenCalledTimes(1);
    })

    it("must not show clear button", () => {
        const clearButton = screen.queryByText("x");
        expect(clearButton).not.toBeInTheDocument();
    })

    it("must show clear button and button should work correct", () => {
        const input = screen.getByRole("textbox");
        act(()=>{
            userEvent.type(input, "Something");
        })
        
        const clearButton = screen.queryByText("x");
        expect(clearButton).toBeInTheDocument();
        act(()=>{
            userEvent.click(clearButton);
        })
        
        expect()
    })



})