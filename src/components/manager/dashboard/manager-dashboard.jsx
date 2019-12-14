import React from 'react';
import {connect} from 'react-redux';

import {Calendar, NewOrder, SearchButton, TableGrid} from "./manager-dashboard-views";

import './manager-dashboard.scss';
import {getActiveDayText, getTableGrid, updateActiveDate} from "./manager-dashboard-container";
import {SHOW_DATE__SET} from "../../../constants/manager";

function ManagerDashboard(props) {


    return (
        <div>
            <SearchButton/>

            <Calendar text={getActiveDayText(props.showDate)}
                      changeDay={value => updateActiveDate(props.showDate, value, props.setDate)}/>
            <TableGrid items={getTableGrid(props)}/>
            <NewOrder/>
        </div>
    )
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        bookingInfo: state.bookingInfo.items,
        bookingInterval: state.info.companyInfo.bookingInterval,
        tablesList: state.info.tablesList,
        workTime: state.info.workTime,
        showDate: state.showDate,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setDate: payload => dispatch({type: SHOW_DATE__SET, payload}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDashboard);
