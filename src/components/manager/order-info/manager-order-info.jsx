import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import moment from "moment";
import './manager-order-info.scss';

import {prepareBookingInfo} from "./manager-order-info-controller";
import Preloader from "../../preloader";
import {getBookingInfo} from "../utils/utils";
import {BOOKING__SET_DATA} from "../../../constants/manager";
import {ManagerOrderInfoButtons} from "./manager-order-info-view";

function ManagerOrderInfo(props) {
    console.log('props', props);

    const {bookingInfo} = props;

    //Если мы еще не получили данные из websocket (например когда обновили страницу)
    if (Object.keys(props.bookingInfo).length === 0 && props.bookingInfo.constructor === Object) {
        return <Preloader/>
    } else {
        // Если нет данных по текущему дню (данные из вэбсокета обновляются за 2 недели от текущего дня а мы запрашиваем данные по позавчерашнему дню)
        if (bookingInfo[props.activeDate] === undefined) {
            getBookingInfo(
                props.activeDate, //Активная дата на dashboard
                props.token, //token пользователя
                props.updateBookingInfo // dispatcher redux'а
            );
            return <Preloader/>
        } else {
            const {orderId} = props.match.params;

            const bookItem = bookingInfo[props.activeDate].filter(booking => booking.id === orderId)[0];

            const table = props.tablesList.filter(table => table.id === bookItem.tableID)[0];

            const order = prepareBookingInfo(
                bookItem, //текущая бронь
                table, // информация по столу
                props.currentDate,
                props.token
            );

            return (
                <div className={"order-info " + order.statusTexts.statusClass}>
                    <div className="order-info__status">{order.statusTexts.statusText}</div>
                    <div className="order-info__name">{order.clientName}</div>
                    <div className="order-info__phone">{order.clientPhone}</div>
                    <div className="order-info__count-guests">{order.numGuests}</div>
                    <div className="order-info__date">{order.dateText}</div>
                    <div className="order-info__time">{order.timeText}</div>
                    <div className="order-info__table-number">{order.tableNumber} столик</div>
                    <div className={"order-info__deposit " + order.depositClass}>{order.depositText}</div>

                    <ManagerOrderInfoButtons
                        activeDate={props.activeDate}
                        currentDate={props.currentDate}
                        props={table.id}
                        orderId={orderId}
                        nextStatus={order.statusTexts.nextStatus}
                        token={props.token}
                        buttonText={order.statusTexts.buttonText}
                    />

                    <Link to="/manager/" className="order-info__back">Вернуться</Link>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const activeDate = (ownProps.hasOwnProperty('match')) ? ownProps.match.params.date : moment().format('YYYY-MM-DD');

    return {
        activeDate: activeDate,
        currentDate: state.showDate.currentDate,
        bookingInfo: state.bookingInfo,
        token: state.auth.token,
        tablesList: state.info.tablesList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateBookingInfo: payload => dispatch({type: BOOKING__SET_DATA, payload})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ManagerOrderInfo);
