import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useHistory } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import AuthContext from '../utils/AuthContext';
import axios from "axios";

export default function TopBar({ setLoading }) {

    const history = useHistory();
    const { getLoggedIn } = useContext(AuthContext);

    async function handleClick(e, page, time) {
        e.preventDefault();

        if (page === "logout") {
            await axios.get("/user/logout");
            await getLoggedIn();
            setLoading(true);
            setTimeout(() => setLoading(false), time);
            history.push("/");
        } else {
            history.push(page);
        }
    }

    return (
        <Navbar>
            <Navbar.Brand style={{ color: "#826AED" }} className="nav" onClick={(e) => handleClick(e, "/home", 1000)}> Chat App</Navbar.Brand>
            <Navbar.Collapse style={{ justifyContent: "flex-end" }}>
                <Nav>
                    <p className="logout" onClick={(e) => handleClick(e, "logout", 3000)}>Logout</p>
                    <img onClick={(e) => handleClick(e, "/profile", 1000)} src="https://via.placeholder.com/50" alt="profile" className="profile-image" />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

