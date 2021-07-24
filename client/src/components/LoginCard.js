import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../utils/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaGithub, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import axios from "axios";

export default function LoginCard({ setLoading }) {

    const [switcher, setSwitcher] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    const switchCard = (e, type) => {
        e.preventDefault();

        if (type === "signUp") {
            setSwitcher(true);
        } else if (type === "signIn") {
            setSwitcher(false);
        }
    };

    const changePage = (link) => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
        history.push(link);
    }

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
            changePage("/home");
        } catch (err) {
            console.error(err);
            alert(err.request.response);
        }
    }

    async function userSignUp(e) {
        e.preventDefault();

        try {
            // Grab user data from form
            const signUpData = { email, username, password };

            // API calls to log user in
            await axios.post("/user/signup", signUpData);
            await getLoggedIn();

            // Reset State
            setEmail("");
            setUsername("");
            setPassword("");

            // Send to protected home page
            changePage("/home");
        } catch (err) {
            console.error(err);
            alert(err.request.response);
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div className={switcher ? "login-container right-panel-active" : "login-container"} id="container">
                        <div className="form-container sign-in-container">
                            <form className="form" onSubmit={(e) => userLogin(e)}>
                                <h1>Sign in</h1>
                                <div className="social-container">
                                    <a href="#" className="social"><FaGoogle /></a>
                                    <a href="#" className="social"><FaLinkedinIn /></a>
                                    <a href="#" className="social"><FaGithub /></a>
                                </div>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <a href="#">Forgot your password?</a>
                                <br />
                                <button type="submit" className="button">Sign In</button>
                            </form>
                        </div>
                        <div className="form-container sign-up-container">
                            <form className="form" onSubmit={(e) => userSignUp(e)}>
                                <h1>Create Account</h1>
                                <div className="social-container">
                                    <a href="#" className="social"><FaGoogle /></a>
                                    <a href="#" className="social"><FaLinkedinIn /></a>
                                    <a href="#" className="social"><FaGithub /></a>
                                </div>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <br />
                                <button type="submit" className="button su">Sign Up</button>
                            </form>
                        </div>
                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    <h1>Already a User?</h1>
                                    <p>Login to your account to get back to chatting with your friends!</p>
                                    <button className="ghost button" onClick={(e) => switchCard(e, "signIn")}>Sign In</button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1>New Here?</h1>
                                    <p>Enter a few details to sign up and start chatting with people all across the world!</p>
                                    <button className="ghost button" onClick={(e) => switchCard(e, "signUp")}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
