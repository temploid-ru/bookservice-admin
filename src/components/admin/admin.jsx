import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AdminEditTables from "./edit-tables";
import AdminHome from "./home";

import './admin.scss';
import AdminAside from "./aside";
import Hostes from "../hostes";

function Admin() {

    return (
        <Router>
            <div className="body">

                <AdminAside/>

                <main className="main">
                    <Switch>
                        <Route path="/hostes"><Hostes/></Route>
                        <Route path="/edit-tables"><AdminEditTables/></Route>
                        <Route path="/"><AdminHome/></Route>
                    </Switch>
                </main>
            </div>
        </Router>)
}

export default Admin;
