import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "./UserContext";

const MessageContext = createContext();

function MessageContextProvider(props) {

    const { userId } = useContext(UserContext);
    const [conversations, setConversations] = useState([]);

    async function getConversations() {
        if (userId !== "") {
            const convos = await axios.get(`/message/convos/${userId}`);
            setConversations(convos.data);
        }
    }

    useEffect(() => {
        getConversations();
    }, []);

    return (
        <MessageContext.Provider value={{ conversations, getConversations }}>
            {props.children}
        </MessageContext.Provider>
    )
}

export default MessageContext;
export { MessageContextProvider };