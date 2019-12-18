import React from 'react';
import {connect} from 'react-redux';

import {Calendar, NewOrder, SearchButton, TableGrid} from "./manager-dashboard-views";

import './manager-dashboard.scss';
import {getTableGrid} from "./manager-dashboard-container";
import {BOOKING__SET_DATA, SHOW_DATE__SET} from "../../../constants/manager";
import moment from "moment";
import {getBookingInfo} from "../utils/utils";
import Preloader from "../../preloader";

function ManagerDashboard(props) {

    /**
     * Если нет информации о бронировании и выбранный день меньше текущего рабогчего
     * - запрашиваем данные о бронировании на сервере
     */
    if (props.bookingInfo === undefined) {
        getBookingInfo(
            props.activeDate, //Активная дата на dashboard
            props.token, //token пользователя
            props.updateBookingInfo // dispatcher redux'а
        );

        return <Preloader/>
    } else {
        return (
            <div>
                <SearchButton
                    activeDate={props.activeDate}
                />

                <Calendar
                    activeDate={props.activeDate}
                    currentDate={props.currentDate}
                />

                <TableGrid
                    items={getTableGrid(props)}
                    activeDate={props.activeDate}
                />
                <NewOrder
                    activeDate={props.activeDate}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const activeDate = (ownProps.hasOwnProperty('match')) ? ownProps.match.params.date : moment().format('YYYY-MM-DD');

    return {
        activeDate: activeDate, // Активная дата на dashboard
        currentDate: state.showDate.currentDate, // Текущая дата работы заведения
        bookingInfo: state.bookingInfo[activeDate], // Список брони на активную дату
        tablesList: state.info.tablesList, // Список столов заведения
        bookingInterval: state.info.companyInfo.bookingInterval, //Интервал бронирования
        token: state.auth.token, //Токен пользователя
        workTime: state.info.companyInfo.workdays, // Режим работы заведения
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setDate: payload => dispatch({type: SHOW_DATE__SET, payload}),
        updateBookingInfo: payload => dispatch({type: BOOKING__SET_DATA, payload})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDashboard);
