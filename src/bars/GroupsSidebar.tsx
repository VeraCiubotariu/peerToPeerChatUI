import {useEffect} from "react";
import {switchConversation} from "../hooks/rest-hooks.ts";
import {useDispatch, useSelector} from "react-redux";
import {clearMessages} from "../redux/slices/messagesSlice.ts";
import {setCurrentGroup} from "../redux/slices/currentConversationSlice.ts";
import {getGroups} from "../redux/slices/groupsSlice.ts";

export default function GroupsSidebar() {
    const groups: string[] = useSelector(getGroups);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Groups changed: " + JSON.stringify(groups));
    }, [groups]);

    function changeActiveGroup(groupId: string) {
        switchConversation(groupId).then(() => {
            dispatch(clearMessages());
        });

        dispatch(setCurrentGroup(groupId));
    }

    return (
        <>
            <div className="groups">
                {
                    groups.map((groupName: string) => {
                        return <button className="menu-button"
                                       onClick={() => changeActiveGroup(groupName)}>{groupName}</button>;
                    })
                }
            </div>
        </>
    )
}