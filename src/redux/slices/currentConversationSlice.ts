import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {Conversation} from "../../interfaces/Conversation.ts";

const initState: Conversation = {
    conversationId: null,
    isGroup: false
}

export const currentConversationSlice = createSlice({
    name: "currentConversation",
    initialState: initState,
    reducers: {
        setCurrentGroup: (state, action) => {
            state.conversationId = action.payload;
            state.isGroup = true;
        },

        setCurrentPrivateChat: (state, action) => {
            state.conversationId = action.payload;
            state.isGroup = false;
        }
    }
});

export const getCurrentConversation = (state: RootState) => state.currentConversation;

export const {setCurrentGroup, setCurrentPrivateChat} = currentConversationSlice.actions;
export default currentConversationSlice.reducer;