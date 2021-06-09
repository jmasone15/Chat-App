import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Conversation() {

    const search = useLocation();
    const convoId = search.pathname.slice(7);
    const [user2, setUser2] = useState("");

    const getConvoData = async () => {
        try {
            const searchConvo = await axios.get(`/message/convo/${convoId}`);
            setUser2(searchConvo.data.user2);
            console.log(searchConvo.data);
        } catch (err) {
            console.error(err);
        };
    }

    useEffect(() => {
        getConvoData();
    }, []);

    return (
        <div>
            <br /><br />
            <div style={{ textAlign: "center" }}>
                <h1>Conversation with {user2}</h1>
            </div>
            <br /><br />
            <div style={{ display: "inline" }}>
                <div style={{ float: "left", marginLeft: "200px" }}>
                    <h3>Your Messages</h3>
                    <div>
                        <p>Message Here</p>
                    </div>
                </div>
                <div style={{ float: "right", marginRight: "200px" }}>
                    <h3>{user2}'s Messages</h3>
                    <div>
                        <p>Message Here</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
