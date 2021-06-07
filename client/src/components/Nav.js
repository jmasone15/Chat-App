import React, { useContext } from 'react';
import { useHistory } from "react-router";
import AuthContext from '../utils/AuthContext';
import axios from "axios";

export default function Nav() {

    const history = useHistory();
    const { getLoggedIn, loggedIn } = useContext(AuthContext);

    async function handleClick(e, page) {
        e.preventDefault();

        if (page === "logout") {
            await axios.get("/user/logout");
            await getLoggedIn();
            history.push("/");
        } else {
            history.push(page);
        }
    }

    return (
        <>
            {loggedIn === true && (
                <nav>
                    <span className="nav-link" onClick={(e) => handleClick(e, "/home")} style={{ margin: "10px" }}>Home</span>
                    <span className="nav-link" onClick={(e) => handleClick(e, "logout")} style={{ margin: "10px" }}>Logout</span>
                </nav>
            )}
            {loggedIn === false && (
                <nav>
                    <span className="nav-link" onClick={(e) => handleClick(e, "/")} style={{ margin: "10px" }}>Login/Signup</span>
                </nav>
            )}
        </>
    )
}
