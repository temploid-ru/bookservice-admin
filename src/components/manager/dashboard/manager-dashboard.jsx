import React from 'react';
import {connect} from 'react-redux';

import {Calendar, NewOrder, SearchButton, TableGrid} from "./manager-dashboard-views";

import './manager-dashboard.scss';
import {getTableGrid} from "./manager-dashboard-container";

function ManagerDashboard(props){
    const tableGrid =  getTableGrid(props);

    return (
        <div>
            <SearchButton/>
            <Calendar text={'Сегодня • 14 сен, ср'} changeDay={value=>console.log('changeDay',value)}/>
            <TableGrid items={tableGrid}/>
            <NewOrder/>
        </div>
    )
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        bookingInfo: state.bookingInfo.items,
        bookingInterval:state.info.companyInfo.bookingInterval,
        tablesList: state.info.tablesList,
        workTime: state.info.workTime,
        showDate: state.showDate,
    }
};

export default connect(mapStateToProps,null)(ManagerDashboard);
