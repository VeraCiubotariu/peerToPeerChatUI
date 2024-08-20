import './App.css'
import MessageBar from "./bars/MessageBar.tsx";
import ChatWindow from "./ChatWindow.tsx";
import GroupsSidebar from "./bars/GroupsSidebar.tsx";
import MenuBar from './bars/MenuBar.tsx';
import {useWebsocketControls} from "./hooks/websocket-hooks.ts";
import PrivateChatRequestWindow from "./popup-windows/PrivateChatRequestWindow.tsx";
import GroupInviteRequestWindow from "./popup-windows/GroupInviteRequestWindow.tsx";

function App() {
    useWebsocketControls();

    return (
        <>
            <GroupsSidebar/>
            <MenuBar/>
            <ChatWindow/>
            <MessageBar/>
            <PrivateChatRequestWindow/>
            <GroupInviteRequestWindow/>
        </>
    )
}

export default App
