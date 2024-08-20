import Message from "../interfaces/Message.ts";
import {useEffect, useState} from "react";
import {sendMessage} from "../hooks/websocket-hooks.ts";
import {addMessage} from "../redux/slices/messagesSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentConversation} from "../redux/slices/currentConversationSlice.ts";

export default function MessageBar() {
    const [message, setMessage] = useState<string>("");
    const [hidden, setHidden] = useState(true);

    const currentConversation = useSelector(getCurrentConversation);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(currentConversation);
        if (currentConversation.conversationId !== null) {
            setHidden(false);
        } else {
            setHidden(true);
        }

    }, [currentConversation]);

    function handleSendMessage() {
        const msg: Message = {
            sender: null,
            receiver: null,
            message: message,
            group: null
        };

        if (message !== "") {
            dispatch(addMessage(msg));
            sendMessage(msg);
        }
    }

    return (
        <>
            <div id="message-bar" hidden={hidden}>
                <label hidden={hidden}>Message {currentConversation.conversationId}</label>
                <input hidden={hidden} className="chat-input"
                    value={message}
                    onChange={e => setMessage(e.target.value)}/>
                <button hidden={hidden} className="chat-button"
                        onClick={handleSendMessage}>Send
                </button>
            </div>
        </>
    )
}