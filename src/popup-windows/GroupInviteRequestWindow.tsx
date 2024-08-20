import {useEffect, useState} from "react";
import Message from "../interfaces/Message.ts";
import {sendMessage} from "../hooks/websocket-hooks.ts";
import {switchToUDP} from "../hooks/utility-hooks.ts";
import {useDispatch, useSelector} from "react-redux";
import {setGroups} from "../redux/slices/groupsSlice.ts";
import {getRequestState, setRequestState} from "../redux/slices/requestStateSlice.ts";
import {getAllActiveConversations} from "../hooks/rest-hooks.ts";
import {setCurrentGroup} from "../redux/slices/currentConversationSlice.ts";

export default function GroupInviteRequestWindow() {
    const [hidden, setHidden] = useState(true);
    const [sender, setSender] = useState<string | null>("");
    const [group, setGroup] = useState<string | null>("");

    const requestState = useSelector(getRequestState);
    const dispatch = useDispatch();

    useEffect(() => {
        if (requestState !== null) {
            if (requestState.message.startsWith("!invite")) {
                setSender(requestState.sender);
                setGroup(requestState.group);
                setHidden(false);
            }
        }
    }, [requestState]);

    function acceptRequest() {
        if (requestState != null) {
            switchToUDP();

            const message: Message = {
                "sender": null,
                "receiver": requestState.sender,
                "message": "!ackg",
                "group": requestState.group
            };

            sendMessage(message);

            getAllActiveConversations().then((conversations) => {
                dispatch(setGroups(conversations));
            });

            dispatch(setCurrentGroup(group));

            setHidden(true);
        }
    }

    return (
        <>
            <div hidden={hidden} className="popup-menu">
                <p>{sender} wants to invite you to group {group}</p>
                <button className="chat-button" onClick={acceptRequest}>Accept</button>
                <button className="chat-button" onClick={() => {
                    setHidden(true);
                    dispatch(setRequestState(null));
                }}>Deny
                </button>
            </div>
        </>
    )
}