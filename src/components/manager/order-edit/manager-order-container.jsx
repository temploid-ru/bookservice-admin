import moment from "moment";

export function getOrderDates(currentDate) {
    const result = [];

    const momentCurrentDay = moment(currentDate);

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
