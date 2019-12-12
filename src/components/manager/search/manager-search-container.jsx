import moment from "moment";
import {getBookingStatus} from "../utils/utils";

export function searchOrders(searchText, bookingInfo) {
    const result = [];

    if (searchText !== '' && bookingInfo !== null) {
        for (let table of bookingInfo) {
            for (let order of table.bookings) {
                if (order.clientName.indexOf(searchText) > -1) {

                    const depositText = order.deposit > 0 ? order.deposit + ' ₽': "Без депозита";
                    const depositClass = order.deposit > 0 ? 'text--black': "text--grey";

                    const status = getBookingStatus(order.status);
                    const tableNumber = table.number ;
                    const timeText  = moment(order.dateStart).format("D MMM, ddd • HH:mm" ) + ' • ' + tableNumber +' столик';

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
