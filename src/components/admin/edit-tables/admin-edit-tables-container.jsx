import {API_POINT} from "../../../constants";

/**
 * Получаем данные с сервера
 *
 * @param apiToken
 * @param setState
 * @returns {boolean}
 */
export default function getDataFromServer(apiToken, setState) {

    const body = {
        method: 'TablesList',
        token: apiToken
    };

    fetch(API_POINT + '/tables', {method: 'post', body: JSON.stringify(body)})
        .then(res => res.json()).then(json => setState(json.items));


}
