import React, {useState} from 'react';
import {SvgCalendar, SvgEdit, SvgOk} from "../../../../assets/svg";

import './admin-home-edit-work-time.scss';
import AdminHomeEditWorkDay from "../edit-work-day";

function AdminHomeEditWorkTime() {

    const [readOnly, setReadOnly] = useState(true);

    const editButton = readOnly ? <SvgEdit/> : <SvgOk/>;

    const [workTime,setWorkTime] = useState(
        [
            {title: "Понедельник", start: "12:00", end: "21:00"},
            {title: "Вторник", start: "12:00", end: "21:00"},
            {title: "Среда", start: "12:00", end: "21:00"},
            {title: "Четверг", start: "12:00", end: "21:00"},
            {title: "Пятница", start: "12:00", end: "21:00"},
            {title: "Суббота", start: "12:00", end: "21:00"},
            {title: "Воскресенье", start: "12:00", end: "21:00"},
        ]
    );

    function updateWorkTime(index,json, action){
        const newData = workTime;
        newData[index] = json;

        console.log('newData',newData);

        action(newData);
    }

    console.log('workTime',workTime);


    return (
        <div className="admin-work-time">
            <div className="admin-work-time__header">
                <div className="admin-work-time__title">
                    <div>Рабочее время заведения:</div>
                    <div className="admin-work-time__icon" onClick={() => setReadOnly(!readOnly)}>
                        {editButton}
                    </div>
                </div>

                <div className="admin-work-time__custom">
                    <div>Редактировать работу определенного дня</div>
                    <div className="admin-work-time__icon"><SvgCalendar/></div>
                </div>
            </div>


            <form action="" id="baseWorkTime" className="admin-work-time__body">
                {
                    workTime.map( (item,key) => <AdminHomeEditWorkDay
                        item={item}
                        readOnly={readOnly}
                        key={key}
                        index={key}
                        changeHandler={obj =>updateWorkTime(key,obj,setWorkTime)}
                    />)
                }
            </form>
        </div>
    )
}

export default AdminHomeEditWorkTime;
