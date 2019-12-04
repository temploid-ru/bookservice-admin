import React, {useState} from 'react';
import {SvgEdit, SvgOk} from "../../../../assets/svg";

import './admin-home-item.scss';

function AdminHomeItem(props) {

    const [readOnly, setReadOnly] = useState(true);

    const [value, setValue] = useState(props.value);

    const icon = readOnly ? <SvgEdit/> : <SvgOk/>;

    function handlerClick() {
        console.log('handlerClick', readOnly);
        setReadOnly(!readOnly)
    }

    return (
        <div className="admin-edit-item">
            <label htmlFor="">{props.title}</label>
            <input type="text" readOnly={readOnly} value={value} onChange={e => setValue(e.target.value)}/>
            <div className="admin-edit-item__icon" onClick={() => handlerClick()}>{icon}</div>
        </div>
    )
}

export default AdminHomeItem;
