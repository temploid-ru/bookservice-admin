import React, {useState} from 'react';
import moment from 'moment';
import SelectBox from "../../../../select-box";

function AdminHomeEditWorkDay(props) {

    const {item} = props;

    let startTime = moment.utc(props.item.start_time*1000).format('HH:mm:ss');
    startTime = startTime.split(':');

    let endTime = moment.utc(props.item.end_time*1000).format('HH:mm:ss');
    endTime = endTime.split(':');

    return (
        <div className="admin-work-time__item" key={item.title}>
            <div className="admin-work-time__day-name">{item.title}</div>
            <div className="admin-work-time__value">
                <span>c</span>
                <SelectBox values={props.hoursVariants} currentValue={startTime[0]} disabled={props.disabled}/>
                <span>:</span>
                <SelectBox values={props.minutesVariants} currentValue={startTime[1]} disabled={props.disabled}/>
            </div>
            <div className="admin-work-time__value">
                <span>до</span>
                <SelectBox values={props.hoursVariants} currentValue={endTime[0]} disabled={props.disabled}/>
                <span>:</span>
                <SelectBox values={props.minutesVariants} currentValue={endTime[1]} disabled={props.disabled}/>
            </div>
        </div>
    )
}

export default AdminHomeEditWorkDay;