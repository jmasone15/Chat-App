import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./utils/AuthContext";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function Router() {

    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Nav />
            {loggedIn === false && (
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/home">
                        <Redirect to="/" />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            )}
            {loggedIn === true && (
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route exact path="/home">
                        <Home />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            )}
        </BrowserRouter>
    )
}