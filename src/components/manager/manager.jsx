import React, {useState} from 'react';
import {connect} from "react-redux";
import Preloader from "../preloader";
import {getCompanyInfo, getWorkTime, getTablesList} from "./manager-container";
import moment from "moment";
import ManagerWebsocket from "./websocket/manager-websocket";

function Manager(props) {

    const [showDate, setShowDate] = useState(moment().startOf('day').toISOString());

    const [info, setInfo] = useState({preloader:true});

    if (info.preloader === true) {
        const arFetchFunctions = [
            getCompanyInfo(props.token), //Получаем данные о компании
            getWorkTime(showDate, props.token), //Получаем время работы
            getTablesList(showDate, props.token), // Получаем данные о столах
        ];
        Promise.all(arFetchFunctions)
            .then(([
                       companyInfo,
                       workTime,
                       tablesList,
                   ]) => setInfo({
                companyInfo,
                workTime,
                tablesList,
            }));
        return <Preloader/>
    } else {
        return <ManagerWebsocket {...info} token={props.token}/>
    }


}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        token: state.auth.token,
    }
};

export default connect(mapStateToProps, null)(Manager);
