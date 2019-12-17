import React  from 'react';
import {connect} from "react-redux";
import Preloader from "../preloader";
import {getCompanyInfo, getWorkTime, getTablesList} from "./manager-container";
import ManagerWebsocket from "./websocket/manager-websocket";
import {INFO__SET_DATA} from "../../constants/manager";

import './manager.scss'

function Manager(props) {

    if (props.info === null) {
        const arFetchFunctions = [
            getCompanyInfo(props.token), //Получаем данные о компании
            getWorkTime(props.activeDate, props.token), //Получаем время работы
            getTablesList(props.activeDate, props.token), // Получаем данные о столах
        ];

        // получаем асинхронные данные
        Promise.all(arFetchFunctions)
            .then(([companyInfo, workTime, tablesList,]) => {
                props.setInfo({companyInfo,workTime,tablesList});
            });

        return <Preloader/>
    } else {
        return <div className="container"><ManagerWebsocket/></div>
    }


}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        token: state.auth.token,
        info: state.info,
        activeDate: state.showDate.activeDate,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setInfo: payload => dispatch({type: INFO__SET_DATA, payload}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
