import moment from "moment";

export function searchOrders(searchText, bookingInfo) {
    const result = [];

    if (searchText !== '' && bookingInfo !== null) {
        for (let table of bookingInfo) {
            for (let order of table.bookings) {
                if (order.clientName.indexOf(searchText) > -1) {

                    const depositText = order.deposit > 0 ? order.deposit + ' ₽': "Без депозита";
                    const depositClass = order.deposit > 0 ? 'text--black': "text--grey";

                    const status = {};
                    const tableNumber = table.number ;
                    const timeText  = moment(order.dateStart).format("D MMM, ddd • HH:mm" ) + ' • ' + tableNumber +' столик';

                    //14 сен, ср • 18:00 • 9 столик

                    switch (order.status){
                        case 'locked':
                            status.statusClass = 'is-locked';
                            status.statusText = 'Ожидает подтверждения';
                            status.buttonText = 'Подтвердить';
                            break;
                        case 'booked':
                            status.statusClass = 'is-booked';
                            status.statusText = 'Ожидание гостя';
                            status.buttonText = 'Гость на месте';
                            break;
                        case "arrived":
                            status.statusClass = 'is-arrived';
                            status.statusText = 'Гость на месте';
                            status.buttonText = false;
                            break;
                    }

                    const orderItem = {
                        id: order.id,
                        statusClass: status.statusClass,
                        statusText: status.statusText,
                        name: order.clientName,
                        phone: order.clientPhone,
                        timeText,
                        depositClass,
                        depositText,
                        buttonText: status.buttonText,
                    };
                    result.push(orderItem);
                }
            }
        }
    }

    return result;

}
