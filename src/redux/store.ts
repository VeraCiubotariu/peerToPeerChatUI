import {configureStore} from '@reduxjs/toolkit'
import messagesReducer from './slices/messagesSlice.ts'
import groupsReducer from './slices/groupsSlice.ts'
import requestStateReducer from './slices/requestStateSlice.ts'
import selectedOptionReducer from './slices/selectedOptionSlice.ts'
import currentConversationReducer from "./slices/currentConversationSlice.ts";

const store = configureStore({
    reducer: {
        messages: messagesReducer,
        groups: groupsReducer,
        requestState: requestStateReducer,
        selectedOption: selectedOptionReducer,
        currentConversation: currentConversationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>


export default store