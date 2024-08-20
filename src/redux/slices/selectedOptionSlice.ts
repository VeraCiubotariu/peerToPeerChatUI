import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {OptionState} from "../../interfaces/OptionState.ts";

const initState: OptionState = {
    value: null
}

export const selectedOptionSlice = createSlice({
    name: "selectedOption",
    initialState: initState,
    reducers: {
        setSelectedOption: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const getSelectedOption = (state: RootState) => state.selectedOption.value;

export const {setSelectedOption} = selectedOptionSlice.actions;
export default selectedOptionSlice.reducer;