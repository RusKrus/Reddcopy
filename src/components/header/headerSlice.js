import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
    name: "inputField",
    initialState: {
        inputValue: "",
        filterValue: "",
        showHeader: true
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
        },
        switchHeaderVisibility(state, action){
            state.showHeader = action.payload;
        }


    }
})

export const getInputValue = (state) => state.inputField.inputValue;
export const { setFilterValue, clearFilterValue, setInputValue, clearInputValue, switchHeaderVisibility } = headerSlice.actions;

export default headerSlice.reducer;