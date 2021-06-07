import React, { useContext } from "react";
import UserContext from "../utils/UserContext";

export default function Home() {

    const { userId, username, email } = useContext(UserContext);

    console.log(userId);
    console.log(username);
    console.log(email);

    return (
        <div>
            <h1>Home</h1>
            <h3>Welcome {username}</h3>
        </div>
    )
}