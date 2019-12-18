import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Admin from "./admin";
import Manager from "./manager";

export default function ProjectsRouter() {

    console.log('git prod test');

    return (<Router>
        <Switch>
            <Route path="/manager/" ><Manager/></Route>
            <Route path="/admin/"><Admin/></Route>

            <Route exact path="/">
                <ul>
                    <li><Link to="/admin/">Админка</Link></li>
                    <li><Link to="/manager/">Модуль менеджера</Link></li>
                </ul>
            </Route>

        </Switch>
    </Router>)
}
