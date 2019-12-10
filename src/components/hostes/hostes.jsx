import React, {useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import getTablesList, {generateWorkTimeGrid, getBookingInfo, getWorkTime, setBooking} from "./hostes-container";
import HostesTablesList from "./tables-list/hostes-tables-list";
import HostesOrder from "./new-order/hostes-new-order";
import {API_POINT} from "../../constants";

import './hostes.scss';

function Hostes(props) {

    moment.locale('ru');
    const currentDate = moment().locale("ru").format("YYYY-MM-DDT00:00:00Z");
    const [showDate, setShowDate] = useState(currentDate);

    //Время работы
    const [workTime, setWorkTime] = useState(false);
    if (!workTime) {
        getWorkTime(showDate, setWorkTime, props.token);
    }


    // Сетка бронирования
    const workTimeGrid = generateWorkTimeGrid(currentDate, workTime.startTime, workTime.endTime, 1800);

    // Список столиков
    const [tablesList, setTablesList] = useState([]);

    if (tablesList.length === 0) {
        getTablesList(showDate, setTablesList, props.token);
    }

    // Информация о бронировании
    const [bookingInfo, setBookingInfo] = useState([]);

    if (bookingInfo.length === 0) {
        getBookingInfo(showDate, setBookingInfo, props.token);
    }

    const [newOrder, setNewOrder] = useState(false);

    function setBooking(data, token) {

        const body = Object.assign({method: 'bookingAdd', token}, data);

        fetch(API_POINT, {method: "post", body: JSON.stringify(body)})
            .then(res => res.json()).then(json => console.log(json));
    }


    if (newOrder) {

        const timeCode = moment(newOrder.cell.value).format();

        return <HostesOrder
            bookingId={newOrder.bookingId}
            tableId={newOrder.tableId}
            showDate={showDate}
            timeCode={timeCode}
            closeForm={() => setNewOrder(false)}
            setBooking={data => setBooking(data, props.token)}
        />
    } else {
        return (
            <div className="hostes">
                <div className="hostes__header">
                    <div className="hostes__left">
                        <div className="select-day">
                            <button>Назад</button>
                            <div className="hostes__date">{moment(currentDate).format("D MMM YYYY, dddd")}</div>
                            <button>Вперед</button>
                        </div>
                    </div>

                    <div className="right">

                        <div>Фильтр по кол-ву гостей</div>


                    </div>
                </div>
                <HostesTablesList
                    workTimeGrid={workTimeGrid}
                    tablesList={tablesList}
                    bookingInfo={bookingInfo}
                    onCellClick={obj => setNewOrder(obj)}
                />

            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        token: state.auth.token,
    }
};

export default connect(mapStateToProps, null)(Hostes);
