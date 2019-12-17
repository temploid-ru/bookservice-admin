import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {Calendar, NewOrder, SearchButton, TableGrid} from "./manager-dashboard-views";

import './manager-dashboard.scss';
import {getActiveDayText, getTableGrid, updateActiveDate} from "./manager-dashboard-container";
import {SHOW_DATE__SET} from "../../../constants/manager";
import moment from "moment";
import {API_POINT} from "../../../constants";
import {isTokenWrong} from "../utils/utils";

function ManagerDashboard(props) {

    const [oldBookings, setOldBookings] = useState([]);

    const {activeDate, currentDate} = props.showDate;
    const isShowOldBookingInfo = moment(activeDate) < moment(currentDate);

    useEffect(
        () => {
            if (isShowOldBookingInfo) {

                const storeKey = 'BookingInfo__' + activeDate;

                const sessionInfo = sessionStorage.getItem(storeKey);

                if (sessionInfo !== JSON.stringify(oldBookings)) {
                    const body = {
                        "method": "BookingList",
                        "token": props.token,
                        "timecode_from": activeDate,
                        "timecode_to": moment(activeDate).add(1, 'd').format(),
                    };

                    fetch(API_POINT + '/bookings', {method: 'post', body: JSON.stringify(body)})
                        .then(r => r.json()).then(json => {
                        isTokenWrong(json);

                        const date = moment(activeDate).format('YYYY-MM-DD');

                        if (!json.error) {
                            sessionStorage.setItem(storeKey, JSON.stringify(json.items[date]));
                            setOldBookings(json.items[date]);

                        }
                    });
                }

            }
        }
    );

    const bookingInfo = (isShowOldBookingInfo) ? oldBookings : props.bookingInfo;

    return (
        <div>
            <SearchButton/>

            <Calendar text={getActiveDayText(props.showDate)}
                      changeDay={value => updateActiveDate(props.showDate, value, props.setDate)}/>

            <TableGrid
                items={getTableGrid(props, bookingInfo)}
                bookingInfo={bookingInfo}
            />
            <NewOrder/>
        </div>
    )
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
