import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../utils/AuthContext";
import axios from "axios";

export default function Login() {

    const [switcher, setSwitcher] = useState("login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    async function userLogin(e) {
        e.preventDefault();

        try {
            // Grab user data from form
            const loginData = { username, password };

            // API calls to log user in
            await axios.post("/user/login", loginData);
            await getLoggedIn();

            // Reset State
            setUsername("");
            setPassword("");

            // Send to protected home page
            history.push("/home");
        } catch (err) {
            console.error(err);
            alert(err.request.response);
        }
    }

    async function userSignUp(e) {
        e.preventDefault();

        try {
            // Grab user data from form
            const signUpData = { email, username, password, passwordVerify };

            // API calls to log user in
            await axios.post("/user/signup", signUpData);
            await getLoggedIn();

            // Reset State
            setEmail("");
            setUsername("");
            setPassword("");
            setPasswordVerify("");

            // Send to protected home page
            history.push("/home");
        } catch (err) {
            console.error(err);
            alert(err.request.response);
        }
    }



    return (
        <div>
            {switcher === "login" && (
                <div>
                    <h1>Login</h1>
                    <form onSubmit={(e) => userLogin(e)}>
                        <input
                            type="text"
                            value={username}
                            required
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br /><br />
                        <input
                            type="password"
                            value={password}
                            required
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br /><br />
                        <button type="submit">Submit</button>
                    </form>
                    <p>Don't have an account? <span className="nav-link" onClick={(e) => setSwitcher("signup")}>Sign Up</span></p>
                </div>
            )}

            {switcher === "signup" && (
                <div>
                    <h1>Signup</h1>
                    <form onSubmit={(e) => userSignUp(e)}>
                        <input
                            type="email"
                            value={email}
                            required
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br /><br />
                        <input
                            type="text"
                            value={username}
                            required
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br /><br />
                        <input
                            type="password"
                            value={password}
                            required
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br /><br />
                        <input
                            type="password"
                            value={passwordVerify}
                            required
                            placeholder="Re-enter Password"
                            onChange={(e) => setPasswordVerify(e.target.value)}
                        />
                        <br /><br />
                        <button type="submit">Submit</button>
                    </form>
                    <footer>
                        <p>Already have an account? <span className="nav-link" onClick={() => setSwitcher("login")}>Login</span></p>
                    </footer>
                </div>
            )}
        </div>
    )
}
