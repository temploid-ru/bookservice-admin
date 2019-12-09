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
export function generateWorkTimeGrid(currentDate,startTime, endTime, gridStep) {
    const result = [];

    while (startTime < endTime) {
        result.push({title: moment(currentDate).add(startTime,'s').format("HH:mm"), value: startTime});
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
        "timecode": showDate
    }

    fetch(API_POINT, {method: "post", body: JSON.stringify(body)})
        .then(res => res.json()).then(json => console.log('getBookingInfo', json));
}

/**
 * Посылаем данные на сервер
 */
export function setBooking(data,token){

}

export function showDate(){}
