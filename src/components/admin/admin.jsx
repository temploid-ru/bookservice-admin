import React from 'react';
import {
    BrowserRouter as Router, Switch, Route, Link
} from 'react-router-dom';

import AdminEditTables from "./edit-tables";
import AdminHome from "./home";

import './admin.scss';

function Admin() {

    return (<Router>
        <div className="body">
            <aside className="aside">
                <div className="aside__title">Панель навигации</div>
                <ul className="aside__menu">
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/edit-tables">Редактирование столов</Link></li>
                </ul>
            </aside>
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
