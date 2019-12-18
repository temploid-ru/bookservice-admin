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
                <Route path="/manager/order-info/:date/:orderId/" component={ManagerOrderInfo} />
                <Route path="/manager/search/:date/" component={ManagerSearch}/>
                <Route path="/manager/search/" component={ManagerSearch}/>
                <Route path="/manager/order-edit/:date/:tableId/:orderId/" component={ManagerOrderEdit} />
                <Route path="/manager/order-edit/" component={ManagerOrderEdit} />
                <Route path="/manager/dashboard/:date/" component={ManagerDashboard}/>
                <Route path="/manager/"><ManagerDashboard/></Route>
            </Switch>
        </Router>
    )
}
