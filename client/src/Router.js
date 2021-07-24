import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./utils/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";
import InitialLoading from "./pages/InitialLoading";

export default function Router() {

    const { loggedIn } = useContext(AuthContext);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 2500);
    }, []);

    return (
        <BrowserRouter>
            {loggedIn === false && (
                <Switch>
                    <Route exact path="/">
                        {loading === false ? <Login loading={loading} setLoading={setLoading} /> : <InitialLoading loading={loading} setLoading={setLoading} />}
                    </Route>
                    <Route exact path="/home">
                        <Redirect to="/" />
                    </Route>
                    <Route exact path="/convo">
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
                        {loading === false ? <Home loading={loading} setLoading={setLoading} /> : <Loading loading={loading} setLoading={setLoading} />}
                    </Route>
                    <Route exact path="/profile">
                        {loading === false ? <Profile loading={loading} setLoading={setLoading} /> : <Loading loading={loading} setLoading={setLoading} />}
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            )}
        </BrowserRouter>
    )
}
