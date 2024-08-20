import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {GroupsState} from "../../interfaces/GroupsState.ts";

const initState: GroupsState = {
    value: []
}

export const groupsSlice = createSlice({
    name: "groups",
    initialState: initState,
    reducers: {
        setGroups: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const getGroups = (state: RootState) => state.groups.value;

export const {setGroups} = groupsSlice.actions;
export default groupsSlice.reducer;