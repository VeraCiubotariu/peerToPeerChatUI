import {useEffect, useState} from "react";
import Message from "../interfaces/Message.ts";
import {sendMessage} from "../hooks/websocket-hooks.ts";
import {switchToUDP} from "../hooks/utility-hooks.ts";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedOption, setSelectedOption} from "../redux/slices/selectedOptionSlice.ts";

export default function NewPrivateChatWindow() {
    const [hidden, setHidden] = useState(true);
    const [receiver, setReceiver] = useState("");

    const selectedOption = useSelector(getSelectedOption);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedOption === "chat") {
            setHidden(false);
            dispatch(setSelectedOption(null));
        }
    }, [dispatch, selectedOption]);

    function createNewPrivateChat() {
        if (receiver !== "") {
            switchToUDP();

            const message: Message = {
                "sender": null,
                "receiver": receiver,
                "message": `!hello`,
                "group": null
            };

            sendMessage(message);
            setHidden(true);
        }
    }

    return (
        <>
            <div hidden={hidden} className="popup-menu">
                <label>Start a private chat with user:</label>
                <input type="text" onChange={(e) => setReceiver(e.target.value)}/>
                <button className="chat-button" onClick={createNewPrivateChat}>Create</button>
                <button className="chat-button" onClick={() => {
                    setHidden(true);
                }}>Cancel
                </button>
            </div>
        </>
    )
}