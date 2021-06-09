import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/UserContext";
import axios from "axios";

export default function Home() {

    const { userId, username } = useContext(UserContext);
    const [conversations, setConversations] = useState("");
    const [convoShow, setConvoShow] = useState(false);
    const [newUser2, setNewUser2] = useState("");
    const [user2Id, setUser2Id] = useState("");
    const history = useHistory();

    async function getConversations() {
        if (userId !== "") {
            const convos = await axios.get(`/message/convos/${userId}`);
            setConversations(convos.data);
            setConvoShow(true);
            console.log(convos.data);
        }
    }

    async function getOneConversation(e, id) {
        e.preventDefault();
        history.push(`/convo/${id}`);
    }

    async function startConversation(e) {
        e.preventDefault();

        try {

            const convoData = {
                user1: username,
                user2: newUser2,
                user1Id: userId
            };

            await axios.post("/message/convo", convoData);
            getConversations();
            setNewUser2("");

        } catch (err) {
            console.error(err);
        };
    };

    useEffect(() => {
        getConversations();
    }, [userId]);

    return (
        <div>
            <header style={{ marginBottom: "100px", textAlign: "center" }}>
                <h1>Home</h1>
                <h2>Welcome {username}</h2>
            </header>
            <main style={{ display: "inline" }}>
                <div style={{ textAlign: "center" }}>
                    <h3>Start a Conversation</h3>
                    <form onSubmit={(e) => startConversation(e)}>
                        <input
                            type="text"
                            value={newUser2}
                            onChange={(e) => setNewUser2(e.target.value)}
                            required
                            placeholder="Username Here"
                        />
                        <br /><br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                {convoShow === true && (
                    <div>
                        {conversations.map((c) => (
                            <div>
                                <p>With: {c.user2}</p>
                                <button onClick={(e) => getOneConversation(e, c.user2Id)}>Open Convo</button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}