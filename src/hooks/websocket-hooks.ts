import {useEffect} from "react";
import Message from "../interfaces/Message.ts";
import {useDispatch} from "react-redux";
import {addMessage} from "../redux/slices/messagesSlice.ts";
import {setGroups} from "../redux/slices/groupsSlice.ts";
import {setRequestState} from "../redux/slices/requestStateSlice.ts";
import {getAllActiveConversations} from "./rest-hooks.ts";
import {setCurrentGroup, setCurrentPrivateChat} from "../redux/slices/currentConversationSlice.ts";

const ws = new WebSocket('ws://localhost:8080/chat-websocket');

export const sendMessage = (message: Message) => {
    ws.send(JSON.stringify(message));
}

export const useWebsocketControls = () => {
    const dispatch = useDispatch();

    const setupWebsocket = () => {
        ws.onopen = () => {
            console.log('Connection opened');
        }

        ws.onmessage = (e) => {
            console.log('Received message: ' + JSON.stringify(e.data));
            const message: Message = JSON.parse(e.data);

            if (message.message.startsWith("!ackg")) {
                alert("User " + message.sender + " joined the group " + message.group);

                getAllActiveConversations().then((conversations) => {
                    dispatch(setGroups(conversations));
                });

                dispatch(setCurrentGroup(message.group));

                return;
            }

            if (message.message.startsWith("!ack")) {
                alert("User " + message.sender + " accepted your request");

                getAllActiveConversations().then((conversations) => {
                    dispatch(setGroups(conversations));
                });

                dispatch(setCurrentPrivateChat(message.sender));

                return;
            }

            if(message.message.startsWith("!byeg")) {
                alert("User " + message.sender + " left the group " + message.group);

                getAllActiveConversations().then((conversations) => {
                    dispatch(setGroups(conversations));
                });

                dispatch(setCurrentGroup(null));

                return;
            }

            if(message.message.startsWith("!bye")) {
                alert("User " + message.sender + " left the conversation");

                getAllActiveConversations().then((conversations) => {
                    dispatch(setGroups(conversations));
                });

                dispatch(setCurrentGroup(null));

                return;
            }

            if (message.message.startsWith("!hello")) {
                dispatch(setRequestState(message));
                return;
            }

            if (message.message.startsWith("!invite")) {
                dispatch(setRequestState(message));
                return;
            }

            dispatch(addMessage(message));
        }

        ws.onclose = () => {
            console.log('Connection closed');
        }

        ws.onerror = (e) => {
            console.error(e);
        }
    }

    useEffect(() => {
        setupWebsocket()
    }, []);


    return {
        setupWebsocket
    }
}