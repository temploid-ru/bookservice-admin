import React, {useState} from 'react';
import {
    OrderClientInfo, OrderComment,
    OrderDate, OrderDeposit,
    OrderDuration,
    OrderGuestCounter,
    OrderTableSelect,
    OrderTime
} from "./manager-order-edit-view";
import {calculateWorkTime, defaultOrder, getOrderDates} from "./manager-order-container";
import {connect} from 'react-redux';

import './manager-order.scss';
import moment from "moment";

function ManagerOrderEdit(props) {
    const {orderId, tableId} = props.match.params;

    const defaultFields = defaultOrder(props.showDate.activeDate, tableId, 500);

    const orderFields = (orderId !== undefined)
        ? props.bookingInfo.filter(item => item.id === orderId)[0] || defaultFields
        : defaultFields;

    const [order, setOrder] = useState(orderFields);

    console.log("order", order);

    const orderDates = getOrderDates(props.showDate.currentDate);


    return (
        <div className="order-edit">
            <div className="order-edit__title">Забронировать столик</div>

            <OrderDate items={orderDates} currentDate={props.showDate.currentDate} orderDate={order.dateStart}
                       updateHandler={v => setOrder({...order, dateStart: v})}/>

            <OrderTime
                workTime={calculateWorkTime(
                    order.dateStart,
                    props.workTime.startTime,
                    props.workTime.endTime,
                    props.bookingInterval
                )}
                value={order.dateStart}
                // updateHandler={v => console.log(v)}
                updateHandler={v => setOrder({...order, dateStart: v})}
            />
            <OrderGuestCounter countGuests={order.numGuests}
                               updateHandler={v => setOrder({...order, numGuests: v})}/>

            <OrderDuration duration={order.duration} updateHandler={v => setOrder({...order, duration: v})}/>

            <OrderTableSelect/>
            <OrderClientInfo
                clientName={order.clientName}
                clientPhone={order.clientPhone}
                setName={v => setOrder({...order, clientName: v})}
                setPhone={v => setOrder({...order, clientPhone: v})}
            />
            <OrderDeposit
                deposit={order.deposit}
                updateHandler={v => setOrder({...order, deposit: v})}
            />
            <OrderComment
                comment={order.comment}
                updateHandler={v => setOrder({...order, comment: v})}
            />

            <div className="order-edit__buttons">
                <div className="order-edit__btn-back" onClick={() => props.history.goBack()}>Отмена</div>
                <div className="order-edit__btn-order">Забронировать</div>
            </div>


        </div>
    )
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        bookingDuration: state.info.companyInfo.bookingDuration,
        bookingInterval: state.info.companyInfo.bookingInterval,
        workTime: state.info.workTime,
        bookingInfo: state.bookingInfo.itemsx[moment(state.showDate.activeDate).format("YYYY-MM-DD")],
        showDate: state.showDate
    }
};

export default connect(mapStateToProps, null)(ManagerOrderEdit);
