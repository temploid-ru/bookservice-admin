import moment from "moment";
import {API_POINT} from "../../constants";


/**
 *
 * Получаем список столов
 *
 * @param showDate
 * @param setStateAction
 * @param token
 */
export default function getTablesList(showDate, setStateAction, token) {

    const body = {
        "method": 'TablesList',
        "token": token,
    }

    fetch(API_POINT + '/tables', {method: "post", body: JSON.stringify(body)})
        .then(res => res.json()).then(json => setStateAction(json.items));

}

/**
 * Генерируем сетку времени
 *
 * @param startTime
 * @param endTime
 * @param gridStep
 * @returns {[]}
 */
export function generateWorkTimeGrid(currentDate, startTime, endTime, gridStep) {
    const result = [];

    while (startTime < endTime) {

        const time = moment(currentDate).add(startTime, 's');

        result.push({title: time.format("HH:mm"), value: +time.format('x')});
        startTime += gridStep;
    }

    return result;
}

/**
 * Получаем информацию о бронировании
 *
 * @param showDate
 * @param setStateAction
 * @param token
 */
export function getBookingInfo(showDate, setStateAction, token) {
    const body = {
        "method": 'tablesSearch', token,
        "timecode": moment(showDate).format('YYYY-MM-DD'),
    };

    fetch(API_POINT, {method: "post", body: JSON.stringify(body)})
        .then(res => res.json()).then(json => {

        const bookingInfo = {};

        for (let table of json.items) {

            for (let bookingItem of table.booking_entries) {

                if (bookingInfo[table.id] === undefined) bookingInfo[table.id] = [];

                const item = {
                    startTime: +moment(bookingItem.date_start).format('x'),
                    endTime: +moment(bookingItem.date_end).format('x'),
                    orderId: bookingItem.id,

                };

                bookingInfo[table.id].push(item);
            }
        }

        setStateAction(bookingInfo);
    });
}

/**
 * Посылаем данные на сервер
 */
export function setBooking(data, token) {

}

export function showDate() {
}

export function getWorkTime(date, setStateAction, token) {

    const shortDate = moment(date).format("YYYY-MM-DD");

    fetch(API_POINT, {method: "post", body: JSON.stringify({method: "getWorkTime", token, date: shortDate})})
        .then(res => res.json()).then(json => {

        const {items} = json;

        const startTime = moment(items[0].value).diff(moment(date), 'seconds');
        const endTime = moment(items[items.length - 1].value).diff(moment(date), 'seconds');

        const workTime = {startTime, endTime};
        setStateAction(workTime)
    });
}
