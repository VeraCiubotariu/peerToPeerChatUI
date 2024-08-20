import {setSelectedOption} from "../redux/slices/selectedOptionSlice.ts";
import {switchToUDP} from "../hooks/utility-hooks.ts";
import Message from "../interfaces/Message.ts";
import {sendMessage} from "../hooks/websocket-hooks.ts";
import {getAllActiveConversations} from "../hooks/rest-hooks.ts";
import {setGroups} from "../redux/slices/groupsSlice.ts";
import {getCurrentConversation, setCurrentGroup} from "../redux/slices/currentConversationSlice.ts";
import {clearMessages} from "../redux/slices/messagesSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function ChatButtonsBar() {
    const currentConversation = useSelector(getCurrentConversation);
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (currentConversation.conversationId !== null) {
            setHidden(false);
        } else {
            setHidden(true);
        }

    }, [currentConversation]);

    function handleInvitation() {
        dispatch(setSelectedOption("invitation"));
    }

    function disconnectFromChat() {
        switchToUDP();

        const message: Message = {
            message: "!byeg",
            sender: null,
            receiver: currentConversation.conversationId,
            group: currentConversation.conversationId
        };
        sendMessage(message);

        const msg: Message = {
            message: "!bye",
            sender: null,
            receiver: currentConversation.conversationId,
            group: currentConversation.conversationId
        };
        sendMessage(msg);

        getAllActiveConversations().then((conversations) => {
            dispatch(setGroups(conversations));
            dispatch(setCurrentGroup(null));
            dispatch(clearMessages());
        });
    }

    return (
        <>
            <div className="buttons-bar" hidden={hidden}>
                <button className="chat-button" onClick={disconnectFromChat}>Disconnect</button>
                <button className="chat-button" onClick={handleInvitation}>Invite member</button>
            </div>
        </>
    )
}