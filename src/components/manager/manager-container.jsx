import {API_POINT} from "../../constants";
import moment from "moment";
import {isTokenWrong} from "./utils/utils";

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
    }).then(r => r.json()).then(json => {
        if (json.error) {
            console.error(json.error_message);
            return null;
        } else {
            return (json.items[0]);
        }

    });

}

/**
 * Получаем данные о времени работы
 *
 * @param date
 * @param token
 * @return Promise<{startTime: number, endTime: number}>
 */
export function getWorkTime(date, token) {

    const shortDate = moment(date).format("YYYY-MM-DD");

    return fetch(API_POINT, {method: "post", body: JSON.stringify({method: "getWorkTime", token, date: shortDate})})
        .then(res => res.json()).then(json => {
            isTokenWrong(json);

            if (!json.error) {
                const {items} = json;
                const startTime = moment(items[0].value).diff(moment(date), 'seconds');
                const endTime = moment(items[items.length - 1].value).diff(moment(date), 'seconds');

                return {startTime, endTime};
            }
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
