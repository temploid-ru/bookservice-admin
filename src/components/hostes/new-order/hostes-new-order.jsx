import React, {useState} from 'react';

import './hostes-new-order.scss';
import moment from "moment";

export default function HostesOrder(props) {

    console.log('props',props);

    //Имя посетителя
    const [clientName, setClientName] = useState(props.name || '');

    // Телефонный номер посетителя
    const [clientPhone, setClientPhone] = useState(props.phone || '');

    // Комментарий клиента
    const [clientCommentaries, setClientCommentaries] = useState(props.phone || '');

    // Количество гостей
    const [numberClients, setNumberClients] = useState(props.numberClients || 2);

    // Продолжительность визита
    const [duration, setDuration] = useState(props.numberClients || 2);

    function onSubmitHandler(e) {
        e.preventDefault();

        // const durationTime = moment(props.timeCode).add(duration,'h').format();

        const body = {
            client: {
                name: clientName,
                phone: clientPhone,
                comment: clientCommentaries,
            },
            // deposit: 500, //TODO временно поставил депозит пока Артур не пофиксит баг TEMP!!!
            table_id: props.tableId,
            timecode: props.timeCode,
            num_guests: numberClients,
            duration: 'PT'+duration+'H',
        };

        props.setBooking(body);

    }

    return (
        <div className="new-order">
            <div className="new-order__close" onClick={() => props.closeForm()}/>
            <form className="new-order__body" onSubmit={onSubmitHandler}>
                <input type="hidden" name="table_id"/>
                <div className="form-control">
                    <label htmlFor="">Имя</label>
                    <input type="text" value={clientName} onChange={e => setClientName(e.target.value)}/>
                </div>
                <div className="form-control">
                    <label htmlFor="">Телефон</label>
                    <input type="text" value={clientPhone} onChange={e => setClientPhone(e.target.value)}/>
                </div>
                <div className="form-control">

                    <label htmlFor="">Количество гостей:</label>
                    <input type="text" value={numberClients} onChange={e => setNumberClients(e.target.value)}/>
                </div>
                <div className="form-control">
                    <label htmlFor="">Продолжительность визита,ч:</label>
                    <input type="text" value={duration} onChange={e => setDuration(e.target.value)}/>
                </div>

                <button>submit</button>
            </form>
        </div>
    )
}

