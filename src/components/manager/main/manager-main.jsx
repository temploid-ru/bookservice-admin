import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ManagerDashboard from "../dashboard";
import ManagerSearch from "../search/manager-search";
import ManagerNewOrder from "../new-order";

export default function ManagerMain() {
    return (
        <Router>
            <Switch>
                <Route path="/manager/search/"><ManagerSearch/></Route>
                <Route path="/manager/new-order/"><ManagerNewOrder/></Route>
                <Route path="/manager/"><ManagerDashboard/></Route>
            </Switch>
        </Router>
    )
}
