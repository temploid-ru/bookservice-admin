import moment from "moment";

export const defaultOrder = (currentDate, tableId, depositTable) => {
    return {
        clientName: "",
        clientPhone: "",
        // dateEnd: false,
        dateStart: currentDate,
        deposit: depositTable,
        id: false,
        numGuests: 2,
        status: "booked",
        tableID: tableId,
    }
};

/**
 * Собираем календарь
 *
 * @param currentDate
 * @return {[]}
 */
export function getOrderDates(currentDate) {
    const result = [];

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

    return result;
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
export function calculateWorkTime(date,startTime,endTime, bookingInterval) {
    const result = [];


    const currentTime = moment();
    const momentCurrentTime = moment(date).startOf('day').add(startTime, 's');
    const momentEndTime = moment(date).startOf('day').add(endTime, 's');

    while (momentCurrentTime < momentEndTime) {
        result.push({
            title: momentCurrentTime.format("HH:mm"),
            value: momentCurrentTime.format(),
            active: currentTime > momentCurrentTime ? 'is-disabled' : '',
        });

        momentCurrentTime.add(+bookingInterval, 's');
    }
    return result;
}
