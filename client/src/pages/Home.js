import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/UserContext";
import TopBar from "../components/TopBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideColumn from "../components/SideColumn";
import MessagesBox from "../components/MessagesBox";
import axios from "axios";

export default function Home({ loading, setLoading }) {

    const { username } = useContext(UserContext);
    const [conversations, setConversations] = useState("");
    const [selectedUser, setSelectedUser] = useState("none");
    const [newUser2, setNewUser2] = useState("");
    const [messages, setMessages] = useState([]);
    const history = useHistory();

    async function getConversations() {
        if (username !== "") {
            const convos = await axios.get(`/message/convos/${username}`);
            setConversations(convos.data);
            console.log(convos.data);
        }
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

    const getMessages = async (e, id, user2) => {
        e.preventDefault();

        try {
            const convoMessages = await axios.get(`/message/${id}`);
            const sortedMessages = convoMessages.data.sort((x, y) => {
                return x.date - y.date;
            });
            setSelectedUser(user2);
            setMessages(sortedMessages);
            console.log(sortedMessages);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getConversations();
    }, [username]);

    return (
        <Container fluid>
            <Row>
                <Col className="nav-class">
                    <TopBar loading={loading} setLoading={setLoading} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Container fluid style={{ marginTop: "100px" }}>
                        <Row style={{ alignItems: "center", marginLeft: "25px" }}>
                            <Col xl="2">
                                <SideColumn username={username} convos={conversations} getMessages={getMessages} />
                            </Col>
                            {selectedUser !== "none" && (
                                <Col xl="10">
                                    <MessagesBox selectedUser={selectedUser} data={messages} />
                                </Col>
                            )}
                            {selectedUser === "none" && (
                                <Col xl="10">
                                    <h1 style={{ textAlign: "center" }}>Click on a name to open their conversation</h1>
                                </Col>
                            )}
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
        // <div>
        //     <header style={{ marginBottom: "100px", textAlign: "center" }}>
        //         <h1>Home</h1>
        //         <h2>Welcome {username}</h2>
        //     </header>
        //     <main style={{ display: "inline" }}>
        //         <div style={{ textAlign: "center" }}>
        //             <h3>Start a Conversation</h3>
        //             <form onSubmit={(e) => startConversation(e)}>
        //                 <input
        //                     type="text"
        //                     value={newUser2}
        //                     onChange={(e) => setNewUser2(e.target.value)}
        //                     required
        //                     placeholder="Username Here"
        //                 />
        //                 <br /><br />
        //                 <button type="submit">Submit</button>
        //             </form>
        //         </div>
        //         {convoShow === true && (
        //             <div>
        //                 {conversations.map((c) => (
        //                     <div>
        //                         {c.user2 === username && (
        //                             <div>
        //                                 <p>With: {c.user1}</p>
        //                                 <button onClick={(e) => getOneConversation(e, c.user1, c._id)}>Open Convo</button>
        //                             </div>
        //                         )}
        //                         {c.user2 !== username && (
        //                             <div>
        //                                 <p>With: {c.user2}</p>
        //                                 <button onClick={(e) => getOneConversation(e, c.user2, c._id)}>Open Convo</button>
        //                             </div>
        //                         )}
        //                     </div>
        //                 ))}
        //             </div>
        //         )}
        //     </main>
        // </div>
    )
}