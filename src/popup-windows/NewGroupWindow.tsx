import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedOption, setSelectedOption} from "../redux/slices/selectedOptionSlice.ts";
import {setGroups} from "../redux/slices/groupsSlice.ts";
import {createGroup, getAllActiveConversations} from "../hooks/rest-hooks.ts";
import {setCurrentGroup} from "../redux/slices/currentConversationSlice.ts";

export default function NewGroupWindow() {
    const [hidden, setHidden] = useState(true);
    const [group, setGroup] = useState("");

    const selectedOption = useSelector(getSelectedOption);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedOption === "group") {
            setHidden(false);
            dispatch(setSelectedOption(null));
        }
    }, [dispatch, selectedOption]);

    function createNewGroup() {
        if (group !== "") {
            createGroup(group).then(() => {
                getAllActiveConversations().then((conversations) => {
                    dispatch(setGroups(conversations));
                });

                dispatch(setCurrentGroup(group));

                setHidden(true);
            });
        }
    }

    return (
        <>
            <div hidden={hidden} className="popup-menu">
                <label>Create group with name:</label>
                <input type="text" onChange={(e) => setGroup(e.target.value)}/>
                <button className="chat-button" onClick={createNewGroup}>Create</button>
                <button className="chat-button" onClick={() => {
                    setHidden(true);
                }}>Cancel
                </button>
            </div>
        </>
    )
}