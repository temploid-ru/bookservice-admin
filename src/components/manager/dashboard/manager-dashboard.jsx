import React, {useState} from 'react';
import {connect} from 'react-redux';

import {Calendar, NewOrder, SearchButton, TableGrid} from "./manager-dashboard-views";

import './manager-dashboard.scss';
import {getActiveDayText, getTableGrid, updateActiveDate} from "./manager-dashboard-container";
import {SHOW_DATE__SET} from "../../../constants/manager";
import moment from "moment";
import Preloader from "../../preloader";
import {API_POINT} from "../../../constants";

function ManagerDashboard(props) {

    const [orders, setOrder] = useState([]);

    const bookingInfo = (moment(props.showDate.activeDate) < moment(props.showDate.currentDate))
        ? orders
        : props.bookingInfo;

    const [preloader, setPreloader] = useState((orders.length === 0));

    if (preloader) {

        fetch(API_POINT + '/bookings', {
            method: 'post',
            body: JSON.stringify({
                "method": "BookingList",
                "token": props.token,
                "timecode_from": moment(props.showDate.activeDate).format(),
                "timecode_to": moment(props.showDate.activeDate).add(1, "d").format(),
            })
        }).then(r => r.json()).then(json => {
            console.log('json', json);
            setOrder(json.items);
            setPreloader(false);
        });

        return <Preloader/>
    } else {

        return (
            <div>
                <SearchButton/>

                <Calendar text={getActiveDayText(props.showDate)}
                          changeDay={value => updateActiveDate(props.showDate, value, props.setDate)}/>

                <TableGrid
                    items={getTableGrid(props)}
                    bookingInfo={bookingInfo}
                />
                <NewOrder/>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {

    const {activeDate} = state.showDate;

    let bookingInfo = state.bookingInfo.itemsx[moment(activeDate).format('YYYY-MM-DD')] || [];

    return {
        bookingInfo: bookingInfo,
        bookingInterval: state.info.companyInfo.bookingInterval,
        tablesList: state.info.tablesList,
        workTime: state.info.companyInfo.workdays[moment(activeDate).format('e')],
        showDate: state.showDate,
        token: state.auth.token,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setDate: payload => dispatch({type: SHOW_DATE__SET, payload}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDashboard);
