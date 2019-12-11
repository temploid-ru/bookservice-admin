import React from 'react';

import {Calendar, NewOrder, SearchButton, TableGrid} from "./manager-dashboard-views";

import './manager-dashboard.scss';
import {getTableGrid} from "./manager-dashboard-container";

export default function ManagerDashboard(){

    const tableGrid =  getTableGrid();

    return (
        <div>
            <SearchButton/>

            <Calendar text={'Сегодня • 14 сен, ср'} changeDay={value=>console.log('changeDay',value)}/>

            <TableGrid {...tableGrid}/>

            <NewOrder/>


        </div>
    )
}

