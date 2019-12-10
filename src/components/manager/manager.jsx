import React, {useState, useEffect} from 'react';
import {API_POINT} from "../../constants";
import {connect} from "react-redux";
import Preloader from "../preloader";
import {getCompanyInfo} from "./manager-container";
import moment from "moment";

function Manager(props) {

    const [showDate, setShowDate] = useState(moment().startOf('day').toISOString());

    const [info, setInfo] = useState({});

    useEffect(()=>{
        console.log('componentDidMount');
    });


    if (Object.entries(info).length === 0 && info.constructor === Object) {

        const arFetchFunctions = [
            getCompanyInfo(props.token) //Получаем данные о компании
        ];

        Promise.all(arFetchFunctions)
            .then(([companyInfo]) => setInfo({companyInfo}));


        return <Preloader/>

    } else {

        console.log('companyInfo', info);

        return (
            <div>
                Manager
            </div>
        )
    }


}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        token: state.auth.token,
    }
};

export default connect(mapStateToProps, null)(Manager);
