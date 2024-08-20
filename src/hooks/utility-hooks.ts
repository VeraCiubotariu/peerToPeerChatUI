import Message from "../interfaces/Message.ts";
import {sendMessage} from "./websocket-hooks.ts";

export const switchToUDP = () => {
    const message: Message = {
        group: null,
        receiver: null,
        sender: null,
        message: "!toUDP"
    };

    sendMessage(message);
};