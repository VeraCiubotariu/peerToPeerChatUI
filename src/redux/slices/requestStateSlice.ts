import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {RequestState} from "../../interfaces/RequestState.ts";

const initState: RequestState = {
    value: null
}

export const requestStateSlice = createSlice({
    name: "requestState",
    initialState: initState,
    reducers: {
        setRequestState: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const getRequestState = (state: RootState) => state.requestState.value;

export const {setRequestState} = requestStateSlice.actions;
export default requestStateSlice.reducer;