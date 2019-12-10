import {API_POINT} from "../../constants";
import moment from "moment";

/**
 * Получаем данные о компании
 *
 * @param token
 * @returns {Promise<object>}
 */
export function getCompanyInfo(token) {

    const body = {
        method: 'CompaniesList',
        token: token
    };

    return fetch(API_POINT + '/companies', {
        method: 'post',
        body: JSON.stringify(body)
    }).then(r => r.json()).then(json => json.items[0]);

}

/**
 * Получаем данные о времени работы
 *
 * @param date
 * @param token
 * @return array
 */
export function getWorkTime(date, token) {

    const shortDate = moment(date).format("YYYY-MM-DD");

    return fetch(API_POINT, {method: "post", body: JSON.stringify({method: "getWorkTime", token, date: shortDate})})
        .then(res => res.json()).then(json => {

            const {items} = json;

            const startTime = moment(items[0].value).diff(moment(date), 'seconds');
            const endTime = moment(items[items.length - 1].value).diff(moment(date), 'seconds');

            return {startTime, endTime};
        });
}

/**
 *
 * Получаем список столов
 *
 * @param showDate
 * @param token
 *
 * @return array
 */
export function getTablesList(showDate, token) {

    const body = {
        "method": 'TablesList',
        "token": token,
    }

    return fetch(API_POINT + '/tables', {method: "post", body: JSON.stringify(body)})
        .then(res => res.json()).then(json => json.items);

}


// /**
//  * Получаем информацию о бронировании
//  *
//  * @param showDate
//  * @param token
//  */
// export function getBookingInfo(showDate, token) {
//     const body = {
//         "method": 'tablesSearch', token,
//         "timecode": moment(showDate).format('YYYY-MM-DD'),
//     };
//
//     return fetch(API_POINT, {method: "post", body: JSON.stringify(body)})
//         .then(res => res.json()).then(json => {
//
//         const bookingInfo = {};
//
//         for (let table of json.items) {
//
//             for (let bookingItem of table.booking_entries) {
//
//                 if (bookingInfo[table.id] === undefined) bookingInfo[table.id] = [];
//                 console.log('bookingItem',bookingItem);
//                 const item = {
//                     startTime: +moment(bookingItem.date_start).format('x'),
//                     endTime: +moment(bookingItem.date_end).format('x'),
//                     orderId: bookingItem.id,
//
//                 };
//
//                 bookingInfo[table.id].push(item);
//             }
//         }
//
//         return bookingInfo;
//     });
// }
