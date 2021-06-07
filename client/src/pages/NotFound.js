import React from "react";
import { useHistory } from "react-router";

export default function NotFound() {

    const history = useHistory();

    const changePage = (e) => {
        e.preventDefault();
        history.push("/");
    }

    return (
        <div>
            <h1>404 Not Found</h1>
            <h3><span className="nav-link" onClick={(e) => changePage(e)}>Back to Home</span></h3>
        </div>
    )
}
