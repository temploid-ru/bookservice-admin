import moment from "moment";
import showDate from "../../../reducers/manager/show-date";

/**
 * Формируем массив сетки
 *
 *     const grid = [
 {
            tableId: '',
            tableName: '',
            tableNumber: "",
            cells: [
                {orderId: '',
                }
            ]
        }
 ];
 *
 * @return {{}}
 */

export function getTableGrid(props) {
    const result = [];

    const {workTime, showDate} = props;

    const workTimeLine = generateWorkTimeGrid(workTime, showDate, props.bookingInterval);

    const {bookingInfo} = props;

    for (let table of props.tablesList) {

        const orderItems = bookingInfo.filter(item => item.tableID === table.id);


        //TODO разобраться почему не копируется а заменяется объект потому пока костыль
        // let timeline = {...workTimeLine, id:table.id};
        // const timeline = Object.assign({'id':table.id},workTimeLine);
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

            timeline[startCell].gridSpan = gridSpan;
            timeline[startCell].bookingInfo = booking;
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
 * @param startTime
 * @param endTime
 * @param gridStep
 * @returns {[]}
 */
export function generateWorkTimeGrid(workTime, showTime, gridStep) {

    let {start_time, end_time} = workTime;

    const result = {};

    while (start_time < end_time) {

        const time = moment(showTime.activeDate).add(start_time, 's');

        const timeStamp = +time.format('x');

        result[timeStamp] = {timeStamp, V:time.format()};

        start_time += gridStep;
    }

    return JSON.stringify(result);
}


export const getActiveDayText = (showDate) => {
    let result = '';

    if (showDate.activeDate === showDate.currentDate) {
        result += 'Сегодня • ';
    }

    result += moment(showDate.activeDate).format('DD MMM, ddd');

    return result
};

export function updateActiveDate(showDate, newValue, setStateAction) {
    const activeDate = moment(showDate.activeDate).add(newValue, 'd').format();

    setStateAction({...showDate, activeDate})

}
