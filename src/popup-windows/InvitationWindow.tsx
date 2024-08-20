import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedOption, setSelectedOption} from "../redux/slices/selectedOptionSlice.ts";
import {switchToUDP} from "../hooks/utility-hooks.ts";
import Message from "../interfaces/Message.ts";
import {sendMessage} from "../hooks/websocket-hooks.ts";
import {getCurrentConversation} from "../redux/slices/currentConversationSlice.ts";

export default function InvitationWindow() {
    const [receiver, setReceiver] = useState<string>("");
    const [hidden, setHidden] = useState<boolean>(true);

    const selectedOption = useSelector(getSelectedOption);
    const currentGroup = useSelector(getCurrentConversation).conversationId;
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedOption === "invitation") {
            setHidden(false);
            dispatch(setSelectedOption(null));
        }
    }, [dispatch, selectedOption]);

    function sendInvitation() {
        console.log("Sending invitation to " + receiver + " in group " + currentGroup);

        if (receiver !== "") {
            switchToUDP();

            const message: Message = {
                message: "!invite",
                receiver: receiver,
                group: currentGroup,
                sender: null
            };

            sendMessage(message);

            setHidden(true);
        }
    }

    return (
        <>
            <div hidden={hidden} className="popup-menu">
                <label>Invite the following user to the group:</label>
                <input type="text" onChange={(e) => setReceiver(e.target.value)}/>
                <button className="chat-button" onClick={sendInvitation}>Send</button>
                <button className="chat-button" onClick={() => setHidden(true)}>Cancel</button>
            </div>
        </>
    )
}