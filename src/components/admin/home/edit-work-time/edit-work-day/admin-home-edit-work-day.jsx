import React, {useState} from 'react';

function AdminHomeEditWorkDay(props) {

    const {item} = props;

    function SelectBox(props){

        const {items, currValue} = props;

        return (
            <select name="startHour" id={"startMinutes" + props.index} value={currValue} disabled={props.disabled}>
                {items.map(hour => <option value={hour} key={hour}>{hour}</option>)}
            </select>
        )
    }

    return (
        <div className="admin-work-time__item" key={item.title}>
            <div className="admin-work-time__day-name">{item.title}</div>
            <div className="admin-work-time__value">
                <span>c</span>
                <SelectBox items={props.hoursVariants} currValue={"02"} disabled={props.disabled}/>
                <span>:</span>
                <SelectBox items={props.minutesVariants} currValue={"10"} disabled={props.disabled}/>
            </div>
            <div className="admin-work-time__value">
                <span>до</span>
                <SelectBox items={props.hoursVariants} currValue={"02"} disabled={props.disabled}/>
                <span>:</span>
                <SelectBox items={props.minutesVariants} currValue={"10"} disabled={props.disabled}/>
            </div>
        </div>
    )
}

export default AdminHomeEditWorkDay;
