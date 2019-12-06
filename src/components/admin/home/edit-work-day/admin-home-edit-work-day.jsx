import React, {useState} from 'react';

function AdminHomeEditWorkDay(props) {

    const [item, setItem] = useState(props.item);

    let timeHandler;

    function update(key, value) {

        clearTimeout(timeHandler);
        setItem(item);

        setTimeout(() => {

        }, 750);

        // props.changeHandler(item);
    }

    const hours = [];
    for (let hour = 0; hour < 23; hour++) hours.push(hour);


    return (
        <div className="admin-work-time__item" key={item.title}>
            <div className="admin-work-time__day-name">{item.title}</div>
            <div className="admin-work-time__value">
                <label htmlFor={"workTimeFrom" + props.index}>c</label>
                <select name="startHour" id={"startHour" + props.index}>
                    {hours.map(hour => <option value="0" key={hour}>0</option>)}
                </select>
                <span>:</span>
                <select name="startHour" id={"startMinutes" + props.index}>
                    {hours.map(hour => <option value="0" key={hour}>0</option>)}
                </select>
            </div>
            <div className="admin-work-time__value">
                <label htmlFor={"workTimeTo" + props.index}>до</label>
                <input type="text" id={"workTimeFrom" + props.index} readOnly={props.readOnly} value={item.end}
                       onChange={e => update('start', e.target.value)}/>
            </div>
        </div>
    )
}

export default AdminHomeEditWorkDay;
