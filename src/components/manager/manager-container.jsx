import {API_POINT} from "../../constants";
import moment from "moment";

/**
 * Получаем данные о компании
 *
 * @param token
 * @returns {Promise<any>}
 */
export function getCompanyInfo(token) {

    const body = {
        method: 'CompaniesList',
        token: token
    };

    return fetch(API_POINT + '/companies', {method: 'post', body: JSON.stringify(body)}).then(r => r.json()).then(json=> json.items[0]);

}

/**
 * Получаем данные о времени работы
 *
 * @param date
 * @param setStateAction
 * @param token
 */
export function getWorkTime(date, token) {

    const shortDate = moment(date).format("YYYY-MM-DD");

    fetch(API_POINT, {method: "post", body: JSON.stringify({method: "getWorkTime", token, date: shortDate})})
        .then(res => res.json()).then(json => {

        const {items} = json;

        const startTime = moment(items[0].value).diff(moment(date), 'seconds');
        const endTime = moment(items[items.length - 1].value).diff(moment(date), 'seconds');

        return {startTime, endTime};
    });
}
