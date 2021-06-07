import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import axios from "axios";

export default function Home() {

    const { username } = useContext(UserContext);
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [mUser, setMUser] = useState("");
    const [mBody, setMBody] = useState("");

    async function getSentMessages() {
        const sentMes = await axios.get("/message/sent");
        setSentMessages(sentMes.data);
        console.log(sentMes.data);
    };

    async function getReceivedMessages() {
        const receivedMes = await axios.get("/message/received");
        setReceivedMessages(receivedMes.data);
        console.log(receivedMes.data);
    };

    async function sendMessage(e) {
        e.preventDefault();

        try {
            const messageData = {
                body: mBody,
                toUser: mUser,
                fromUser: username
            }

            await axios.post("/message", messageData);
            alert("success")
            getSentMessages();
            setMBody("");
            setMUser("");
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getSentMessages();
        getReceivedMessages();
    }, [])

    return (
        <div>
            <header style={{ marginBottom: "100px", textAlign: "center" }}>
                <h1>Home</h1>
                <h2>Welcome {username}</h2>
            </header>
            <main style={{ display: "inline" }}>
                <div style={{ textAlign: "center" }}>
                    <h3>Send a message</h3>
                    <form onSubmit={(e) => sendMessage(e)}>
                        <label>To:</label>
                        <input type="text" value={mUser} onChange={(e) => setMUser(e.target.value)} />
                        <br /><br />
                        <label>Body:</label>
                        <textarea value={mBody} onChange={(e) => setMBody(e.target.value)} />
                        <br /><br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div style={{ float: "left", marginLeft: "200px" }}>
                    <h3>Your <u>sent</u> messages</h3>
                    {sentMessages.map((sm) => (
                        <div style={{ border: "1px solid blue", marginTop: "20px", padding: "10px" }}>
                            <p><b>To:</b> {sm.toUser}</p>
                            <p><b>Message:</b> {sm.body}</p>
                        </div>
                    ))}
                </div>
                <div style={{ float: "right", marginRight: "200px" }}>
                    <h3>Your <u>received</u> messages</h3>
                    {receivedMessages.map((sm) => (
                        <div style={{ border: "1px solid red", marginTop: "20px", padding: "10px" }}>
                            <p><b>From:</b> {sm.fromUser}</p>
                            <p><b>Message:</b> {sm.body}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}