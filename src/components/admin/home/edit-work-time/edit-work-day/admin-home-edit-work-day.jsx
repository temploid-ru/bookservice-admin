import React, {useState} from 'react';
import moment from 'moment';
import SelectBox from "../../../../select-box";

function AdminHomeEditWorkDay(props) {

    console.log(props);


    let {item} = props;

    let startTime = moment.utc(props.item.start_time * 1000).format('HH:mm:ss');
    startTime = startTime.split(':');

    let endTime = moment.utc(props.item.end_time * 1000).format('HH:mm:ss');
    endTime = endTime.split(':');

    const weekText = props.dayNameText[props.item.weekday-1];

    function update(obj) {
        obj.startTime = 3600 * parseInt(obj.startTime[0]) + 60 * parseInt(obj.startTime[1]) + parseInt(obj.startTime[2]);

        obj.endTime = 3600 * parseInt(obj.endTime[0]) + 60 * parseInt(obj.endTime[1]) + parseInt(obj.endTime[2]);
        if (obj.startTime > obj.endTime) obj.endTime += 86400;

        item = {...item, start_time: obj.startTime, end_time: obj.endTime};

        props.updateWorkTime(item,props.index);
    }


    return (
        <div className="admin-work-time__item" key={weekText}>
            <div className="admin-work-time__day-name">{weekText}</div>
            <div className="admin-work-time__value">
                <span>c</span>
                <SelectBox values={props.hoursVariants} currentValue={startTime[0]} disabled={props.disabled}
                           changeHandler={value => update({startTime: [value, startTime[1], startTime[2]], endTime})}/>
                <span>:</span>
                <SelectBox values={props.minutesVariants} currentValue={startTime[1]} disabled={props.disabled}
                           changeHandler={value => update({startTime: [startTime[0], value, startTime[2]], endTime})}/>
            </div>
            <div className="admin-work-time__value">
                <span>до</span>
                <SelectBox values={props.hoursVariants} currentValue={endTime[0]} disabled={props.disabled}
                           changeHandler={value => update({startTime, endTime: [value, endTime[1], endTime[2]]})}/>
                <span>:</span>
                <SelectBox values={props.minutesVariants} currentValue={endTime[1]} disabled={props.disabled}
                           changeHandler={value => update({startTime, endTime: [endTime[0], value, endTime[2]]})}/>
            </div>
        </div>
    )
}

export default AdminHomeEditWorkDay;
