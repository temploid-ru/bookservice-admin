import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Admin from "./admin";
import Manager from "./manager";

export default function ProjectsRouter() {
    return (<Router>
        <Link to="/" className={'back-to-admin-menu'}>Назад</Link>
        <Switch>
            <Route path="/manager/"><Manager/></Route>
            <Route path="/admin/"><Admin/></Route>

            <Route exact path="/">
                <div className="admin-page-selector">
                    <ul className="admin-page-selector__container">
                        <li><Link to="/admin/">Админка</Link></li>
                        <li><Link to="/manager/">Модуль менеджера</Link></li>
                    </ul>
                </div>
            </Route>


        </Switch>
    </Router>)
}
