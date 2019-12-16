import React, {useState} from 'react';
import {SvgCalendar, SvgEdit, SvgOk} from "../../../../assets/svg";

import './admin-home-edit-work-time.scss';
import AdminHomeEditWorkDay from "./edit-work-day";

import {hoursVariants, minutesVariants,dayNameText} from "./admin-home-edit-work-time-container";

function AdminHomeEditWorkTime(props) {

    const [readOnly, setReadOnly] = useState(true);

    const editButton = readOnly ? <SvgEdit/> : <SvgOk/>;

    const [workTimeList,setWorkTimeList] = useState(props.workTimeList);

    function readOnlyChange(){

        if (!readOnly){
            props.updateWorkTime(workTimeList);
        }

        setReadOnly(!readOnly)
    }

    function updateWorkTime(item,index){
        let newWorkTimeList = [...workTimeList];
        newWorkTimeList[index] = item;
        setWorkTimeList(newWorkTimeList);
    }

    return (
        <div className="admin-work-time">
            <div className="admin-work-time__header">
                <div className="admin-work-time__title">
                    <div>Рабочее время заведения:</div>
                    <div className="admin-work-time__icon" onClick={() => readOnlyChange()}>
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
                    workTimeList.map((item, key) => <AdminHomeEditWorkDay
                        dayNameText={dayNameText}
                        hoursVariants={hoursVariants}
                        minutesVariants={minutesVariants}
                        item={item}
                        disabled={readOnly}
                        key={key}
                        index={key}
                        updateWorkTime={item => updateWorkTime(item, key)}
                    />)
                }
            </form>
        </div>
    )
}

export default AdminHomeEditWorkTime;
