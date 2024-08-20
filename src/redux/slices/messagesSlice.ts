import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {MessagesState} from "../../interfaces/MessagesState.ts";

const initState: MessagesState = {
    value: []
}

export const messagesSlice = createSlice({
    name: "messages",
    initialState: initState,
    reducers: {
        addMessage: (state, action) => {
            state.value.push(action.payload);
        },
        clearMessages: (state) => {
            state.value = [];
        }
    }
});

export const getMessages = (state: RootState) => state.messages.value;

export const {addMessage, clearMessages} = messagesSlice.actions;
export default messagesSlice.reducer;