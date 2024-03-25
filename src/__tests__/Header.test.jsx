import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from "../components/header/Header";
import * as reduxHooks from "react-redux";
import { MemoryRouter } from 'react-router-dom'
import { setInputValue } from '../components/header/headerSlice';

jest.mock("react-redux");

const useDispatchMocked = jest.spyOn(reduxHooks, 'useDispatch');
const dispatch = jest.fn();


describe("Header behaviour", () => {

    beforeEach(() => {
        useDispatchMocked.mockReturnValue(dispatch)
        render(
            <MemoryRouter initialEntries={["/top"]}>
                <Header />
            </MemoryRouter>)
    })

    it("must render header", () => {
        const headerElement = screen.getByRole("banner");
        expect(headerElement).toBeInTheDocument();
    })

    it("must show correct work with <Link/>", () => {
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        userEvent.click(link);
        expect(window.location.pathname).toBe("/")
    })

    it("must show correct form element behaviour", () => {
        const form = screen.getByRole("form");
        expect(form).toBeInTheDocument();
        const handleSubmit = jest.fn();
        form.onsubmit = handleSubmit;
        fireEvent.submit(form);
        expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    it("must show correct input field behaviour", () => {
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        const handleChange = jest.fn();
        input.onchange = handleChange;
        fireEvent.change(input);
        expect(handleChange).toHaveBeenCalledTimes(1);

    })

    it("must not show clear button", () => {
        const clearButton = screen.queryByText("x");
        expect(clearButton).not.toBeInTheDocument;
    })

    it("must show clear button", async () => {
        const input = screen.getByRole("textbox");
        await waitFor(()=>{
            setInputValue("Something");
            
        })
        expect(input.value).toBe("Something")
        const clearButton = await screen.findByText("x");
        expect(clearButton).toBeInTheDocument();
    })

})