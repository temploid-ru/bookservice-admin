import moment from "moment";
import {API_POINT} from "../../../constants";

/**
 * Статусы бронирования заказа
 *
 * @param status
 * @return {boolean|{buttonText: boolean, statusClass: string, statusText: string}|{buttonText: string, statusClass: string, statusText: string}}
 */
export const getBookingStatus = (status) => {
    switch (status) {
        case 'locked':
            return {
                status: 'locked',
                nextStatus: 'booked',
                statusClass: 'is-locked',
                statusText: 'Ожидает подтверждения',
                buttonText: 'Подтвердить',
            };
        case 'booked':
            return {
                status: 'booked',
                nextStatus: 'arrived',
                statusClass: 'is-booked',
                statusText: 'Ожидание гостя',
                buttonText: 'Гость на месте',
            };
        case 'arrived':
            return {
                status: 'arrived',
                nextStatus: false,
                statusClass: 'is-arrived',
                statusText: 'Гость на месте',
                buttonText: false,
            };
        default:
            return false;

    }
};

/**
 * Склонение числительных
 *
 * @param number - число
 * @param titles - массив склонений из 3-х вариантов
 * @return {*}
 */
export const declOfNum = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

/** Проверяем не мертвый ли токен, если да - удаляем данные из sessionStorage и перегружаем страницу*/
export function isTokenWrong(json) {
    if (json.error && json.error_message === 'Wrong token. Get a new one.') {
        sessionStorage.removeItem('token');
        window.location.reload();
    }
}

/**
 * Немного оберки над fetch
 *
 * @param url
 * @param body
 * @return {Promise<Response>}
 */
export function toFetch(url, body) {
    return fetch(url, {method: 'post', body: JSON.stringify(body)});
}

export function getBookingInfo(time, token, reduxDispatcher) {
    const body = {
        method: "BookingList",
        token,
        timecode_from: moment(time).format(),
        timecode_to: moment(time).add(1, 'd').format(),
    };

    toFetch(API_POINT + '/bookings', body)
        .then(r => r.json())
        .then(json => {
            if (json.error) {
                console.error(json.error_message);
            } else {
                reduxDispatcher(json.items);
            }
        });
}

