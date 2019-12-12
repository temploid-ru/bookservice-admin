import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ManagerDashboard from "../dashboard";
import ManagerSearch from "../search/manager-search";
import ManagerOrderEdit from "../order-edit";
import ManagerOrderInfo from "../order-info";

export default function ManagerRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/manager/order-info/:orderId/" component={ManagerOrderInfo} />
                <Route path="/manager/search/"><ManagerSearch/></Route>
                <Route path="/manager/order-edit/:orderId/" component={ManagerOrderEdit} />
                <Route path="/manager/order-edit/" component={ManagerOrderEdit} />
                <Route path="/manager/"><ManagerDashboard/></Route>
            </Switch>
        </Router>
    )
}
