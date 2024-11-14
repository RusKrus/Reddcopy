import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { headerSliceState } from "../../helperData/types";


const initialState: headerSliceState = {
        inputValue: "",
        filterValue: "",
        showHeader: true
}

const headerSlice = createSlice({
    name: "inputField",
    initialState,
    reducers: {
        setFilterValue(state, action: PayloadAction<string>) {
            state.filterValue = action.payload;
        },
        clearFilterValue(state) {
            state.filterValue = "";
        },
        setInputValue(state, action: PayloadAction<string>) {
            state.inputValue = action.payload;
        },
        clearInputValue(state) {
            state.inputValue = "";
        },
        switchHeaderVisibility(state, action: PayloadAction<boolean>){
            state.showHeader = action.payload;
        }
    }
})

export const { setFilterValue, clearFilterValue, setInputValue, clearInputValue, switchHeaderVisibility } = headerSlice.actions;

export default headerSlice.reducer;