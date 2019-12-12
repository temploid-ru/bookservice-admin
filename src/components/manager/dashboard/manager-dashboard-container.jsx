import moment from "moment";

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

    console.log('workTimeLine',workTimeLine);

    const bookingInfo = prepareBookingInfo(props.bookingInfo);

    console.log('workTimeLine', workTimeLine);
    console.log('bookingInfo-------------------------------------------------------------', bookingInfo);

    for (let table of props.tablesList) {

        let flag = false;

        //TODO разобраться почему не копируется а заменяется объект потому пока костыль

        // let timeline = {...workTimeLine, id:table.id};
        // const timeline = Object.assign({'id':table.id},workTimeLine);
        const timeline = JSON.parse(JSON.stringify(workTimeLine));


        if (bookingInfo[table.id] !== undefined) {
            flag = true;

            for (let booking of bookingInfo[table.id].bookings) {

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
        }

        const gridItem = {
            tableId: table.id,
            tableName: table.name,
            tableNumber: table.number,
            cells: {...timeline}, // ячейки рабочего времени
        };

        result.push({...gridItem});

        // timeline = {};



        // const gridItem = {
        //     tableId: table.id,
        //     tableName: table.name,
        //     tableNumber: table.number,
        //     cells: {...workTimeLine}, // ячейки рабочего времени
        // };

        // let flag = false;

        //Добавляем к ячейкам информацию о заказе
        // if (bookingInfo[table.id] !== undefined) {
        //
        //     flag = true;
        //
        //     for (let booking of bookingInfo[table.id].bookings) {
        //         console.log(table.id + ' booking');
        //         // //удаляем из таймлайна стола объедененные ячейки
        //
        //         const startCell = +moment(booking.dateStart).format('x');
        //         let deleteFrom = +moment(booking.dateStart).add(props.bookingInterval, 's').format('x');
        //         const deleteTo = +moment(booking.dateEnd).format('x');
        //
        //         const step = props.bookingInterval * 1000;
        //
        //         let gridSpan = 1;
        //
        //         while (deleteFrom <= deleteTo) {
        //             gridSpan++;
        //         //
        //             delete gridItem.cells[deleteFrom];
        //             deleteFrom += step;
        //         }
        //
        //         gridItem.cells[startCell].gridSpan = gridSpan;
        //     }
        // }
        //
        // if (flag) {
        //     console.log('gridItem', timeline);
        // }

        // result.push({...gridItem});
    }

    console.log('getTableGrid', result);

    return result;
}

/**
 * Переконвертируем инфо о бронировании
 *
 *
 *
 * @param bookingInfo
 * @return {{}}
 */
function prepareBookingInfo(bookingInfo) {
    const result = {};

    if (bookingInfo !== null) {

        for (let table of bookingInfo) {
            result[table.id] = table;
        }
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
export function generateWorkTimeGrid(workTime, activeDate, gridStep) {

    let {startTime, endTime} = workTime;

    const result = {};

    while (startTime < endTime) {

        const time = moment(activeDate).add(startTime, 's');

        const timeStamp = +time.format('x');

        result[timeStamp] = {timeStamp};
        startTime += gridStep;
    }

    return result;
}
