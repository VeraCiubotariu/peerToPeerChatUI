import {useDispatch} from "react-redux";
import {setSelectedOption} from "../redux/slices/selectedOptionSlice.ts";
import NewPrivateChatWindow from "../popup-windows/NewPrivateChatWindow.tsx";
import NewGroupWindow from "../popup-windows/NewGroupWindow.tsx";

export default function MenuBar() {
    const dispatch = useDispatch();

    function loadNewPrivateChatWindow() {
        console.log("Loading new chat window...");
        dispatch(setSelectedOption("chat"));
    }

    function loadNewGroupWindow() {
        console.log("Loading new group window...");
        dispatch(setSelectedOption("group"));
    }

    return (
        <>
            <div id="menu">
                <button className="menu-button" onClick={loadNewPrivateChatWindow}>New private chat</button>
                <button className="menu-button" onClick={loadNewGroupWindow}>New group chat</button>
            </div>
            <NewPrivateChatWindow/>
            <NewGroupWindow/>
        </>
    )
}