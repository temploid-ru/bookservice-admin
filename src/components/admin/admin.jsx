import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AdminEditTables from "./edit-tables";
import AdminHome from "./home";

import './admin.scss';
import AdminAside from "./aside";

function Admin() {

    return (
        <Router basename={window.location.pathname}>
            <div className="body">

                <AdminAside/>

                <main className="main">
                    <Switch>
                        <Route path="/edit-tables"><AdminEditTables/></Route>
                        <Route path="/"><AdminHome/></Route>
                    </Switch>
                </main>
            </div>
        </Router>)
}

export default Admin;
