import React, {useState} from 'react';
import {
    OrderTablesListFilter,
    OrderTablesListItems,
    OrderTablesListMap,
    OrderTablesListTabs
} from "./manager-order-edit-table-list-view";

import './manager-order-edit-table-list.scss';

export default function OrderTablesList(props) {

    const [activeTab, setActiveTab] = useState(0);

    const [filter, setFilter] = useState(false);

    const orderTablesListTabs = <div>
        <OrderTablesListTabs
            activeTab={activeTab}
            setActiveTab={v => setActiveTab(v)}
        />
    </div>;

    switch (activeTab) {
        case 1:
            return (
                <div className="order-tables-list">
                    {orderTablesListTabs}
                    <div className="order-tables-list__body">
                        <OrderTablesListMap/>
                    </div>
                    <div onClick={() => props.toBack()} className="order-tables-list__back">back</div>
                </div>
            )
        default:

            return (
                <div className="order-tables-list">
                    {orderTablesListTabs}
                    <div className="order-tables-list__body">
                        <OrderTablesListFilter
                            tablesList={props.tablesList}
                            current={filter}
                            setFilter={v => setFilter(v)}/>

                        <OrderTablesListItems
                            tablesList={props.tablesList.filter(table => (filter === false) ? true : table.number_of_persons === filter)}
                            setTable={v=>props.setTable(v)}
                        />
                    </div>

                    <div onClick={() => props.toBack()} className="order-tables-list__back">back</div>
                </div>
            )
    }

}
