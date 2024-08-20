import Message from "./interfaces/Message.ts";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCurrentConversation} from "./redux/slices/currentConversationSlice.ts";
import {getMessages} from "./redux/slices/messagesSlice.ts";
import InvitationWindow from "./popup-windows/InvitationWindow.tsx";
import ChatButtonsBar from "./bars/ChatButtonsBar.tsx";

export default function ChatWindow() {
    const messages: Message[] = useSelector(getMessages);
    const [hidden, setHidden] = useState(true);

    const currentConversation = useSelector(getCurrentConversation);

    useEffect(() => {
        if (currentConversation.conversationId !== null) {
            setHidden(false);
        } else {
            setHidden(true);
        }

    }, [currentConversation]);

    return (
        <>
            <ChatButtonsBar/>
            <div className="chat-window" hidden={hidden}>
                {messages.map((message: Message) => {
                    if (message.sender === null) {
                        return <div className="user-message">{message.message}</div>;
                    }

                    return <div className="message">{message.message}</div>;
                })}
            </div>
            <InvitationWindow/>
        </>
    )
}
