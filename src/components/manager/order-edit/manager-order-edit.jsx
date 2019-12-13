import React, {useState} from 'react';
import {
    OrderClientInfo, OrderComment,
    OrderDate, OrderDeposit,
    OrderDuration,
    OrderGuestCounter,
    OrderTableSelect,
    OrderTime
} from "./manager-order-edit-view";
import {getOrderDates} from "./manager-order-container";
import {connect} from 'react-redux';

import './manager-order.scss';

function ManagerOrderEdit(props) {
    const [order, setOrder] = useState({
        date: props.currentDate,
        countGuests: 2,
        duration: 2*3600,
    });

    const orderDates = getOrderDates(props.currentDate);


    return (
        <div className="order-edit">
            <div className="order-edit__title">Забронировать столик</div>

            <OrderDate items={orderDates} currentDate={props.currentDate} orderDate={order.date}
                       updateHandler={v => setOrder({...order, date: v})}/>

            <OrderTime/>
            <OrderGuestCounter countGuests={order.countGuests}
                               updateHandler={v => setOrder({...order, countGuests: v})}/>

            <OrderDuration duration={order.duration} updateHandler={v => setOrder({...order, duration: v})}/>

            <OrderTableSelect/>
            <OrderClientInfo
                name={order.name}
                phone={order.phone}
                setName={v => setOrder({...order, name: v})}
                setPhone={v => setOrder({...order, phone: v})}
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
                <div className="order-edit__btn-back">Отмена</div>
                <div className="order-edit__btn-order">Забронировать</div>
            </div>


        </div>
    )
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        // bookingInfo: state.bookingInfo
        currentDate: state.showDate.currentDate
    }
};

export default connect(mapStateToProps, null)(ManagerOrderEdit);
