import React from "react";
import LoginCard from "../components/LoginCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Login({ setLoading }) {

    return (
        <Container style={{ marginTop: "12%" }}>
            <Row>
                <Col style={{ padding: "0px" }}>
                    <LoginCard setLoading={setLoading} />
                </Col>
            </Row>
        </Container>
        // <div>
        //     {switcher === "login" && (
        //         <div>
        //             <h1>Login</h1>
        //             <form onSubmit={(e) => userLogin(e)}>
        //                 <input
        //                     type="text"
        //                     value={username}
        //                     required
        //                     placeholder="Username"
        //                     onChange={(e) => setUsername(e.target.value)}
        //                 />
        //                 <br /><br />
        //                 <input
        //                     type="password"
        //                     value={password}
        //                     required
        //                     placeholder="Password"
        //                     onChange={(e) => setPassword(e.target.value)}
        //                 />
        //                 <br /><br />
        //                 <button type="submit">Submit</button>
        //             </form>
        //             <p>Don't have an account? <span className="nav-link" onClick={(e) => setSwitcher("signup")}>Sign Up</span></p>
        //         </div>
        //     )}

        //     {switcher === "signup" && (
        //         <div>
        //             <h1>Signup</h1>
        //             <form onSubmit={(e) => userSignUp(e)}>
        //                 <input
        //                     type="email"
        //                     value={email}
        //                     required
        //                     placeholder="Email"
        //                     onChange={(e) => setEmail(e.target.value)}
        //                 />
        //                 <br /><br />
        //                 <input
        //                     type="text"
        //                     value={username}
        //                     required
        //                     placeholder="Username"
        //                     onChange={(e) => setUsername(e.target.value)}
        //                 />
        //                 <br /><br />
        //                 <input
        //                     type="password"
        //                     value={password}
        //                     required
        //                     placeholder="Password"
        //                     onChange={(e) => setPassword(e.target.value)}
        //                 />
        //                 <br /><br />
        //                 <input
        //                     type="password"
        //                     value={passwordVerify}
        //                     required
        //                     placeholder="Re-enter Password"
        //                     onChange={(e) => setPasswordVerify(e.target.value)}
        //                 />
        //                 <br /><br />
        //                 <button type="submit">Submit</button>
        //             </form>
        //             <footer>
        //                 <p>Already have an account? <span className="nav-link" onClick={() => setSwitcher("login")}>Login</span></p>
        //             </footer>
        //         </div>
        //     )}
        // </div>
    )
}
