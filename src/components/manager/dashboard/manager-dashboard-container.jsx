import moment from "moment";

/**
 *
 * Фабрика по формированию сетки
 *
 * @return {{}}
 */

export function getTableGrid(props) {
    const result = [];

    // Получаем сетку бронирования для одлного стола
    const workTimeLine = generateWorkTimeGrid(
        props.workTime[moment(props.activeDate).format('e')], // Время работы в текущий день недели
        props.activeDate, // Текущий день на dashboard
        props.bookingInterval // Интервал бронирования
    );

    for (let table of props.tablesList) {

        const orderItems = props.bookingInfo.filter(item => item.tableID === table.id);

        const timeline = JSON.parse(workTimeLine);

        for (let booking of orderItems) {

            const startCell = +moment(booking.dateStart).format('x');
            let deleteFrom = +moment(booking.dateStart).add(props.bookingInterval, 's').format('x');
            const deleteTo = +moment(booking.dateEnd).format('x');

            const step = props.bookingInterval * 1000;

            let gridSpan = 1;

            while (deleteFrom <= deleteTo) {
                delete timeline[deleteFrom];
                gridSpan++;
                deleteFrom += step;
            }

            if (timeline[startCell] !== undefined) {
                timeline[startCell].gridSpan = gridSpan;
                timeline[startCell].bookingInfo = booking;
            }
        }

        const gridItem = {
            tableId: table.id,
            tableName: table.name,
            tableNumber: table.number,
            cells: {...timeline}, // ячейки рабочего времени
        };

        result.push({...gridItem});
    }

    return result;
}

/**
 * Генерируем сетку времени
 *
 * @returns {string} = stringify object с данными
 *
 * @param workTime - объект времени работы заведения
 * @param activeDate - текущий день
 * @param bookingInterval - шаг бронирования
 */
export function generateWorkTimeGrid(workTime, activeDate,  bookingInterval) {

    const sessonStorageKey = 'generateWorkTimeGrid_' + workTime.weekday + '_' + bookingInterval;

    let result = sessionStorage.getItem(sessonStorageKey);

    if (result === null) {
        result = {};

        let time = moment(activeDate).add(workTime.start_time, 's');
        const endWorkDate = moment(activeDate).add(workTime.end_time, 's');

        while (time < endWorkDate) {
            const timeStamp = +time.format('x');
            result[timeStamp] = {timeStamp, V: time.format()};

            time.add(bookingInterval, 's');
        }

        result = JSON.stringify(result);
    }

    return result;
}

export const getActiveDayText = (showDate) => {
    let result = '';

    if (showDate.activeDate === showDate.currentDate) {
        result += 'Сегодня • ';
    }

    result += moment(showDate.activeDate).format('DD MMM, ddd');

    return result
};

export function updateActiveDate(showDate, newValue, setStoreAction) {
    const activeDate = moment(showDate.activeDate).add(newValue, 'd').format();
    setStoreAction({...showDate, activeDate})

}
