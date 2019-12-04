import React, {useState} from 'react';
import {SvgEdit, SvgOk} from "../../../../assets/svg";

import './admin-edit-tables-item.scss';

function AdminEditTablesItem(props) {

    const [readOnly, setReadOnly] = useState(true);

    const [name, setName] = useState(props.name);
    const [numPersons, setNumPersons] = useState(props.numPersons);
    const [depositPrice, setDepositPrice] = useState(props.depositPrice);

    const icon = readOnly ? <SvgEdit/> : <SvgOk/>;

    function handlerClick() {
        setReadOnly(!readOnly)
    }

    return (
        <div className="admin-edit-tables-item aet-cell">
            <div className="aet-cell__num">{props.idKey}</div>
            <div className="aet-cell__table-number">{props.number}</div>
            <div className="aet-cell__table-name"><input type="text" value={name} readOnly={readOnly} onChange={e => setName(e.targetValue)}/></div>
            <div className="aet-cell__guests-count"><input type="text" value={numPersons} readOnly={readOnly} onChange={e => setNumPersons(e.targetValue)}/></div>
            <div className="aet-cell__deposit__count"><input type="text" value={depositPrice} readOnly={readOnly} onChange={e => setDepositPrice(e.targetValue)}/></div>
            <div className="aet-cell__photos" >фотки столика</div>
            <div className="admin-edit-tables-item__icon aet-cell__edit" onClick={handlerClick}>{icon}</div>
        </div>
    )
}

export default AdminEditTablesItem;
