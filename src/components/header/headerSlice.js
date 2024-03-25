import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
    name: "inputField",
    initialState: {
        inputValue: "",
        filterValue: ""
    },
    reducers: {
        setFilterValue(state, action) {
            state.filterValue = action.payload;
        },
        clearFilterValue(state) {
            state.filterValue = "";
        },
        setInputValue(state, action) {
            state.inputValue = action.payload;
        },
        clearInputValue(state) {
            state.inputValue = "";
        }

    }
})

export const getInputValue = (state) => state.inputField.inputValue;
export const { setFilterValue, clearFilterValue, setInputValue, clearInputValue } = headerSlice.actions;

export default headerSlice.reducer;