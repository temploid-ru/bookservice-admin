import React from 'react';
import {API_POINT} from "../../../constants";
import moment from "moment";
import {declOfNum, getBookingStatus} from "../utils/utils";
import {SvgOk} from "../../../assets/svg";

export function deleteOrder(orderId, token) {
    const body = {
        method: "bookingDelete",
        token,
        id: orderId,
    };

    fetch(API_POINT, {method: "post", body: JSON.stringify(body)})
        .then(r => r.json()).then(json => {
        console.log('json');
        alert('Бронь удалена. Сделать popUp-уведотление')
    });
}

export function prepareBookingInfo(order, table, currentDate, token) {

    order.tableNumber = table.number;

    if (order.deposit > 0) {
        order.depositText = order.deposit + ' ₽';
        order.depositClass = 'has-deposit';
    } else {
        order.depositText = 'Без депозита';
        order.depositClass = 'not-has-deposit';
    }

    order.dateText = '';
    if (currentDate === moment(order.dateStart).startOf('day').format()) {
        order.dateText = 'Сегодня • ';
    }
    order.dateText += moment(order.dateStart).format('DD MMM, ddd');
    order.timeText = moment(order.dateStart).format("HH:mm") + ' - ' + moment(order.dateEnd).format("HH:mm");

    console.log(order.status);

    order.statusTexts = getBookingStatus(order.status);
    order.numGuests = order.numGuests + declOfNum(order.numGuests, [" гость", ' гостя', ' гостей']);

    console.log(order);

    return order;
}

export function updateState(orderId, status, token) {
    const body = {
        method: "BookingEdit",
        token,
        id: orderId,
        newStatus: status,
    }

    fetch(API_POINT + '/bookings', {method: "post", body: JSON.stringify(body)})
        .then(r => r.json()).then(json => {
            alert('статус обновлен сделать poUp');
        console.log(json)
    });

}

