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
    defineOrderData, generateTablesList,
    getOrderDates, saveOrder
} from "./manager-order-edit-container";
import {connect} from 'react-redux';

import './manager-order.scss';
import OrderTablesList from "./table-select";
import {mapStateToProps} from './manager-order-edit-redux';

function ManagerOrderEdit(props) {

    const [alert, setAlert] = useState('');

    const [showTablesList, setShowTablesList] = useState(false);

    // Текущая бронь
    const [order, setOrder] = useState(
        defineOrderData(
            props.showDate.currentDate,
            props.bookingInfo,
            props.tableId
        )
    );

    const tablesList = generateTablesList(order, props.tablesList, props.bookingInfo);

    function updateTable(v) {
        setOrder({...order, table: v});
        setShowTablesList(false);
    }

    if (showTablesList) {
        return <OrderTablesList
            toBack={() => setShowTablesList(false)}
            tablesList={tablesList}
            setTable={v => updateTable(v)}
        />
    } else {

        if (alert !== '') {
            setTimeout(() => {
                window.location.href = '/manager/';
                setAlert('');

            }, 1000);
            return (
                <div className="order-alert">
                    <div className="order-alert__content">{alert}</div>
                </div>
            )
        } else {
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
                            props.workTime,
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

                    <OrderTableSelect
                        tablesList={tablesList}
                        table={order.table}
                        deleteTable={() => setOrder({...order, table: false})}
                        showTableSelector={() => setShowTablesList(true)}
                    />

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
                        <div className="order-edit__btn-order"
                             onClick={() => saveOrder(order, props.token, setAlert)}>Забронировать
                        </div>
                    </div>


                </div>
            )
        }
    }
}



export default connect(mapStateToProps, null)(ManagerOrderEdit);
