import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useHistory } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default function ProfileBar({ setLoading }) {

    const history = useHistory();

    const changePage = (e, link, time) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), time);
        history.push(link);
    }

    return (
        <Navbar>
            <Navbar.Brand style={{ color: "#826AED" }} className="nav" onClick={(e) => changePage(e, "/home", 1000)}> Chat App</Navbar.Brand>
            <Navbar.Collapse style={{ justifyContent: "flex-end" }}>
                <Nav>
                    <p className="logout" onClick={(e) => changePage(e, "/", 3000)}>Logout</p>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
