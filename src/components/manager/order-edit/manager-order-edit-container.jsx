import moment from "moment";
import {API_POINT} from "../../../constants";

/**
 * Определяем дефолтные данные для манипулирования заказом
 *
 * @param props
 */
export function defineOrderData(props, orderInfo, tableId) {

    const result = {
        id: false,
        time: false,
        duration: 2,
        date: props.showDate.currentDate,
        guests: 2,
        table: false,
        clientName: "",
        clientPhone: "",
        deposit: false,
        comment: ''
    };

    if (orderInfo) {
        const dateStart = moment(orderInfo.dateStart);
        const dateEnd = moment(orderInfo.dateEnd);
        result.id = orderInfo.id;

        //  result.time и result.date не менять метами, т.к. иначе будет сброс начало дня
        result.time = dateStart.format('HH:mm');
        result.duration = dateEnd.diff(dateStart, 'h');

        result.date = dateStart.startOf('day').format();
        result.guests = orderInfo.numGuests;
        result.table = tableId;
        result.clientName = orderInfo.clientName;
        result.clientPhone = orderInfo.clientPhone;
        result.deposit = orderInfo.deposit;
        result.comment = orderInfo.clientComment;
    }
    return result;
}

/**
 * Собираем календарь
 *
 * @param currentDate
 * @return {[]}
 */
export function getOrderDates(currentDate) {

    const storageKey = 'order_dates_' + currentDate;

    let result = sessionStorage.getItem(storageKey);

    if (result === null) {

        let result = [];

        const momentCurrentDay = moment(currentDate).startOf('day');

        const datOfWeek = momentCurrentDay.format('e');

        //Добавляем фэйковые даты ДО текущей даты
        for (let i = 0; i < datOfWeek; i++) {
            result.push({});
        }

        // Вычисляем 14 дней вперед
        for (let i = 0; i < 14; i++) {

            const day = (i === 0) ? momentCurrentDay : momentCurrentDay.add(1, 'd');

            result.push({
                title: day.format('DD'),
                value: day.format(),
            })
        }

        // Добиваем фэйки до конца недели
        const countLastDates = 7 - (result.length % 7);

        if (countLastDates < 7) {
            for (let i = 0; i < countLastDates; i++) {
                result.push({});
            }
        }

        sessionStorage.setItem(storageKey, JSON.stringify(result));

        return result;
    }

    return JSON.parse(result);


}


/**
 * Собираем рабочее время заведения
 *
 * @param date
 * @param startTime
 * @param endTime
 * @param bookingInterval
 * @return {[]}
 */
export function calculateWorkTime(date, workTime, bookingInterval) {

    const datOfWeek = moment(date).format('e');
    console.log();

    const startTime = workTime[datOfWeek].start_time;
    const endTime = workTime[datOfWeek].end_time;

    const storageKey = 'order_workTime_' + date;

    let result = sessionStorage.getItem(storageKey);

    if (result === null) {

        result = [];

        const momentCurrentTime = moment(date).startOf('day').add(startTime, 's');
        const momentEndTime = moment(date).startOf('day').add(endTime, 's');

        while (momentCurrentTime < momentEndTime) {
            result.push({
                value: momentCurrentTime.format("HH:mm"),
                timestamp: momentCurrentTime.format('x'),
            });

            momentCurrentTime.add(+bookingInterval, 's');
        }

        sessionStorage.setItem(storageKey, JSON.stringify(result));

        return result;
    }
    return JSON.parse(result);
}

/**
 * Конвертируем продолжительность визита в часы
 *
 * @param dateStart
 * @param dateEnd
 * @return {number}
 */
export function convertDurationInHours(dateStart, dateEnd) {
    return moment(dateEnd).diff(moment(dateStart), 'h');
}

export function saveOrder(order, token, setAlert) {

    let timecode = order.date;
    timecode = timecode.replace('00:00:00', order.time + ":00");

    const duration = moment.duration(order.duration, 'h').toISOString();

    const body = {
        "token": token,
        "timecode": timecode,
        "num_guests": parseInt(order.guests),
        "duration": duration,
        "deposit": parseFloat(order.deposit) || 0, // !!!! не вижу в bookingEdit
        "ps_token": '', // !!!! не вижу в bookingEdit
        "client": {
            "name": order.clientName,
            "phone": order.clientPhone,
            "comment": order.comment
        }
    };

    let alertText = '';

    if (order.id) {
        body.method = "BookingEdit";
        body.id = order.id;
        alertText = "Бронь изменена";

    } else {
        body.method = "BookingAdd";
        body.table_id = order.table;
        alertText = "Столик забронирован";
    }

    fetch(API_POINT + "/bookings", {method: 'post', body: JSON.stringify(body)})
        .then(r => r.json()).then(json => setAlert(alertText));
}

/**
 * Генерируем список доступных столиков
 */
export function generateTablesList(order, tablesList, bookings) {
    const tables = tablesList.filter(table => {

        let flag = true;

        // Фильтруем чтобы количество гостей было не меньше количества мест за столом
        if (table.number_of_persons < order.guests) return false;

        // Отсеиваем столы по желаемому времени бронирования
        flag = filterByTime(bookings.filter(booking => booking.tableID === table.id), order);

        return flag;
    });

    return tables;
}

/**
 * Проверяем, попали ли мы в текущие брони у стола
 *
 * @param bookings
 * @param order
 * @return {boolean}
 */
function filterByTime(bookings, order) {

    for (let booking of bookings) {
        const orderStart = order.date.replace('00:00:00', order.time + ":00");

        const orderTime = moment(orderStart);

        const bookingStart = moment(booking.dateStart);
        const bookingEnd = moment(booking.dateEnd);

        if (orderTime.isBetween(bookingStart, bookingEnd, null, '[]')) return false;

        orderTime.add(order.duration, 'h');

        if (orderTime.isBetween(bookingStart, bookingEnd, null, '[]')) return false;
    }

    return true;
}
