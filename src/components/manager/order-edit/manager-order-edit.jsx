import React, {useState} from 'react';
import {
    OrderClientInfo, OrderComment,
    OrderDate, OrderDeposit,
    OrderDuration,
    OrderGuestCounter,
    OrderTableSelect,
    OrderTime
} from "./manager-order-edit-view";
import {
    calculateWorkTime,
    defineOrderData,
    getOrderDates, saveOrder
} from "./manager-order-container";
import {connect} from 'react-redux';

import './manager-order.scss';
import moment from "moment";

function ManagerOrderEdit(props) {
    const {orderId, tableId} = props.match.params;

    // console.log('ManagerOrderEdit', props.bookingInfo.filter(item => item.id === orderId)[0]);

    const [order, setOrder] = useState(defineOrderData(props, props.bookingInfo.filter(item => item.id === orderId)[0], tableId));

    console.log("order", order);

    return (
        <div className="order-edit">
            <div className="order-edit__title">Забронировать столик</div>

            <OrderDate
                items={getOrderDates(props.showDate.currentDate)}
                currentDate={props.showDate.currentDate}
                orderDate={order.date}
                updateHandler={v => setOrder({...order, date: v})}
            />


            <OrderTime
                workTime={calculateWorkTime(
                    order.date,
                    props.workTime.startTime,
                    props.workTime.endTime,
                    props.bookingInterval
                )}
                orderTime={order.time}
                updateHandler={v => setOrder({...order, time: v})}
            />

            <OrderGuestCounter
                countGuests={order.guests}
                updateHandler={v => setOrder({...order, guests: v})}
            />

            <OrderDuration duration={order.duration}
                           updateHandler={v => setOrder({...order, duration: v})}/>

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
                <div className="order-edit__btn-order" onClick={() => saveOrder(order, props.token)}>Забронировать</div>
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
        showDate: state.showDate,
        token: state.auth.token,
    }
};

export default connect(mapStateToProps, null)(ManagerOrderEdit);
