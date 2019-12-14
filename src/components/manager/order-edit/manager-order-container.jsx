import moment from "moment";

/**
 * Определяем дефолтные данные для манипулирования заказом
 *
 * @param props
 */
export function defineOrderData(props,orderId,tableId) {

    const result = {
        date: props.showDate.currentDate,
        time: false,
        duration: 2,
        guests: 2,
        table: '5db8169290b63cd40c7144fb',
        clientName: "",
        clientPhone: "",
        deposit: false,
        comment: ''
    };

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

        for (let i = 0; i < countLastDates; i++) {
            result.push({});
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
export function calculateWorkTime(date, startTime, endTime, bookingInterval) {

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

        sessionStorage.setItem(storageKey,JSON.stringify(result));

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


