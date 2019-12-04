import React from 'react';
import AdminEditTablesItem from './item';

import './admin-edit-tables.scss';

function AdminEditTables() {

    const tablesList = [
        {id: 0, name: "VIP 21", number: 67, gallery: [], numPersons: 2, depositPrice: 0}
    ];

    for (let i = 1; i <= 60; i++) {
        let item = tablesList[0];
        item.id += i;
        tablesList.push(item);
    }

    return (
        <div className="admin-edit-tables">
            <h1>Редактирование столиков</h1>
            <div className="admin-edit-tables__content">
                <div className="admin-edit-tables__header aet-cell">
                    <div className="aet-cell__num">№</div>
                    <div className="aet-cell__table-number">Номер столика</div>
                    <div className="aet-cell__table-name">Название столика</div>
                    <div className="aet-cell__guests-count">Количество гостей</div>
                    <div className="aet-cell__deposit__count">Депозит столика</div>
                    <div className="aet-cell__photos">Фотографии</div>
                    <div className="aet-cell__edit"></div>
                </div>
                .admin-edit-tables
                <div className="admin-edit-tables__items">
                    {
                        tablesList.map((item, key) => <AdminEditTablesItem key={key} {...item} idKey={key}/>)
                    }
                </div>
            </div>


        </div>
    )
}

export default AdminEditTables;
