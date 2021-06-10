import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../utils/UserContext";
import axios from "axios";
import TheirMessages from "../components/TheirMessages";
import YourMessages from "../components/YourMessages";
import BothMessages from "../components/BothMessages";

export default function Conversation() {

    const search = useLocation();
    const convoId = search.pathname.substr(7, 24);
    const user2 = search.pathname.slice(32);
    const { username } = useContext(UserContext);
    const [yourMessages, setYourMessages] = useState([]);
    const [theirMessages, setTheirMessages] = useState([]);
    const [messagesShow, setMessagesShow] = useState("");
    const [messageBody, setMessageBody] = useState("");

    function groupBy2(array, prop) {
        let grouped = {};
        for (let i = 0; i < array.length; i++) {
            let p = array[i][prop];
            if (!grouped[p]) { grouped[p] = []; }
            grouped[p].push(array[i]);
        }
        return grouped;
    }

    const getMessages = async () => {

        const convoMessages = await axios.get(`/message/${convoId}`);
        const allMessages = convoMessages.data;
        const messageObject = groupBy2(allMessages, "fromUser");
        console.log(messageObject);
        console.log(messageObject[username]);
        console.log(messageObject[user2]);

        if (messageObject[username] === undefined && messageObject[user2] === undefined) {
            setMessagesShow("no messages");
        } else if (messageObject[username] !== undefined && messageObject[user2] === undefined) {
            setTheirMessages(messageObject[user2]);
            setYourMessages(messageObject[username]);
            setMessagesShow("you");
        } else if (messageObject[username] === undefined && messageObject[user2] !== undefined) {
            setTheirMessages(messageObject[user2]);
            setYourMessages(messageObject[username]);
            setMessagesShow("them");
        } else {
            setTheirMessages(messageObject[user2]);
            setYourMessages(messageObject[username]);
            setMessagesShow("both");
        }
    };

    const sendMessage = async (e) => {
        try {
            e.preventDefault();

            const messageData = {
                body: messageBody,
                fromUser: username,
                convoId: convoId
            };

            await axios.post("/message", messageData);
            await axios.put(`/message/convo/count`, messageData);

            alert("Message sent!");
            getMessages();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getMessages();
    }, [username]);

    return (
        <div>
            <br /><br />
            <div style={{ textAlign: "center" }}>
                <h1>Conversation with {user2}</h1>
            </div>
            <br /><br />
            {messagesShow === "both" && (
                <BothMessages user2={user2} theirMessages={theirMessages} yourMessages={yourMessages} />
            )}
            {messagesShow === "you" && (
                <div style={{ display: "inline" }}>
                    <YourMessages messages={yourMessages} />
                </div>
            )}
            {messagesShow === "them" && (
                <div style={{ display: "inline" }}>
                    <TheirMessages user2={user2} messages={theirMessages} />
                </div>
            )}
            {messagesShow === "no messages" && (
                <div style={{ textAlign: "center" }}>
                    <h3>No messages yet</h3>
                </div>
            )}
            <div style={{ marginTop: "300px", textAlign: "center" }}>
                <h3>Send a message to {user2}</h3>
                <form onSubmit={(e) => sendMessage(e)}>
                    <textarea
                        rows="8"
                        cols="50"
                        required
                        placeholder="Howdy Friend :)"
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                    ></textarea>
                    <br /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div >
    )
}