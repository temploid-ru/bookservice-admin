import React, {useState} from 'react';
import {SvgEdit, SvgOk} from "../../../../assets/svg";

import './admin-edit-tables-item.scss';
import {API_POINT} from "../../../../constants";

function AdminEditTablesItem(props) {
    const [readOnly, setReadOnly] = useState(true);

    const [tableNumber, setTableNumber] = useState(props.table.number);
    const [name, setName] = useState(props.table.name);
    const [numPersons, setNumPersons] = useState(props.table.number_of_persons);
    const [depositPrice, setDepositPrice] = useState(props.table.default_deposit);

    const icon = readOnly ? <SvgEdit/> : <SvgOk/>;

    function handlerClick() {

        if (!readOnly) {
            const table = props.table;
            table.number = tableNumber;
            table.name = name;
            table.number_of_persons = numPersons;
            table.default_deposit = depositPrice;

            const body = {
                "method": "TableEdit",
                "token": props.token,
                "item": table,
                "id": table.id,
            };

            delete table.id;

            fetch(API_POINT + '/tables', {method: 'post', body: JSON.stringify(body)})
                .then(res => res.json()).then(json => (json.error)
                ? console.error('update table error')
                : console.log('update table success')
            );
        }

        setReadOnly(!readOnly)
    }

    function updateIntValue(value, setState) {
        value = parseInt(value);

        if (isNaN(value)) value = 0;

        setState(value);
    }

    function updateFloatValue(value, setState) {
        value = parseFloat(value);

        if (isNaN(value)) value = 0;

        setState(value);
    }

    return (
        <div className="admin-edit-tables-item aet-row">
            <div className="aet-row__table-number">
                <input type="text" value={tableNumber} readOnly={readOnly}
                       onChange={e => setTableNumber(e.target.value)}/>
            </div>
            <div className="aet-row__table-name">
                <input type="text" value={name} readOnly={readOnly} onChange={e => setName(e.target.value)}/>
            </div>
            <div className="aet-row__guests-count">
                <input type="text" value={numPersons} readOnly={readOnly}
                       onChange={e => updateIntValue(e.target.value, setNumPersons)}/>
            </div>
            <div className="aet-row__deposit-count">
                <input type="text" value={depositPrice} readOnly={readOnly}
                       onChange={e => updateFloatValue(e.target.value, setDepositPrice)}/>
            </div>
            <div className="aet-row__photos">в разработке</div>
            <div className="admin-edit-tables-item__icon aet-row__edit" onClick={handlerClick}>{icon}</div>
        </div>
    )
}

export default AdminEditTablesItem;
