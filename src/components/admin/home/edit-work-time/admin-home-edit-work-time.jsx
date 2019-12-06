import React, {useState} from 'react';
import {SvgCalendar, SvgEdit, SvgOk} from "../../../../assets/svg";

import './admin-home-edit-work-time.scss';
import AdminHomeEditWorkDay from "./edit-work-day";

import {hoursVariants, minutesVariants} from "./admin-home-edit-work-time-container";

function AdminHomeEditWorkTime(props) {

    const [readOnly, setReadOnly] = useState(true);

    const editButton = readOnly ? <SvgEdit/> : <SvgOk/>;

    const [workTime,setWorkTime] = useState([] );

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
                        hoursVariants={hoursVariants}
                        minutesVariants={minutesVariants}
                        item={item}
                        disabled={readOnly}
                        key={key}
                        index={key}
                        // changeHandler={obj =>updateWorkTime(obj)}
                    />)
                }
            </form>
        </div>
    )
}

export default AdminHomeEditWorkTime;
