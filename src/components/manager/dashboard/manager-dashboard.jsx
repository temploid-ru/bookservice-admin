import React from 'react';
import {connect} from 'react-redux';

import {Calendar, NewOrder, SearchButton, TableGrid} from "./manager-dashboard-views";

import './manager-dashboard.scss';
import {getActiveDayText, getTableGrid, updateActiveDate} from "./manager-dashboard-container";
import {SHOW_DATE__SET} from "../../../constants/manager";
import moment from "moment";

function ManagerDashboard(props) {

    console.log('ManagerDashboard',props);

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

    const {activeDate} = state.showDate;

    const bookingInfo = (moment(activeDate)  < moment(state.showDate.currentDate))
        ? []
        : state.bookingInfo.itemsx[moment(activeDate).format('YYYY-MM-DD')];

    return {
        bookingInfo: bookingInfo,
        bookingInterval: state.info.companyInfo.bookingInterval,
        tablesList: state.info.tablesList,
        workTime: state.info.companyInfo.workdays[moment(activeDate).format('e')],
        showDate: state.showDate,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setDate: payload => dispatch({type: SHOW_DATE__SET, payload}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDashboard);
