import React from 'react';
import {connect} from 'react-redux';
import {SvgDelete, SvgEdit} from "../../../assets/svg";
import {Link} from 'react-router-dom';
import moment from "moment";
import './manager-order-info.scss';
import {deleteOrder, prepareBookingInfo} from "./manager-order-info-controller";

function ManagerOrderInfo(props) {
    const {orderId} = props.match.params;

    const bookingInfo = prepareBookingInfo(props.order, props.table, props.showDate, props.token);

    const isTwoButtons = bookingInfo.status.button ? '':' two-buttons';




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
            <div className={"order-info__footer-block " + isTwoButtons}>
                <Link to={"/manager/order-edit/"+bookingInfo.tableId+"/" + orderId} className="order-info__btn">
                    <div className="order-info__icon"><SvgEdit/></div>
                    <div className="order-info__text">Изменить</div>
                </Link>

                {bookingInfo.status.button}

                <div className="order-info__btn">
                    <div className="order-info__icon"><SvgDelete/></div>
                    <div className="order-info__text" onClick={()=>deleteOrder(bookingInfo.id, props.token)}>Удалить</div>
                </div>
                <Link to="/manager/" className="order-info__back">Вернуться</Link>
            </div>
        </div>
    )


}

const mapStateToProps = (state , props) => {

    const order = state.bookingInfo.itemsx[moment().format('YYYY-MM-DD')].filter(item => item.id=== props.match.params.orderId)[0];
    let table = false;
    if (order !== undefined){
        table = state.info.tablesList.filter(table => table.id === order.tableID)[0];
    }

    return {
        bookingInfo: state.bookingInfo.items,
        showDate:state.showDate,
        token:state.auth.token,
        order,
        table
    }
};

export default connect(mapStateToProps, null)(ManagerOrderInfo);
