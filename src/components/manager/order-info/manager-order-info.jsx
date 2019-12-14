import React from 'react';
import {connect} from 'react-redux';
import {declOfNum, getBookingStatus} from "../utils/utils";
import {SvgDelete, SvgEdit, SvgOk} from "../../../assets/svg";
import {Link} from 'react-router-dom';
import moment from "moment";
import './manager-order-info.scss';

function ManagerOrderInfo(props) {
    const {orderId} = props.match.params;

    let bookingInfo = {};

    for (let table of props.bookingInfo) {
        for (let bookingItem of table.bookings) {
            if (bookingItem.id === orderId) {
                bookingInfo = {...bookingItem};
                bookingInfo.tableNumber = table.number;
                bookingInfo.tableId = table.id;
            }
        }
    }

    if (bookingInfo.deposit > 0) {
        bookingInfo.depositText = bookingInfo.deposit + ' ₽';
        bookingInfo.depositClass = 'has-deposit';
    } else {
        bookingInfo.depositText = 'Без депозита';
        bookingInfo.depositClass = 'not-has-deposit';
    }

    //TODO - сделать формирование текущей даты
    bookingInfo.dateText = 'Сегодня • 14 сен, среда';

    bookingInfo.timeText = moment(bookingInfo.dateStart).format("HH:mm") + ' - ' + moment(bookingInfo.dateEnd).format("HH:mm");

    bookingInfo.status = getBookingStatus(bookingInfo.status);

    bookingInfo.numGuests = bookingInfo.numGuests + declOfNum(bookingInfo.numGuests, [" гость", ' гостя', ' гостей']);


    bookingInfo.status.buttonText = (bookingInfo.status.buttonText)
        ? <div className="order-info__btn order-info__status-color">
            <div className="order-info__icon"><SvgOk/></div>
            <div className="order-info__text">{bookingInfo.status.buttonText}</div>
        </div>
        : null;

    return (
        <div className={"order-info " + bookingInfo.status.statusClass}>
            <div className="order-info__status">{bookingInfo.status.statusText}</div>
            <div className="order-info__name">{bookingInfo.clientName}</div>
            <div className="order-info__phone">{bookingInfo.clientPhone}</div>
            <div className="order-info__count-guests">{bookingInfo.numGuests}</div>
            <div className="order-info__date">{bookingInfo.dateText}</div>
            <div className="order-info__time">{bookingInfo.timeText}</div>
            <div className="order-info__table-number">{bookingInfo.tableNumber} столик</div>
            <div className={"order-info__deposit " + bookingInfo.depositClass}>{bookingInfo.depositText}</div>
            <div className="order-info__footer-block ">
                <Link to={"/manager/order-edit/"+bookingInfo.tableId+"/" + orderId} className="order-info__btn">
                    <div className="order-info__icon"><SvgEdit/></div>
                    <div className="order-info__text">Изменить</div>
                </Link>

                {bookingInfo.status.buttonText}

                <div className="order-info__btn">
                    <div className="order-info__icon"><SvgDelete/></div>
                    <div className="order-info__text">Удалить</div>
                </div>
                <Link to="/manager/" className="order-info__back">Вернуться</Link>
            </div>
        </div>
    )


}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        bookingInfo: state.bookingInfo.items
    }
};

export default connect(mapStateToProps, null)(ManagerOrderInfo);
