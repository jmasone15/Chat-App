import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/UserContext";
import axios from "axios";

export default function Home() {

    const { username } = useContext(UserContext);
    const [conversations, setConversations] = useState("");
    const [convoShow, setConvoShow] = useState(false);
    const [newUser2, setNewUser2] = useState("");
    const history = useHistory();

    async function getConversations() {
        if (username !== "") {
            const convos = await axios.get(`/message/convos/${username}`);
            setConversations(convos.data);
            setConvoShow(true);
            console.log(convos.data);
        }
    }

    async function getOneConversation(e, name, id) {
        e.preventDefault();
        history.push(`/convo/${id}/${name}`);
    }

    async function startConversation(e) {
        e.preventDefault();

        try {

            const convoData = {
                user1: username,
                user2: newUser2,
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
    }, [username]);

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
                                {c.user2 === username && (
                                    <div>
                                        <p>With: {c.user1}</p>
                                        <button onClick={(e) => getOneConversation(e, c.user1, c._id)}>Open Convo</button>
                                    </div>
                                )}
                                {c.user2 !== username && (
                                    <div>
                                        <p>With: {c.user2}</p>
                                        <button onClick={(e) => getOneConversation(e, c.user2, c._id)}>Open Convo</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}