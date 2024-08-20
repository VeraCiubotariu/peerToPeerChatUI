import {useEffect, useState} from "react";
import {sendMessage} from "../hooks/websocket-hooks.ts";
import Message from "../interfaces/Message.ts";
import {switchToUDP} from "../hooks/utility-hooks.ts";
import {useDispatch, useSelector} from "react-redux";
import {setGroups} from "../redux/slices/groupsSlice.ts";
import {getRequestState, setRequestState} from "../redux/slices/requestStateSlice.ts";
import {getAllActiveConversations} from "../hooks/rest-hooks.ts";
import {setCurrentPrivateChat} from "../redux/slices/currentConversationSlice.ts";

export default function PrivateChatRequestWindow() {
    const [hidden, setHidden] = useState(true);
    const [sender, setSender] = useState<string | null>("");

    const requestState = useSelector(getRequestState);
    const dispatch = useDispatch();

    useEffect(() => {
        if (requestState !== null) {
            if (requestState.message.startsWith("!hello")) {
                setHidden(false);
                setSender(requestState.sender);
            }
        }
    }, [requestState]);

    function acceptRequest() {
        if (requestState !== null) {
            switchToUDP();

            const message: Message = {
                "sender": null,
                "receiver": requestState.sender,
                "message": "!ack",
                "group": null
            };

            sendMessage(message);

            getAllActiveConversations().then((conversations) => {
                dispatch(setGroups(conversations));
            });

            dispatch(setCurrentPrivateChat(requestState.sender));

            setHidden(true);
        }
    }

    return (
        <>
            <div hidden={hidden} className="popup-menu">
                <p>{sender} wants to start a conversation</p>
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